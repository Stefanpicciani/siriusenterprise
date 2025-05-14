using Serilog;
using Serilog.Events;
using Serilog.Exceptions;

namespace SiriusEcommerce.Identity.API.ConfigureExtensions.LoggerExtensions
{
    public static class LoggingExtensions
    {
        public static IHostBuilder AddSerilogConfiguration(this IHostBuilder builder)
        {
            return builder.UseSerilog((hostingContext, loggerConfiguration) =>
            {
                var configuration = hostingContext.Configuration;
                //var elasticUri = configuration["ElasticSearch:Uri"];
                var seqUri = configuration["Seq:Uri"];
                var applicationName = "Sirius.Identity";

                loggerConfiguration
                    .MinimumLevel.Information()
                    .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                    .MinimumLevel.Override("System", LogEventLevel.Warning)
                    .Enrich.FromLogContext()
                    .Enrich.WithExceptionDetails()
                    //.Enrich.WithMachineName()
                    .Enrich.WithProperty("ApplicationName", applicationName)
                    .WriteTo.Console();

                // Adicionar arquivo de log
                loggerConfiguration.WriteTo.File(
                    path: "logs/identity-.log",
                    rollingInterval: RollingInterval.Day,
                    outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff} [{Level:u3}] {Message:lj} {NewLine}{Exception}");

                // Adicionar Elasticsearch se configurado
                //if (!string.IsNullOrEmpty(elasticUri))
                //{
                //    loggerConfiguration.WriteTo.Elasticsearch(new ElasticsearchSinkOptions(new Uri(elasticUri))
                //    {
                //        IndexFormat = $"sirius-identity-{0:yyyy.MM}",
                //        AutoRegisterTemplate = true
                //    });
                //}

                //// Adicionar Seq se configurado
                if (!string.IsNullOrEmpty(seqUri))
                {
                    loggerConfiguration.WriteTo.Seq(seqUri);
                }
            });
        }
    }
}
