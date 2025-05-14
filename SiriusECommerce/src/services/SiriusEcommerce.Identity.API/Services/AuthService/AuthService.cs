using Microsoft.AspNetCore.Identity;
using SiriusEcommerce.Identity.API.DTOs.User;
using SiriusEcommerce.Identity.API.Entities;
using SiriusEcommerce.Identity.API.Extensions;

namespace SiriusEcommerce.Identity.API.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        //private readonly IEmailSender _emailSender; enviar email de confirmação de cadastro
        public AuthService(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public async Task<IdentityResult> Register(UserRegisterDTO userRegisterDTO)
        {
            var user = new User
            {
                CustomerFirstName = userRegisterDTO.FirstName,
                CustomerLastName = userRegisterDTO.LastName,
                Email = userRegisterDTO.Email,
                UserName = userRegisterDTO.Email,
                EmailConfirmed = false
            };

            var result = await _userManager.CreateAsync(user, userRegisterDTO.Password);            
            return result;
        }
        public async Task<ExtendedSignInResult> Login(UserLoginDTO userLoginDTO)
        {
            var user = await _userManager.FindByEmailAsync(userLoginDTO.Email);

            if(user is { EmailConfirmed: false })
            {
                return new ExtendedSignInResult(SignInResult.Failed, "Email not confirmed. Please confirm your e-mail before logging in.");
            }
            
            if(user is { LockoutEnd: not null})
            {
                return new ExtendedSignInResult(SignInResult.LockedOut, "User blocked temporarily for invalid attempts");
            }

            var result = await _signInManager.PasswordSignInAsync(userLoginDTO.Email, userLoginDTO.Password, isPersistent: false, lockoutOnFailure: true);
            return new ExtendedSignInResult(result);
        }
    }
}
