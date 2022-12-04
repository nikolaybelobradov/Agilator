namespace Agilator.DataTransfer.Authentication
{
    using System.ComponentModel.DataAnnotations;
    public class UserLoginDto
    {
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}
