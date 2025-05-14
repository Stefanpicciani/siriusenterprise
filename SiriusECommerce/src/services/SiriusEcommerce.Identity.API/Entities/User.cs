using Microsoft.AspNetCore.Identity;

namespace SiriusEcommerce.Identity.API.Entities
{
    public class User : IdentityUser
    {
        public string? CustomerID { get; set; }
        public string? CustomerFirstName { get; set; }
        public string? CustomerLastName { get; set; }        
        public DateTime CreatedAt { get; set; }

        public User()
        {
                CreatedAt = DateTime.UtcNow;
        }
    }
}
