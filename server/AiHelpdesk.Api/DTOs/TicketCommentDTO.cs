using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AiHelpdesk.Api.DTOs.Common;

namespace AiHelpdesk.Api.DTOs
{
    public class CreateTicketCommentDTO
    {
        public required int TicketId { get; set; }
        public required int UserId { get; set; }
        public required string Content { get; set; }
        public required string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsActive { get; set; }
    }
    public class UpdateTicketCommentDTO : CreateTicketCommentDTO
    {
        public required int Id { get; set; }
    }
    public class GetAllTicketCommentDTO : UpdateTicketCommentDTO
    {
        public string? Code { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? CretaedBy { get; set; }
    }
    public class GetByIdTicketCommentDTO : GetAllTicketCommentDTO
    {
        public DateTime UpdatedDate { get; set; }
        public string? UpdatedBy { get; set; }
    }
    public class FilterParamTicketComment : BaseFilter
    {
        public  int? TicketId { get; set; }
        public  int? UserId { get; set; }
        public  string? Content { get; set; }
    }
}