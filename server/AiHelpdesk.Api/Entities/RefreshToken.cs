using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AiHelpdesk.Api.Entities
{
    public class RefreshToken : BaseEntity
    {
        public required int UserId { get; set; }
        public required string Token { get; set; } = string.Empty;
        public required DateTime ExpiresAt { get; set; } = DateTime.UtcNow;
        public DateTime? RevokedAt { get; set; }

        public User User { get; set; } = null!;

    }
}