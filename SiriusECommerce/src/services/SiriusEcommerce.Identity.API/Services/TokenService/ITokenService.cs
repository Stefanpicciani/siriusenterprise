using SiriusEcommerce.Identity.API.DTOs.User;

namespace SiriusEcommerce.Identity.API.Services.TokenService
{
    public interface ITokenService
    {
        Task<UserLoginResponseDTO> GenerateJwt(string email);
    }
}
