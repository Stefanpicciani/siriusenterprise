using Microsoft.AspNetCore.Identity;
using SiriusEcommerce.Identity.API.DTOs.User;
using SiriusEcommerce.Identity.API.Extensions;

namespace SiriusEcommerce.Identity.API.Services.AuthService
{
    public interface IAuthService
    {
        Task<IdentityResult> Register(UserRegisterDTO userRegisterDTO);
        Task<ExtendedSignInResult> Login(UserLoginDTO userLoginDTO);
    }
}
