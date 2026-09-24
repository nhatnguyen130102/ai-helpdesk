using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHelpdesk.Api.DTOs
{
    public class RegisterDTO
    {
        public required string UserName { get; set; }
        public required string PassWord { get; set; }
        public required string FullName { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Email { get; set; }
        public required int RoleId { get; set; }
    }

    public class LoginDTO
    {
        public required string UserName { get; set; }
        public required string PassWord { get; set; }
    }

    public class RefreshTokenDTO
    {
        public required string RefreshToken { get; set; }
    }

    public class AuthResponseDTO
    {
        public int UserId { get; set; }

        public string UserName { get; set; } = string.Empty;

        public string FullName { get; set; } = string.Empty;

        public string AccessToken { get; set; } = string.Empty;

        public string RefreshToken { get; set; } = string.Empty;
        public int ExpiresIn { get; set; }
    }
}