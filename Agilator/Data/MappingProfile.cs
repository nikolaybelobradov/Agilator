namespace Agilator.Data
{
    using Agilator.DataTransfer.Authentication;
    using Agilator.DataTransfer.Project;
    using Agilator.DataTransfer.TeamMember;
    using Agilator.Models;
    using AutoMapper;

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserRegistrationDto, ApplicationUser>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.Email));

            CreateMap<CreateProjectDto, Project>();
            CreateMap<CreateTeamMemberDto, TeamMember>();
        }
    }
}
