using AiHelpdesk.Api.Data;
using AiHelpdesk.Api.Entities;
using AiHelpdesk.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AiHelpdesk.Api.Services;

public class TicketService
    : BaseService<Ticket>, ITicketService
{
    public TicketService(ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<List<Ticket>> GetByStatusAsync(string status)
    {
        return await _dbSet
            .AsNoTracking()
            .Where(x => x.Status == status)
            .ToListAsync();
    }

    public async Task<List<Ticket>> GetByPriorityAsync(string priority)
    {
        return await _dbSet
            .AsNoTracking()
            .Where(x => x.Priority == priority)
            .ToListAsync();
    }

    public async Task<bool> AssignAsync(
        int ticketId,
        int userId)
    {
        var ticket = await _dbSet.FindAsync(ticketId);

        if (ticket == null)
            return false;

        ticket.AssignedToId = userId;
        ticket.UpdatedDate = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> ChangeStatusAsync(
        int ticketId,
        string status)
    {
        var ticket = await _dbSet.FindAsync(ticketId);

        if (ticket == null)
            return false;

        ticket.Status = status;
        ticket.UpdatedDate = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return true;
    }
}