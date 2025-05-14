using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using SiriusEcommerce.Identity.API.Configuration;
using SiriusEcommerce.Identity.API.DTOs.User;
using SiriusEcommerce.Identity.API.Entities;
using SiriusEcommerce.Identity.API.Models.User;
using SiriusEcommerce.Identity.API.Services.AuthService;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SiriusEcommerce.Identity.API.Services.TokenService
{
    public class TokenService : ITokenService
    {
        private readonly UserManager<User> _userManager;        
        private readonly AppSettings _appSettings;
        
        

        public TokenService(SignInManager<User> signInManager,
            UserManager<User> userManager,
            IOptions<AppSettings> appSettings,
            IAuthService service)
        {
            _userManager = userManager;            
            _appSettings = appSettings.Value;            
        }


        public async Task<UserLoginResponseDTO> GenerateJwt(string email)
        {
            var user = await _userManager.FindByNameAsync(email);
            var claims = await _userManager.GetClaimsAsync(user); // Claims do user

            var identityClaims = await GetUserClaims(claims, user);
            var encodedToken = TokenEncoding(identityClaims);

            return GetTokenResponse(encodedToken, user, claims);
        }

        private async Task<ClaimsIdentity> GetUserClaims(ICollection<Claim> claims, User user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);

            // Claims do token
            claims.Add(new System.Security.Claims.Claim(JwtRegisteredClaimNames.Sub, user.Id)); // Id do user
            claims.Add(new System.Security.Claims.Claim(JwtRegisteredClaimNames.Email, user.Email)); // Email do user
            claims.Add(new System.Security.Claims.Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())); // Id do token
            claims.Add(new System.Security.Claims.Claim(JwtRegisteredClaimNames.Nbf, ToUnixEpochDate(DateTime.UtcNow).ToString())); // Quando vai expirar
            claims.Add(new System.Security.Claims.Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(DateTime.UtcNow).ToString(), ClaimValueTypes.Integer64)); // Quando foi emitido

            foreach (var userRole in userRoles)
            {
                claims.Add(new Claim("role", userRole));
            }

            var identityClaims = new ClaimsIdentity();
            identityClaims.AddClaims(claims);

            return identityClaims;
        }

        private string TokenEncoding(ClaimsIdentity identityClaims)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

            var token = tokenHandler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = _appSettings.Issuer,
                Audience = _appSettings.IsValidIn,
                Subject = identityClaims,
                Expires = DateTime.UtcNow.AddHours(_appSettings.ExpiresIn),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            });
            return tokenHandler.WriteToken(token);
        }

        private UserLoginResponseDTO GetTokenResponse(string encodedToken, User user, IEnumerable<Claim> claims)
        {
            return new UserLoginResponseDTO
            {
                AccessToken = encodedToken,
                ExpiresIn = TimeSpan.FromHours(_appSettings.ExpiresIn).TotalSeconds,
                UserToken = new UserToken
                {
                    Id = user.Id,
                    Email = user.Email,
                    Claims = claims.Select(c => new UserClaim { Type = c.Type, Value = c.Value })
                }
            };
        }

        // Padrão offset para o jwt
        private static long ToUnixEpochDate(DateTime date)
            => (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);
    }
}
