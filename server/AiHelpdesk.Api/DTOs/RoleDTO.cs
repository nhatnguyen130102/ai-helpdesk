using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AiHelpdesk.Api.DTOs.Common;

namespace AiHelpdesk.Api.DTOs
{
    public class CreateRoleDTO
    {
        public required string Name { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }
    public class UpdateRoleDTO : CreateRoleDTO
    {
        public required int Id { get; set; }
    }
    public class GetAllRoleDTO : UpdateRoleDTO
    {
        public string? Code { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? CretaedBy { get; set; }
    }
    public class GetByIdRoleDTO : GetAllRoleDTO
    {
        public DateTime UpdatedDate { get; set; }
        public string? UpdatedBy { get; set; }
    }
    public class FilterParamRole : BaseFilter
    {

    }
}