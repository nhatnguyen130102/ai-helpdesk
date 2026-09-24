using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHelpdesk.Api.Services.Interfaces
{
    public interface ICurrentUserService
    {
        bool IsAuthenticated { get; }

        int? UserId { get; }

        string? UserName { get; }

        string? FullName { get; }

        int? RoleId { get; }
    }
}