namespace Agilator.DataTransfer.TeamMember
{
    using System.ComponentModel.DataAnnotations;
    public class CreateTeamMemberDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public int WorkingHours { get; set; }

        [Required]
        public string ProjectId { get; set; }
    }
}
