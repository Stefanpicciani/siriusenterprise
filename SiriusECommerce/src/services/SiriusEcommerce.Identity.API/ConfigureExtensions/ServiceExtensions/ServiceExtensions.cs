using Microsoft.AspNetCore.Authentication.JwtBearer;
using SiriusEcommerce.Identity.API.Services.AuthService;
using SiriusEcommerce.Identity.API.Services.TokenService;

namespace SiriusEcommerce.Identity.API.ConfigureExtensions.ServiceExtensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddConfigureRouting(this IServiceCollection services)
        {
            services.AddRouting(options => options.LowercaseUrls = true);
            return services;
        }

        public static IServiceCollection AddDependencyInjections(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }    
}
