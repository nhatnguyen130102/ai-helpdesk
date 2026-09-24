using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHelpdesk.Api.Entities
{
    public class Role : BaseEntity
    {
        public ICollection<User> Users { get; set; } = new List<User>();
    }
}