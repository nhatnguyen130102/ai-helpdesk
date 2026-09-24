using System.Security.Claims;
using AiHelpdesk.Api.Services.Interfaces;

namespace AiHelpdesk.Api.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    private ClaimsPrincipal? User =>
        _httpContextAccessor.HttpContext?.User;

    public bool IsAuthenticated =>
        User?.Identity?.IsAuthenticated ?? false;

    public int? UserId
    {
        get
        {
            var value = User?.FindFirstValue(ClaimTypes.NameIdentifier);

            return int.TryParse(value, out var userId)
                ? userId
                : null;
        }
    }

    public string? UserName =>
        User?.FindFirstValue(ClaimTypes.Name);

    public string? FullName =>
        User?.FindFirstValue("FullName");

    public int? RoleId
    {
        get
        {
            var value = User?.FindFirstValue("RoleId");

            return int.TryParse(value, out var roleId)
                ? roleId
                : null;
        }
    }
}