using AiHelpdesk.Api.DTOs.Common;
using AiHelpdesk.Api.Entities;

namespace AiHelpdesk.Api.Services.Interfaces;

public interface IBaseService<TEntity>
    where TEntity : BaseEntity
{
    Task<BaseResponse<TEntity?>> GetByIdAsync(int id);

    Task<BaseResponse<List<TEntity>>> GetAllAsync();

    Task<BaseResponse<PagedResult<TEntity>>> GetPagedAsync(
        int page = 1,
        int pageSize = 20);

    Task<BaseResponse<TEntity>> CreateAsync(TEntity entity);

    Task<BaseResponse<TEntity?>> UpdateAsync(
        int id,
        TEntity entity);

    Task<BaseResponse<bool>> DeleteAsync(int id);
}