namespace Agilator.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Project : BaseModel
    {
        public Project()
        {
            Id = Guid.NewGuid().ToString();
            Sprints = new HashSet<Sprint>();
        }

        [Key]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<TeamMember> TeamMembers { get; set; }
        public virtual ICollection<Sprint> Sprints { get; set; }

        [Required]
        public string OwnerId { get; set; }

        [ForeignKey(nameof(OwnerId))]
        public ApplicationUser Owner { get; set; }
    }
}
