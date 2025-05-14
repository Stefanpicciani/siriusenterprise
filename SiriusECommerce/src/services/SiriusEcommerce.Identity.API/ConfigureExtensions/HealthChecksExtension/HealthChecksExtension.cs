using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using SiriusEcommerce.Identity.API.Models;

namespace SiriusEcommerce.Identity.API.ConfigureExtensions.HealthChecksExtension
{
    public static class HealthCheckExtensions
    {
        public static IServiceCollection AddHealthChecks(this IServiceCollection services, IConfiguration configuration)
        {
            try
            {

                var rabbitMQSection = configuration.GetSection("RabbitMQ");
                //services.Configure<RabbitMQModel>(rabbitMQSection);
                var rabbitMQ = rabbitMQSection.Get<RabbitMQModel>();

                var rabbitMqUri = $"amqp://{Uri.EscapeDataString(rabbitMQ.Username)}:{Uri.EscapeDataString(rabbitMQ.Password)}@{rabbitMQ.Host}:{rabbitMQ.Port}{rabbitMQ.VirtualHost}"; // SEM HTTPS Tem que ver como fazer com https, se for produção puxar outro amps do settings


                services.AddHealthChecks()
                .AddNpgSql(
                    connectionString: configuration.GetConnectionString("IdentityAuthConnectionPostgreSQL"),
                    name: "Identity PostgreSQL DB",
                    tags: new[] { "db", "postgresql", "identity" })
                .AddRabbitMQ(
                    rabbitConnectionString: rabbitMqUri,
                    name: "Identity Rabbitmq",
                    tags: new[] { "rabbitmq", "messaging", "identity" })
                .AddCheck("Identity API Service", () => HealthCheckResult.Healthy("Identity API is healthy"),
                    tags: new[] { "api", "identity" });


                // Opcional: Adicionar o Health Checks UI para visualização local
                services.AddHealthChecksUI(options =>
                {
                    //options.AddHealthCheckEndpoint("Identity API", "/health");
                    options.SetEvaluationTimeInSeconds(15); // Avalia a cada 15 segundos
                    options.MaximumHistoryEntriesPerEndpoint(60); // Mantém 60 entradas de histórico por endpoint
                }).AddInMemoryStorage();


                return services;
            }
            catch (Exception e)
            {
                //Log.Logger.Error("Exception raised: " + e.Message);
                return services;
            }

        }


        public static IApplicationBuilder UseHealthChecks(this IApplicationBuilder app)
        {
            // Endpoint do Health Check
            app.UseHealthChecks("/health", new HealthCheckOptions
            {
                Predicate = _ => true,
                ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
            });

            // Endpoint para métricas mais detalhadas de health check
            app.UseHealthChecks("/health/ready", new HealthCheckOptions
            {
                Predicate = reg => reg.Tags.Contains("service") || reg.Tags.Contains("db"),
                ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
            });

            // Endpoint para liveness probe (apenas verificar se o serviço está rodando)
            app.UseHealthChecks("/health/live", new HealthCheckOptions
            {
                Predicate = _ => false,
                ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
            });

            // Opcional: UI para monitoramento local
            app.UseHealthChecksUI(options =>
            {
                options.UIPath = "/health-ui";
            });

            return app;
        }



    }
}
