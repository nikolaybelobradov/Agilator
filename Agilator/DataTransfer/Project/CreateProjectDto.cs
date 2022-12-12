namespace Agilator.DataTransfer.Project
{
    using System.ComponentModel.DataAnnotations;
    public class CreateProjectDto
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
