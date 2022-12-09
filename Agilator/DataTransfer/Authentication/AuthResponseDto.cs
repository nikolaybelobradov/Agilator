namespace Agilator.DataTransfer.Authentication
{
    using System.Collections.Generic;
    public class AuthResponseDto
    {
        public bool IsSuccessful{ get; set; }
        public IEnumerable<string> Errors { get; set; }
        public string Token { get; set; }
    }
}
