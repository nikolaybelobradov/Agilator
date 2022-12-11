namespace Agilator.DataTransfer.Sprint
{
    using System.ComponentModel.DataAnnotations;
    public class CreateSprintDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public int Duration { get; set; }

        [Required]
        public string ProjectId { get; set; }
    }
}
