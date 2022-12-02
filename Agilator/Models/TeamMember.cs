namespace Agilator.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    public class TeamMember : BaseModel
    {
        public TeamMember()
        {
            Id = Guid.NewGuid().ToString();
        }

        [Key]
        public string Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public int WorkingHours { get; set; }
    }
}
