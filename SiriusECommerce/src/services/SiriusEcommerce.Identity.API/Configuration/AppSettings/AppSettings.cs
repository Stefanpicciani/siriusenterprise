namespace SiriusEcommerce.Identity.API.Configuration
{
    public class AppSettings
    {
        public string Secret { get; set; } = string.Empty; 
        public int ExpiresIn { get; set; } // Expiracao em horas
        public string Issuer { get; set; } = string.Empty; // Emissor
        public string IsValidIn { get; set; } = string.Empty; // Valido em [Audience]
        //public string ExpirationDate { get; set; }
    }
}
