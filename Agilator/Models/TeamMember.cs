namespace Agilator.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class TeamMember : BaseModel
    {
        public TeamMember()
        {
            Id = Guid.NewGuid().ToString();
            Vacations = new HashSet<Vacation>();
        }

        [Key]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int WorkingHours { get; set; }

        public virtual ICollection<Vacation> Vacations { get; set; }

        [Required]
        public string ProjectId { get; set; }

        [ForeignKey(nameof(ProjectId))]
        public Project Project { get; set; }

    }
}
