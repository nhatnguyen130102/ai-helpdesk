using AiHelpdesk.Api.Data;
using AiHelpdesk.Api.DTOs;
using AiHelpdesk.Api.DTOs.Common;
using AiHelpdesk.Api.Entities;
using AiHelpdesk.Api.Services.Interfaces;

using AutoMapper;

using Microsoft.EntityFrameworkCore;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using Microsoft.IdentityModel.Tokens;
using AiHelpdesk.Api.Helper;

namespace AiHelpdesk.Api.Services;

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;

    public AuthService(
        ApplicationDbContext context,
        IMapper mapper,
        IConfiguration configuration)
    {
        _context = context;
        _mapper = mapper;
        _configuration = configuration;
    }

    #region Register

    public async Task<BaseResponse<AuthResponseDTO>> RegisterAsync(
        RegisterDTO dto)
    {
        try
        {
            if (dto == null)
            {
                return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                    "Request data cannot be null.",
                    StatusCodes.Status400BadRequest);
            }

            var validationResult = await ValidateRegisterAsync(dto);

            if (!validationResult.Success)
            {
                return validationResult;
            }

            var user = _mapper.Map<User>(dto);

            user.Code = await GenerateCodeAsync();

            user.PassWordHash = BCrypt.Net.BCrypt.HashPassword(
                dto.PassWord);

            user.IsActive = true;
            user.CreatedDate = DateTime.UtcNow;
            user.CreatedBy = "Admin";

            await _context.Users.AddAsync(user);

            await _context.SaveChangesAsync();

            var response = new AuthResponseDTO
            {
                UserId = user.Id,
                UserName = user.UserName,
                FullName = user.FullName
            };

            return ResponseHelper.SuccessResponse(
                response,
                "Register successfully.",
                StatusCodes.Status201Created);
        }
        catch (Exception)
        {
            return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                "An unexpected error occurred while registering.",
                StatusCodes.Status500InternalServerError);
        }
    }

    #endregion

    #region Login

    public async Task<BaseResponse<AuthResponseDTO>> LoginAsync(
        LoginDTO dto)
    {
        try
        {
            if (dto == null)
            {
                return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                    "Request data cannot be null.",
                    StatusCodes.Status400BadRequest);
            }

            if (string.IsNullOrWhiteSpace(dto.UserName))
            {
                return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                    "Username is required.",
                    StatusCodes.Status400BadRequest);
            }

            if (string.IsNullOrWhiteSpace(dto.PassWord))
            {
                return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                    "Password is required.",
                    StatusCodes.Status400BadRequest);
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(x =>
                    x.UserName == dto.UserName);

            if (user == null)
            {
                return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                    "Invalid username or password.",
                    StatusCodes.Status401Unauthorized);
            }

            if (!user.IsActive)
            {
                return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                    "User account is inactive.",
                    StatusCodes.Status403Forbidden);
            }

            var isValidPassword =
                BCrypt.Net.BCrypt.Verify(
                    dto.PassWord,
                    user.PassWordHash);

            if (!isValidPassword)
            {
                return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                    "Invalid username or password.",
                    StatusCodes.Status401Unauthorized);
            }

            var accessToken = GenerateJwtToken(user);

            var refreshToken = Guid.NewGuid().ToString();

            /*
             * TODO:
             * Save refresh token to database.
             *
             * Example:
             *
             * var refreshTokenEntity = new RefreshToken
             * {
             *     Token = refreshToken,
             *     UserId = user.Id,
             *     ExpiresAt = DateTime.UtcNow.AddDays(7)
             * };
             *
             * await _context.RefreshTokens.AddAsync(refreshTokenEntity);
             * await _context.SaveChangesAsync();
             */

            var response = new AuthResponseDTO
            {
                UserId = user.Id,
                UserName = user.UserName,
                FullName = user.FullName,
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };

            return ResponseHelper.SuccessResponse(
                response,
                "Login successfully.",
                StatusCodes.Status200OK);
        }
        catch (Exception)
        {
            return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                "An unexpected error occurred while logging in.",
                StatusCodes.Status500InternalServerError);
        }
    }

    #endregion

    #region Refresh Token

    public async Task<BaseResponse<AuthResponseDTO>> RefreshTokenAsync(
        RefreshTokenDTO dto)
    {
        try
        {
            if (dto == null ||
                string.IsNullOrWhiteSpace(dto.RefreshToken))
            {
                return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                    "Refresh token is required.",
                    StatusCodes.Status400BadRequest);
            }

            /*
             * TODO:
             *
             * 1. Find refresh token in database
             * 2. Check token exists
             * 3. Check token is not expired
             * 4. Check token is not revoked
             * 5. Get User
             * 6. Generate new AccessToken
             * 7. Rotate RefreshToken
             */

            return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                "Refresh token functionality is not implemented yet.",
                StatusCodes.Status501NotImplemented);
        }
        catch (Exception)
        {
            return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                "An unexpected error occurred while refreshing token.",
                StatusCodes.Status500InternalServerError);
        }
    }

    #endregion

    #region Logout

    public async Task<BaseResponse<bool>> LogoutAsync(
        string refreshToken)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                return ResponseHelper.ErrorResponse<bool>(
                    "Refresh token is required.",
                    StatusCodes.Status400BadRequest);
            }

            /*
             * TODO:
             *
             * Find refresh token
             * Mark it as revoked
             * Save changes
             */

            return ResponseHelper.ErrorResponse<bool>(
                "Logout functionality is not implemented yet.",
                StatusCodes.Status501NotImplemented);
        }
        catch (Exception)
        {
            return ResponseHelper.ErrorResponse<bool>(
                "An unexpected error occurred while logging out.",
                StatusCodes.Status500InternalServerError);
        }
    }

    #endregion

    #region Validation

    private async Task<BaseResponse<AuthResponseDTO>> ValidateRegisterAsync(
        RegisterDTO dto)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(dto.UserName))
            {
                return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                    "Username is required.",
                    StatusCodes.Status400BadRequest);
            }

            if (string.IsNullOrWhiteSpace(dto.PassWord))
            {
                return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                    "Password is required.",
                    StatusCodes.Status400BadRequest);
            }

            if (dto.PassWord.Length < 8)
            {
                return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                    "Password must be at least 8 characters.",
                    StatusCodes.Status400BadRequest);
            }

            if (string.IsNullOrWhiteSpace(dto.Email))
            {
                return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                    "Email is required.",
                    StatusCodes.Status400BadRequest);
            }

            var duplicateUser = await _context.Users
                .AsNoTracking()
                .Where(x =>
                    x.UserName == dto.UserName ||
                    x.Email == dto.Email ||
                    x.PhoneNumber == dto.PhoneNumber)
                .Select(x => new
                {
                    x.UserName,
                    x.Email,
                    x.PhoneNumber
                })
                .FirstOrDefaultAsync();

            if (duplicateUser != null)
            {
                if (duplicateUser.UserName == dto.UserName)
                {
                    return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                        "Username already exists.",
                        StatusCodes.Status409Conflict);
                }

                if (duplicateUser.Email == dto.Email)
                {
                    return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                        "Email already exists.",
                        StatusCodes.Status409Conflict);
                }

                if (!string.IsNullOrWhiteSpace(dto.PhoneNumber) &&
                    duplicateUser.PhoneNumber == dto.PhoneNumber)
                {
                    return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                        "Phone number already exists.",
                        StatusCodes.Status409Conflict);
                }
            }

            var roleExists = await _context.Roles
                .AsNoTracking()
                .AnyAsync(x => x.Id == dto.RoleId);

            if (!roleExists)
            {
                return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                    "Role not found.",
                    StatusCodes.Status400BadRequest);
            }

            return ResponseHelper.SuccessResponse(
                new AuthResponseDTO(),
                "Validation successful.",
                StatusCodes.Status200OK);
        }
        catch (Exception)
        {
            return ResponseHelper.ErrorResponse<AuthResponseDTO>(
                "An unexpected error occurred while validating registration.",
                StatusCodes.Status500InternalServerError);
        }
    }

    #endregion

    #region Generate User Code

    private async Task<string> GenerateCodeAsync()
    {
        const string prefix = "US";

        var lastCode = await _context.Users
            .AsNoTracking()
            .OrderByDescending(x => x.Id)
            .Select(x => x.Code)
            .FirstOrDefaultAsync();

        if (string.IsNullOrWhiteSpace(lastCode))
        {
            return $"{prefix}-0001";
        }

        var parts = lastCode.Split('-');

        if (parts.Length != 2 ||
            !int.TryParse(parts[1], out var currentNumber))
        {
            return $"{prefix}-0001";
        }

        return $"{prefix}-{currentNumber + 1:D4}";
    }

    #endregion

    #region JWT

    private string GenerateJwtToken(User user)
    {
        var jwtKey = _configuration["Jwt:Key"];

        if (string.IsNullOrWhiteSpace(jwtKey))
        {
            throw new InvalidOperationException(
                "JWT key is not configured.");
        }

        Console.WriteLine("========== JWT GENERATE ==========");
        Console.WriteLine($"JWT KEY LENGTH: {jwtKey.Length}");
        Console.WriteLine($"JWT ISSUER: {_configuration["Jwt:Issuer"]}");
        Console.WriteLine($"JWT AUDIENCE: {_configuration["Jwt:Audience"]}");
        Console.WriteLine("==================================");

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtKey));

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),

            new(
                ClaimTypes.NameIdentifier,
                user.Id.ToString()),

            new(
                ClaimTypes.Name,
                user.UserName),

            new(
                "FullName",
                user.FullName ?? string.Empty),

            new(
                "RoleId",
                user.RoleId.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }

    #endregion
}