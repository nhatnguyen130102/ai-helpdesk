using AiHelpdesk.Api.DTOs.Common;
using AiHelpdesk.Api.Entities;

public interface IBaseService<
    TEntity,
    TCreateDto,
    TUpdateDto,
    TGetAllDto,
    TGetByIdDto,
    TFilterDto>
    where TEntity : BaseEntity
{
    Task<BaseResponse<TGetByIdDto?>> GetByIdAsync(int id);

    Task<BaseResponse<List<TGetAllDto>>> GetAllAsync();

    Task<BaseResponse<PagedResult<TGetAllDto>>> GetPagedAsync(
        TFilterDto filter);

    Task<BaseResponse<TGetByIdDto?>> CreateAsync(
        TCreateDto dto);

    Task<BaseResponse<TGetByIdDto?>> UpdateAsync(
        int id,
        TUpdateDto dto);

    Task<BaseResponse<bool>> DeleteAsync(int id);
}