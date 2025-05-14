import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios';
import i18n from '../i18n';
import env, { logger } from '../config/enviroment';
import { useNavigate } from 'react-router-dom';
import { config } from '../config/Env';
import type { ApiErrorResponse } from '../types/entities';


export type ApiResponse<T> = Promise<AxiosResponse<T>>;

const apiClient: AxiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_URL, // ou criar aqui o config env url e process com o node
  baseURL: config.url.API_URL, // ou criar aqui o config env url e process com o node
  headers: {'Content-Type': 'application/json'},
  timeout: 100000,
});


apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('acessToken');
    if(token){           
      config.headers.Authorization = `Bearer ${token}`;                         
    }        
    return config;
  }
);


apiClient.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {      
      if (env.enableLogging) {
        logger.info(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, 
          response.status, response.data);
      }
        return response;
    },
    async (error: AxiosError): Promise<AxiosError> => {
        if (env.enableLogging) {
          logger.error('❌ Response Error:', error.response?.status, error.message, error.response?.data);
        }
      
        if(error.response?.status === 401){
            // Redirecionar para a página de login ou fazer logout
            // window.location.href = '/login'; // Exemplo de redirecionamento
            //mostrar mensagem de erro de sessão expirada ou inválida, com um timer  da modal

            localStorage.removeItem('acessToken');
            localStorage.removeItem('refreshToken');

            if (env.isProduction) {
              // window.location.href = '/login';
              
              //  redirectTo('/login');
              // return Promise.reject(formatErrorResponse(error));
            }

                        
            // redirectTo('/login');
            // return Promise.reject(formatErrorResponse(error));
            
        }

        const errorMessage = getErrorMessage(error);


        return Promise.reject({
            ...error,
            message: errorMessage
        });
    }
);

const getErrorMessage = (error: AxiosError): string => {

    const status = error.response?.status;

    switch(status) {
        case 400:
          return i18n.t('errors.badRequest');
        case 401:
          return i18n.t('errors.unauthorized');
        case 403:
          return i18n.t('errors.forbidden');
        case 404:
          return i18n.t('errors.notFound');
        case 500:
          return i18n.t('errors.serverError');
        default:
          return i18n.t('errors.unknown');
    }
};




export default apiClient;

const { get, post, put, delete: destroy, patch } = apiClient;

export { get, post, put, destroy };

