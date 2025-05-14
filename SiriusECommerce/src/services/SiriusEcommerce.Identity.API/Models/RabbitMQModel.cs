namespace SiriusEcommerce.Identity.API.Models
{
    public class RabbitMQModel
    {
        public const string RabbitMQSection = "RabbitMQ";

        public string Host { get; set; } = String.Empty;
        public int Port { get; set; }
        public string Username { get; set; } = String.Empty;
        public string Password { get; set; } = String.Empty;
        public string VirtualHost { get; set; } = "/";
    }
}
