using Serilog;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SiriusEcommerce.Identity.API.Configuration;
using SiriusEcommerce.Identity.API.DTOs.User;
using SiriusEcommerce.Identity.API.Services.AuthService;
using SiriusEcommerce.Identity.API.Services.TokenService;

namespace SiriusEcommerce.Identity.API.Controllers
{    
    [Route("api/[controller]")]
    public class AuthController : MainController
    {                
        private readonly IAuthService _authService;
        private readonly ITokenService _tokenService;
        

        public AuthController(
            IAuthService service,
            ITokenService tokenService,
            IOptions<AppSettings> appSettings
         )
        {            
            _authService = service;        
            _authService = service;
            _tokenService = tokenService;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult> Register(UserRegisterDTO userRegisterDTO)
        {
            try
            {
                Log.Information("Sirius Identity Service AuthController is starting up [Register].");
                if (!ModelState.IsValid)
                {
                    Log.Error("Sirius Identity Service AuthController Register ModelState is not valid.");
                    return CustomResponse(ModelState);
                }

                var result = await _authService.Register(userRegisterDTO);

                if (result.Succeeded)
                {
                    Log.Information("Sirius Identity Service AuthController Register User created successfully.");                    
                    return CustomResponse(await _tokenService.GenerateJwt(userRegisterDTO.Email)); 
                }

                if (result.Errors != null)
                {
                    foreach (var error in result.Errors)
                    {
                        Log.Error(error.Code, error.Description);
                        AddProcessingError(error.Description);
                    }
                }
                
                return CustomResponse();
            }
            catch (Exception ex)
            {
                Log.Error("Sirius Identity Service AuthController Register Exception: " + ex.Message);
                AddProcessingError(ex.Message);
                return CustomResponse();// Disparar aviso para o email ou o Slack caso haja erro                
            }
        }


        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult> Login(UserLoginDTO userLoginDTO)
        {
            try
            {
                Log.Information("Sirius Identity Service AuthController is starting up [Login].");
                if (!ModelState.IsValid)
                {
                    Log.Error("Sirius Identity Service AuthController Login ModelState is not valid.");
                    return CustomResponse(ModelState);
                }

                var extendedResult = await _authService.Login(userLoginDTO);
                var result = extendedResult.Result;

                if (result.Succeeded)
                {
                    Log.Information("Sirius Identity Service AuthController Login User logged in successfully.");
                    return CustomResponse(await _tokenService.GenerateJwt(userLoginDTO.Email));
                }

                //verifica se há uma mensagem de erro personalizada
                if(!string.IsNullOrEmpty(extendedResult.ErrorMessage))
                {
                    AddProcessingError(extendedResult.ErrorMessage);
                    return CustomResponse();
                }
                else
                {
                    Log.Error("Sirius Identity Service AuthController Login User login failed.");
                    AddProcessingError("Incorrect username or password");
                }                    
                
                return CustomResponse();
            }
            catch (Exception ex)
            {
                Log.Error("Sirius Identity Service AuthController Login Exception: " + ex.Message);
                AddProcessingError(ex.Message);
                return CustomResponse();// Disparar aviso para o email ou o Slack caso haja erro
            }

        }

       
    }
}
