namespace Agilator.DataTransfer
{
    using System.Collections.Generic;
    public class ResponseDto
    {
        public bool IsSuccessful { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}
