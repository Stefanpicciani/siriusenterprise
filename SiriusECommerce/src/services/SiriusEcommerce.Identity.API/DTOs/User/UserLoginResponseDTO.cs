using SiriusEcommerce.Identity.API.Models.User;

namespace SiriusEcommerce.Identity.API.DTOs.User
{
    public class UserLoginResponseDTO
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public double ExpiresIn { get; set; }   
        public UserToken UserToken { get; set; }
    }
}
