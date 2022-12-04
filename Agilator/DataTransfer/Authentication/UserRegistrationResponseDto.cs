namespace Agilator.DataTransfer.Authentication
{
    using System.Collections.Generic;
    public class UserRegistrationResponseDto
    {
        public bool IsSuccessfulRegistration { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}
