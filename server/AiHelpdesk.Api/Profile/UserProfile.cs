using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AiHelpdesk.Api.DTOs;
using AiHelpdesk.Api.Entities;
using AutoMapper;

namespace AiHelpdesk.Api.UserProfile
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<CreateUserDTO, User>();

            CreateMap<UpdateUserDTO, User>();

            CreateMap<User, GetAllUserDTO>();

            CreateMap<User, GetByIdUserDTO>();

            CreateMap<RegisterDTO, User>()
            .ForMember(
dest => dest.Id,
opt => opt.Ignore())
.ForMember(
dest => dest.PassWordHash,
opt => opt.Ignore())
.ForMember(
dest => dest.Code,
opt => opt.Ignore())
.ForMember(
dest => dest.Id,
opt => opt.Ignore())
.ForMember(
dest => dest.CreatedDate,
opt => opt.Ignore())
.ForMember(
dest => dest.UpdatedDate,
opt => opt.Ignore())
.ForMember(
dest => dest.IsActive,
opt => opt.Ignore())
.ForMember(
dest => dest.Name,
opt => opt.MapFrom(src => src.FullName));
        }
    }
}