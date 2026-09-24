using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHelpdesk.Api.Entities
{
    public class User : BaseEntity
    {
        public required string UserName { get; set; }
        public string? Email { get; set; }
        public required string PassWordHash { get; set; }
        public required string FullName { get; set; }
        public required int RoleId { get; set; }
        public Role Role { get; set; } = null!;

        public ICollection<Ticket> CreatedTickets { get; set; }
        = new List<Ticket>();

        public ICollection<Ticket> AssignedTickets { get; set; }
            = new List<Ticket>();

        public ICollection<TicketComment> TicketComments { get; set; }
            = new List<TicketComment>();

        public ICollection<RefreshToken> RefreshTokens { get; set; }
            = new List<RefreshToken>();
    }
}