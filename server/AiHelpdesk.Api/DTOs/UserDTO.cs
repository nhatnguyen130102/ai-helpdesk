using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AiHelpdesk.Api.DTOs.Common;

namespace AiHelpdesk.Api.DTOs
{
    public class CreateUserDTO
    {
        public required string UserName { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }

        public required string FullName { get; set; }
        public required int RoleId { get; set; }

        public required string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;

    }
    public class UpdateUserDTO : CreateUserDTO
    {
        public required int Id { get; set; }
    }
    public class GetAllUserDTO : UpdateUserDTO
    {
        public required string PassWord { get; set; }
        public string? Code { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? CretaedBy { get; set; }
    }
    public class GetByIdUserDTO : GetAllUserDTO
    {
        public DateTime UpdatedDate { get; set; }
        public string? UpdatedBy { get; set; }
    }
    public class FilterParamUser : BaseFilter
    {
        public string? PhoneNumber{ get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? FullName { get; set; }
    }
}