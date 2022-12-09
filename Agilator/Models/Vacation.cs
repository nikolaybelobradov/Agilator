namespace Agilator.Models
{
    using Agilator.Models.Interfaces;
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Vacation : BaseModel
    {
        public Vacation()
        {
            Id = Guid.NewGuid().ToString();
        }

        [Key]
        public string Id { get; set; }

        [Required]
        public int Duration { get; set; }

        [Required]
        public string TeamMemberId { get; set; }

        [ForeignKey(nameof(TeamMemberId))]
        public TeamMember TeamMember { get; set; }

        [Required]
        public string SprintId { get; set; }

        [ForeignKey(nameof(SprintId))]
        public Sprint Sprint { get; set; }
    }
}
