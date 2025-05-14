using Serilog;
using SiriusEcommerce.Identity.API.ConfigureExtensions.HealthChecksExtension;
using SiriusEcommerce.Identity.API.ConfigureExtensions.LoggerExtensions;
using SiriusEcommerce.Identity.API.Configuration;

try
{
    var builder = WebApplication.CreateBuilder(args);

    Log.Information("Starting up Sirius Identity Service...");

    builder.Host.AddSerilogConfiguration();

    builder.Services.AddApiConfiguration();
    
    builder.Services.AddIdentityConfiguration(builder.Configuration);

    builder.Configuration.SetBasePath(builder.Environment.ContentRootPath)
         .AddJsonFile("appsettings.json", true, true)
         .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", true, true)
         .AddEnvironmentVariables();

    builder.Services.AddSwaggerConfiguration();

    builder.Services.AddHealthChecks(builder.Configuration);
        
    
    var app = builder.Build();

    app.UseHealthChecks();

    app.UseSwaggerConfiguration(app.Environment);

    app.UseApiConfiguration();           

    app.Run();
}
catch (Exception ex)
{
    Log.Logger.Error("Exception raised: " + ex.Message);
    Log.Fatal(ex, "Sirius Identity Service terminated unexpectedly");
}
finally
{
    Log.Information("Sirius Identity Service is shutting down [finally].");
    Log.CloseAndFlush();
}