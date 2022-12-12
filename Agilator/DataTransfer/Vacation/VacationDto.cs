namespace Agilator.DataTransfer.Vacation
{
    using System.ComponentModel.DataAnnotations;
    public class VacationDto
    {
        [Required]
        public int Duration { get; set; }

        [Required]
        public string TeamMemberId { get; set; }

        [Required]
        public string SprintId { get; set; }
    }
}
