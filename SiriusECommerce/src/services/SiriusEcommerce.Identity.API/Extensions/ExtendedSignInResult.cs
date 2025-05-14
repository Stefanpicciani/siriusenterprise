using Microsoft.AspNetCore.Identity;

namespace SiriusEcommerce.Identity.API.Extensions
{
    public class ExtendedSignInResult
    {
        public SignInResult Result { get; set; }
        public string ErrorMessage { get; set; }

        public ExtendedSignInResult(SignInResult result, string errorMessage = null)
        {
            Result = result;
            ErrorMessage = errorMessage;
        }
    }
}
