using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHelpdesk.Api.Entities
{
    public class Ticket : BaseEntity
    {
        public required string Title { get; set; }
        public required string Category { get; set; }
        public required string Status { get; set; }
        public required string Priority { get; set; }
        public int? AssignedToId { get; set; }

        public int CreatedById { get; set; }

        public User EmployeeCreated { get; set; } = null!;

        public User? AssignedTo { get; set; }

        // Comments
        public ICollection<TicketComment> Comments { get; set; }
            = new List<TicketComment>();

    }
}