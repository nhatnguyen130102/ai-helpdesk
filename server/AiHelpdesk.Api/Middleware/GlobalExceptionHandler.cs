using System.Text.Json;
using AiHelpdesk.Api.DTOs.Common;

namespace AiHelpdesk.Api.Middleware;

public class GlobalExceptionHandler
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(
        RequestDelegate next,
        ILogger<GlobalExceptionHandler> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Unhandled exception occurred. Path: {Path}",
                context.Request.Path);

            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(
        HttpContext context,
        Exception exception)
    {
        context.Response.ContentType = "application/json";

        var statusCode = StatusCodes.Status500InternalServerError;

        var response = new BaseResponse<object?>
        {
            Data = null,
            Success = false,
            StatusCode = statusCode,
            Message = "An unexpected error occurred."
        };

        context.Response.StatusCode = statusCode;

        await context.Response.WriteAsync(
            JsonSerializer.Serialize(response));
    }
}