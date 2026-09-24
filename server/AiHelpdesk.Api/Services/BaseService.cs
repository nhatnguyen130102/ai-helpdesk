using AiHelpdesk.Api.Data;
using AiHelpdesk.Api.DTOs;
using AiHelpdesk.Api.DTOs.Common;
using AiHelpdesk.Api.Entities;
using AiHelpdesk.Api.Helper;
using AiHelpdesk.Api.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AiHelpdesk.Api.Services;

public abstract class BaseService<
    TEntity,
    TCreateDto,
    TUpdateDto,
    TGetAllDto,
    TGetByIdDto,
    TFilterDto>
    : IBaseService<
        TEntity,
        TCreateDto,
        TUpdateDto,
        TGetAllDto,
        TGetByIdDto,
        TFilterDto>
    where TEntity : BaseEntity
    where TFilterDto : BaseFilter
{
    protected readonly ApplicationDbContext _context;
    protected readonly DbSet<TEntity> _dbSet;
    protected readonly IMapper _mapper;
    protected BaseService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
        _dbSet = context.Set<TEntity>();
    }

    #region Get By Id

    public virtual async Task<BaseResponse<TGetByIdDto?>> GetByIdAsync(
        int id)
    {
        return await ExecuteAsync(async () =>
        {
            var entity = await _dbSet
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);

            if (entity == null)
            {
                return ResponseHelper.ErrorResponse<TGetByIdDto?>(
                    "Data not found.",
                    StatusCodes.Status404NotFound);
            }

            var dto = _mapper.Map<TGetByIdDto>(entity);

            return ResponseHelper.SuccessResponse<TGetByIdDto?>(
                dto,
                "Data retrieved successfully.",
                StatusCodes.Status200OK);
        });
    }

    #endregion

    #region Get All

    public virtual async Task<BaseResponse<List<TGetAllDto>>> GetAllAsync()
    {
        return await ExecuteAsync(async () =>
{
    var entities = await _dbSet
                .AsNoTracking()
                .ToListAsync();

    var dto = _mapper.Map<List<TGetAllDto>>(entities.ToList());

    return ResponseHelper.SuccessResponse(
        dto,
        "Data retrieved successfully.",
        StatusCodes.Status200OK);
});

    }

    #endregion

    #region Create

    public virtual async Task<BaseResponse<TGetByIdDto?>> CreateAsync(
        TCreateDto dto)
    {
        return await ExecuteAsync(async () =>
{
    if (dto == null)
    {
        return ResponseHelper.ErrorResponse<TGetByIdDto?>(
            "Request data cannot be null.",
            StatusCodes.Status400BadRequest);
    }

    var entity = _mapper.Map<TEntity>(dto);
    entity.Code = await GenerateCodeAsync();
    entity.CreatedDate = DateTime.UtcNow;
    entity.UpdatedDate = DateTime.UtcNow;
    entity.IsActive = true;

    await _dbSet.AddAsync(entity);
    await _context.SaveChangesAsync();

    var result = _mapper.Map<TGetByIdDto>(entity);

    return ResponseHelper.SuccessResponse<TGetByIdDto?>(
        result,
        "Created successfully.",
        StatusCodes.Status201Created);
});

    }

    #endregion

    #region Update

    public virtual async Task<BaseResponse<TGetByIdDto?>> UpdateAsync(
     int id,
     TUpdateDto dto)
    {
        return await ExecuteAsync(async () =>
        {
            if (dto == null)
            {
                return ResponseHelper.ErrorResponse<TGetByIdDto?>(
                    "Request data cannot be null.",
                    StatusCodes.Status400BadRequest);
            }

            var entity = await _dbSet
                .FirstOrDefaultAsync(x => x.Id == id);

            if (entity == null)
            {
                return ResponseHelper.ErrorResponse<TGetByIdDto?>(
                    "Data not found.",
                    StatusCodes.Status404NotFound);
            }

            _mapper.Map(dto, entity);

            entity.UpdatedDate = DateTime.UtcNow;
            entity.UpdatedBy = "Admin";

            await _context.SaveChangesAsync();

            var result = _mapper.Map<TGetByIdDto>(entity);

            return ResponseHelper.SuccessResponse<TGetByIdDto?>(
                result,
                "Updated successfully.",
                StatusCodes.Status200OK);
        });
    }

    #endregion

    #region Delete

    public virtual async Task<BaseResponse<bool>> DeleteAsync(
        int id)
    {
        return await ExecuteAsync(async () =>
        {
            var entity = await _dbSet
                    .FirstOrDefaultAsync(x => x.Id == id);

            if (entity == null)
            {
                return ResponseHelper.ErrorResponse<bool>(
                    "Data not found.",
                    StatusCodes.Status404NotFound);
            }

            _dbSet.Remove(entity);

            await _context.SaveChangesAsync();

            return ResponseHelper.SuccessResponse(
                true,
                "Deleted successfully.",
                StatusCodes.Status200OK);
        });
    }

    #endregion

    #region Get Paged
    public virtual async Task<BaseResponse<PagedResult<TGetAllDto>>> GetPagedAsync(
    TFilterDto filter)
    {
        return await ExecuteAsync(async () =>
        {
            var page = Math.Max(1, filter.Page);
            var pageSize = Math.Clamp(filter.PageSize, 1, 100);

            var query = _dbSet
                .AsNoTracking();

            query = ApplyFilter(query, filter);

            var totalItems = await query.CountAsync();

            var entities = await query
                .OrderBy(x => x.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var items = _mapper.Map<List<TGetAllDto>>(entities);

            var result = new PagedResult<TGetAllDto>
            {
                Items = items,
                Page = page,
                PageSize = pageSize,
                TotalItems = totalItems
            };

            return ResponseHelper.SuccessResponse(
                result,
                "Data retrieved successfully.");
        });
    }
    #endregion

    #region Helpers
    protected virtual IQueryable<TEntity> ApplyFilter(
    IQueryable<TEntity> query,
    TFilterDto filter)
    {
        return query;
    }

    private async Task<string> GenerateCodeAsync()
    {
        var prefix = typeof(TEntity).Name
            .ToUpper()
            .Substring(0, 2);

        var lastCode = await _dbSet
            .OrderByDescending(x => x.Id)
            .Select(x => x.Code)
            .FirstOrDefaultAsync();

        if (string.IsNullOrWhiteSpace(lastCode))
        {
            return $"{prefix}-0001";
        }

        var numberPart = lastCode.Substring(prefix.Length);

        var nextNumber = int.Parse(numberPart) + 1;

        return $"{prefix}{nextNumber:D4}";
    }
    protected async Task<BaseResponse<T>> ExecuteAsync<T>(
    Func<Task<BaseResponse<T>>> action)
    {
        try
        {
            return await action();
        }
        catch (DbUpdateException ex)
        {
            return ResponseHelper.ErrorResponse<T>(
            ex.InnerException?.Message ?? ex.Message,
            StatusCodes.Status500InternalServerError);
        }
        catch (AutoMapperMappingException ex)
        {
            return ResponseHelper.ErrorResponse<T>(
            ex.Message,
            StatusCodes.Status500InternalServerError);
        }
        catch (Exception ex)
        {
            return ResponseHelper.ErrorResponse<T>(
            ex.Message,
            StatusCodes.Status500InternalServerError);
        }
    }
    #endregion


}