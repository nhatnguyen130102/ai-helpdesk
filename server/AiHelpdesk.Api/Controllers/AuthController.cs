using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AiHelpdesk.Api.DTOs;
using AiHelpdesk.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AiHelpdesk.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(
            IAuthService authService)
        {
            _authService = authService;
        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(
            RegisterDTO dto)
        {
            var result = await _authService.RegisterAsync(dto);

            return StatusCode(
                result.StatusCode,
                result);
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(
            LoginDTO dto)
        {
            var result = await _authService.LoginAsync(dto);

            return StatusCode(
                result.StatusCode,
                result);
        }
        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken(
            RefreshTokenDTO dto)
        {
            var result = await _authService.RefreshTokenAsync(dto);

            return StatusCode(
                result.StatusCode,
                result);
        }
        [AllowAnonymous]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout(
            RefreshTokenDTO dto)
        {
            var result = await _authService.LogoutAsync(
                dto.RefreshToken);

            return StatusCode(
                result.StatusCode,
                result);
        }
    }
}