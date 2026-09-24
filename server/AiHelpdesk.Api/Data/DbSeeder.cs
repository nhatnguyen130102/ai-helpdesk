using AiHelpdesk.Api.Entities;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace AiHelpdesk.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        await context.Database.MigrateAsync();

        await SeedRolesAsync(context);
        await SeedUsersAsync(context);

        await context.SaveChangesAsync();
    }

    private static async Task SeedRolesAsync(
        ApplicationDbContext context)
    {
        if (await context.Roles.AnyAsync())
            return;

        var roles = new List<Role>
        {
            new()
            {
                Id = 1,
                Name = "Admin",
                Code = "RO-0001",
                Description = "System administrator"
            },
            new()
            {
                Id = 2,
                Name = "Agent",
                Code = "RO-0002",
                Description = "Support agent"
            },
            new()
            {
                Id = 3,
                Name = "User",
                Code = "RO-0003",
                Description = "System user"
            }
        };

        await context.Roles.AddRangeAsync(roles);
    }

    private static async Task SeedUsersAsync(
        ApplicationDbContext context)
    {
        if (await context.Users.AnyAsync())
            return;

        var adminRole = await context.Roles
            .FirstAsync(x => x.Code == "RO-0001");

        var agentRole = await context.Roles
            .FirstAsync(x => x.Code == "RO-0002");

        var userRole = await context.Roles
            .FirstAsync(x => x.Code == "RO-0003");

        var users = new List<User>
        {
            new()
            {
                Id = 1,
                Code = "US-0001",
                UserName = "admin",
                FullName = "System Administrator",
                Email = "admin@aihelpdesk.com",
                PassWordHash = BCrypt.Net.BCrypt.HashPassword("123456y"),
                RoleId = adminRole.Id,
                IsActive = true,
                CreatedBy = "Seeder",
                UpdatedBy = "Seeder"
            },

            new()
            {
                Id = 2,
                Code = "US-0002",
                UserName = "agent",
                FullName = "Support Agent",
                Email = "agent@aihelpdesk.com",
                PassWordHash = BCrypt.Net.BCrypt.HashPassword("123456y"),
                RoleId = agentRole.Id,
                IsActive = true,
                CreatedBy = "Seeder",
                UpdatedBy = "Seeder"
            },

            new()
            {
                Id = 3,
                Code = "US-0003",
                UserName = "user",
                FullName = "Normal User",
                Email = "user@aihelpdesk.com",
                PassWordHash = BCrypt.Net.BCrypt.HashPassword("123456y"),
                RoleId = userRole.Id,
                IsActive = true,
                CreatedBy = "Seeder",
                UpdatedBy = "Seeder"
            }
        };

        await context.Users.AddRangeAsync(users);
    }
}