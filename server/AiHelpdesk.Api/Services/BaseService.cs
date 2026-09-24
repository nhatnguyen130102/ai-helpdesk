using AiHelpdesk.Api.Data;
using AiHelpdesk.Api.DTOs.Common;
using AiHelpdesk.Api.Entities;
using AiHelpdesk.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AiHelpdesk.Api.Services;

public class BaseService<TEntity> : IBaseService<TEntity>
    where TEntity : BaseEntity
{
    protected readonly ApplicationDbContext _context;
    protected readonly DbSet<TEntity> _dbSet;

    public BaseService(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = context.Set<TEntity>();
    }

    #region Get By Id

    public virtual async Task<BaseResponse<TEntity?>> GetByIdAsync(int id)
    {
        var entity = await _dbSet
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
        {
            return ErrorResponse<TEntity?>(
                "Data not found.",
                StatusCodes.Status404NotFound);
        }

        return SuccessResponse<TEntity?>(
            entity,
            "Data retrieved successfully.",
            StatusCodes.Status200OK);
    }

    #endregion

    #region Get All

    public virtual async Task<BaseResponse<List<TEntity>>> GetAllAsync()
    {
        var entities = await _dbSet
            .AsNoTracking()
            .ToListAsync();

        return SuccessResponse(
            entities,
            "Data retrieved successfully.",
            StatusCodes.Status200OK);
    }

    #endregion

    #region Get Paged

    public virtual async Task<BaseResponse<PagedResult<TEntity>>> GetPagedAsync(
        int page = 1,
        int pageSize = 20)
    {
        if (page < 1)
        {
            page = 1;
        }

        if (pageSize < 1)
        {
            pageSize = 20;
        }

        if (pageSize > 100)
        {
            pageSize = 100;
        }

        var query = _dbSet
            .AsNoTracking()
            .AsQueryable();

        var totalItems = await query.CountAsync();

        var items = await query
            .OrderBy(x => x.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var result = new PagedResult<TEntity>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            TotalItems = totalItems
        };

        return SuccessResponse(
            result,
            "Data retrieved successfully.",
            StatusCodes.Status200OK);
    }

    #endregion

    #region Create

    public virtual async Task<BaseResponse<TEntity>> CreateAsync(
        TEntity entity)
    {
        if (entity == null)
        {
            return ErrorResponse<TEntity>(
                "Entity cannot be null.",
                StatusCodes.Status400BadRequest);
        }

        entity.CreatedDate = DateTime.UtcNow;
        entity.UpdatedDate = DateTime.UtcNow;

        _dbSet.Add(entity);

        await _context.SaveChangesAsync();

        return SuccessResponse(
            entity,
            "Created successfully.",
            StatusCodes.Status201Created);
    }

    #endregion

    #region Update

    public virtual async Task<BaseResponse<TEntity?>> UpdateAsync(
        int id,
        TEntity entity)
    {
        if (entity == null)
        {
            return ErrorResponse<TEntity?>(
                "Entity cannot be null.",
                StatusCodes.Status400BadRequest);
        }

        var existingEntity = await _dbSet
            .FirstOrDefaultAsync(x => x.Id == id);

        if (existingEntity == null)
        {
            return ErrorResponse<TEntity?>(
                "Data not found.",
                StatusCodes.Status404NotFound);
        }

        entity.Id = id;
        entity.UpdatedDate = DateTime.UtcNow;

        _context.Entry(existingEntity).CurrentValues.SetValues(entity);

        await _context.SaveChangesAsync();

        return SuccessResponse<TEntity?>(
            existingEntity,
            "Updated successfully.",
            StatusCodes.Status200OK);
    }

    #endregion

    #region Delete

    public virtual async Task<BaseResponse<bool>> DeleteAsync(int id)
    {
        var entity = await _dbSet
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
        {
            return ErrorResponse<bool>(
                "Data not found.",
                StatusCodes.Status404NotFound);
        }

        _dbSet.Remove(entity);

        await _context.SaveChangesAsync();

        return SuccessResponse(
            true,
            "Deleted successfully.",
            StatusCodes.Status200OK);
    }

    #endregion

    #region Response Helpers

    protected BaseResponse<T> SuccessResponse<T>(
        T data,
        string message = "Success.",
        int statusCode = StatusCodes.Status200OK)
    {
        return new BaseResponse<T>
        {
            Data = data,
            Message = message,
            Success = true,
            StatusCode = statusCode
        };
    }

    protected BaseResponse<T> ErrorResponse<T>(
        string message,
        int statusCode = StatusCodes.Status400BadRequest)
    {
        return new BaseResponse<T>
        {
            Data = default,
            Message = message,
            Success = false,
            StatusCode = statusCode
        };
    }

    #endregion
}