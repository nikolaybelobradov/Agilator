namespace Agilator.DataTransfer.Project
{
    using System.ComponentModel.DataAnnotations;
    public class EditProjectDto
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
