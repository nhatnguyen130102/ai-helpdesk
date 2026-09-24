using AiHelpdesk.Api.DTOs.Common;
using AiHelpdesk.Api.Entities;
using AiHelpdesk.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AiHelpdesk.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseController<
    TEntity,
    TCreateDto,
    TUpdateDto,
    TGetAllDto,
    TGetByIdDto,
    TFilterDto>
    : ControllerBase
    where TEntity : BaseEntity
{
    protected readonly IBaseService<
        TEntity,
        TCreateDto,
        TUpdateDto,
        TGetAllDto,
        TGetByIdDto,
        TFilterDto> _service;

    protected BaseController(
        IBaseService<
            TEntity,
            TCreateDto,
            TUpdateDto,
            TGetAllDto,
            TGetByIdDto,
            TFilterDto> service)
    {
        _service = service;
    }

    #region Response

    protected IActionResult HandleResponse<T>(
        BaseResponse<T> response)
    {
        return StatusCode(
            response.StatusCode,
            response);
    }

    #endregion

    #region Get

    [HttpGet("GetById/{id:int}")]
    public virtual async Task<IActionResult> GetById(int id)
    {
        var response = await _service.GetByIdAsync(id);

        return HandleResponse(response);
    }

    [HttpGet("GetAll")]
    public virtual async Task<IActionResult> GetAll()
    {
        var response = await _service.GetAllAsync();

        return HandleResponse(response);
    }

    [HttpGet("GetPaged")]
    public async Task<IActionResult> GetPaged(
    [FromQuery] TFilterDto filter)
    {
        var response = await _service.GetPagedAsync(filter);

        return HandleResponse(response);
    }

    #endregion

    #region Create

    [HttpPost("Create")]
    public virtual async Task<IActionResult> Create(
        [FromBody] TCreateDto dto)
    {
        var response = await _service.CreateAsync(dto);

        return HandleResponse(response);
    }

    #endregion

    #region Update

    [HttpPut("Update/{id:int}")]
    public virtual async Task<IActionResult> Update(
        int id,
        [FromBody] TUpdateDto dto)
    {
        var response = await _service.UpdateAsync(id, dto);

        return HandleResponse(response);
    }

    #endregion

    #region Delete

    [HttpDelete("Delete/{id:int}")]
    public virtual async Task<IActionResult> Delete(int id)
    {
        var response = await _service.DeleteAsync(id);

        return HandleResponse(response);
    }

    #endregion
}