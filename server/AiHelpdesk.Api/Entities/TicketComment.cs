using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHelpdesk.Api.Entities
{
    public class TicketComment : BaseEntity
    {
        public required int TicketId { get; set; }
        public required int UserId { get; set; }
        public required string Content { get; set; }
        public Ticket Ticket { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}