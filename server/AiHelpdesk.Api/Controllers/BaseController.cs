using AiHelpdesk.Api.DTOs.Common;
using Microsoft.AspNetCore.Mvc;

namespace AiHelpdesk.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseController : ControllerBase
{
    protected IActionResult HandleResponse<T>(
        BaseResponse<T> response)
    {
        return StatusCode(
            response.StatusCode,
            response);
    }
}