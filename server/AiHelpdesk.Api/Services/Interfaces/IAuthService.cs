using AiHelpdesk.Api.DTOs;
using AiHelpdesk.Api.DTOs.Common;

namespace AiHelpdesk.Api.Services.Interfaces;

public interface IAuthService
{
    Task<BaseResponse<AuthResponseDTO>> RegisterAsync(
        RegisterDTO DTO);

    Task<BaseResponse<AuthResponseDTO>> LoginAsync(
        LoginDTO DTO);

    Task<BaseResponse<AuthResponseDTO>> RefreshTokenAsync(
        RefreshTokenDTO dto);

    Task<BaseResponse<bool>> LogoutAsync(
        string refreshToken);
}