﻿using System.ComponentModel.DataAnnotations;

namespace SiriusEcommerce.Identity.API.DTOs.User
{
    public class UserRegisterDTO
    {
        [Required(ErrorMessage = "The field {0} is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        [EmailAddress(ErrorMessage = "The field {0} is not a valid email address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        [StringLength(100, ErrorMessage = "The field {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        public string Password { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}
