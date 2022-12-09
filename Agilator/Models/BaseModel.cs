﻿namespace Agilator.Models
{
    using Agilator.Models.Interfaces;
    using System;

    public abstract class BaseModel : IAuditInfo, IDeletableEntity
    {
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedOn { get; set; }
    }
}
