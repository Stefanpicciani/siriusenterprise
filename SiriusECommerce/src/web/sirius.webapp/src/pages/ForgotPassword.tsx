import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

// Interface para os dados do formulário
interface ForgotPasswordFormData {
  email: string;
}

// Interface para a resposta de erro da API
interface ApiError {
  title?: string;
  status?: number;
  errors?: Record<string, string[]>;
  detail?: string;
  type?: string;
}

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      // Enviar solicitação para redefinir a senha
      await axios.post('/api/auth/forgot-password', data);
      
      // Mesmo que o email não exista, mostramos a mesma mensagem de sucesso 
      // para evitar vazamento de informação sobre quais emails existem no sistema
      setIsSubmitSuccessful(true);
      
    } catch (error: any) {
      // Capturar apenas erros do servidor, não erros relacionados ao email não existir
      if (error.response && error.response.status !== 404) {
        const errorData = error.response.data as ApiError;
        setApiError(
          errorData.detail || 
          errorData.title || 
          'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.'
        );
      } else {
        // Para emails não encontrados (404), ainda mostramos sucesso 
        // por razões de segurança
        setIsSubmitSuccessful(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <svg className="h-16 w-16" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0066cc', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#00a1ff', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            
            {/* Hexágono */}
            <polygon 
              points="50,5 87.5,27.5 87.5,72.5 50,95 12.5,72.5 12.5,27.5" 
              fill="white" 
              stroke="url(#blueGradient)" 
              strokeWidth="3"
            />
            
            {/* Design do floco de neve */}
            <path d="M50,20 L50,80" stroke="#0066cc" strokeWidth="4" strokeLinecap="round" />
            <path d="M20,50 L80,50" stroke="#0066cc" strokeWidth="4" strokeLinecap="round" />
            <path d="M28,28 L72,72" stroke="#0066cc" strokeWidth="3" strokeLinecap="round" />
            <path d="M28,72 L72,28" stroke="#0066cc" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="50" r="6" fill="#0066cc" />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t('auth.forgotPassword.title')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('auth.forgotPassword.subtitle')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isSubmitSuccessful ? (
            <div className="rounded-md bg-green-50 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    {t('auth.forgotPassword.successMessage')}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('auth.forgotPassword.backToLogin')}
                </Link>
              </div>
            </div>
          ) : (
            <>
              {apiError && (
                <div className="mb-4 rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{apiError}</h3>
                    </div>
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t('auth.fields.email')}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      className={`block w-full pl-10 pr-3 py-2 sm:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="nome@exemplo.com"
                      {...register('email', {
                        required: 'Email é obrigatório',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email inválido',
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 flex items-center">
                      <ArrowLeft className="mr-1 h-4 w-4" />
                      {t('auth.forgotPassword.backToLogin')}
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? t('auth.forgotPassword.sending') : t('auth.forgotPassword.submit')}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;