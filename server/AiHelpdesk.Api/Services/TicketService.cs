using AiHelpdesk.Api.Data;
using AiHelpdesk.Api.DTOs;
using AiHelpdesk.Api.Entities;
using AiHelpdesk.Api.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AiHelpdesk.Api.Services;

public class TicketService
    : BaseService<Ticket, CreateTicketDTO, UpdateTicketDTO, GetAllTicketDTO, GetByIdTicketDTO, FilterParamTicket>, ITicketService
{
    public TicketService(ApplicationDbContext context, IMapper mapper)
        : base(context, mapper)
    {
    }

    protected override IQueryable<Ticket> ApplyFilter(
    IQueryable<Ticket> query,
    FilterParamTicket filter)
    {
        query = query
            .Include(x => x.Comments)
            .Include(x => x.CreatedBy)
            .Include(x => x.AssignedTo);

        if (!string.IsNullOrWhiteSpace(filter.Keyword))
        {
            query = query.Where(x =>
            x.Title.Contains(filter.Keyword) || x.Name.Contains(filter.Keyword));
        }

        if (filter.IsActive.HasValue)
        {
            query = query.Where(x =>
            x.IsActive == filter.IsActive.Value);
        }

        if (filter.FromDate.HasValue)
        {
            query = query.Where(x =>
            x.CreatedDate >= filter.FromDate.Value);
        }

        if (filter.ToDate.HasValue)
        {
            query = query.Where(x =>
            x.CreatedDate <= filter.ToDate.Value);
        }

        return query;
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