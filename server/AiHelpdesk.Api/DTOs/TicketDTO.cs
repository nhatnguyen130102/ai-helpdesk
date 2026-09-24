using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AiHelpdesk.Api.DTOs.Common;
using AiHelpdesk.Api.Entities;

namespace AiHelpdesk.Api.DTOs
{
    public class CreateTicketDTO
    {
        public required string Title { get; set; }
        public required string Category { get; set; }
        public required string Status { get; set; }
        public required string Priority { get; set; }
        public int? AssignedToId { get; set; }
        public int CreatedById { get; set; }
        public required string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
    public class UpdateTicketDTO : CreateTicketDTO
    {
        public required int Id { get; set; }
    }
    public class GetAllTicketDTO : UpdateTicketDTO
    {
        public string? Code { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? CretaedBy { get; set; }
    }
    public class GetByIdTicketDTO : GetAllTicketDTO
    {
        public DateTime UpdatedDate { get; set; }
        public string? UpdatedBy { get; set; }
    }
    public class FilterParamTicket : BaseFilter
    {
        public string? Category { get; set; }
        public string? Status { get; set; }
        public string? Priority { get; set; }
        public int? AssignedToId { get; set; }
        public int? CreatedById { get; set; }
    }
}