namespace Agilator.DataTransfer.Project
{
    using System.ComponentModel.DataAnnotations;
    public class ProjectDto
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
