namespace Agilator.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    public class Sprint : BaseModel
    {
        public Sprint()
        {
            Id = Guid.NewGuid().ToString();
            TeamMembers = new HashSet<TeamMember>();
        }

        [Key]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Duration { get; set; }
        public virtual ICollection<TeamMember> TeamMembers { get; set; }
    }
}
