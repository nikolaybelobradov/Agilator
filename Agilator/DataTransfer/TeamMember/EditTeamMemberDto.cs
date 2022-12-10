namespace Agilator.DataTransfer.TeamMember
{
    using System.ComponentModel.DataAnnotations;
    public class EditTeamMemberDto
    {

        [Required]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int WorkingHours { get; set; }
    }
}
