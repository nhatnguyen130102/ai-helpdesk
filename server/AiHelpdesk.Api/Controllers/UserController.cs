using AiHelpdesk.Api.DTOs;
using AiHelpdesk.Api.Entities;
using AiHelpdesk.Api.Services.Interfaces;

namespace AiHelpdesk.Api.Controllers
{
    public class UserController : BaseController<
        User,
        CreateUserDTO,
        UpdateUserDTO,
        GetAllUserDTO,
        GetByIdUserDTO,
        FilterParamUser>
    {
        public UserController(IUserService service) : base(service)
        {
        }
    }
}