namespace Agilator.DataTransfer.Sprint
{
    using System.ComponentModel.DataAnnotations;
    public class EditSprintDto
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Duration { get; set; }
    }
}
