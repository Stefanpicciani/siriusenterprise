using SiriusEcommerce.Identity.API.ConfigureExtensions.ServiceExtensions;

namespace SiriusEcommerce.Identity.API.Configuration
{
    public static class ApiConfig
    {
        public static IServiceCollection AddApiConfiguration(this IServiceCollection services)
        {
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddConfigureRouting();
            services.AddDependencyInjections();

            services.AddCors(options =>
            {
                options.AddPolicy("DefaultCorsPolicy", builder =>
                {
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });

            return services;
        }
        
        public static IApplicationBuilder UseApiConfiguration(this IApplicationBuilder app)
        {
            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseCors("DefaultCorsPolicy"); // Adiciona o uso do CORS antes da autenticação

            app.UseIdentityConfiguration(); //Tem que estar entre o routing e o useendpoints/mapcontrollers

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            return app;
        }
    }
}
