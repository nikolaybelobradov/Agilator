﻿namespace Agilator.DataTransfer.Authentication
{
    using System.ComponentModel.DataAnnotations;
    public class UserRegistrationDto
    {
        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Middle name is required")]
        public string MiddleName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "The passowrd and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

    }
}
