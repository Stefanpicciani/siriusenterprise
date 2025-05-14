interface Environment {
    apiBaseUrl: string;
    appName: string;
    appVersion: string;
    isDevelopment: boolean;
    isProduction: boolean;
    enableLogging: boolean;
    authCookieSecure: boolean;
  }
  
  export const env: Environment = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
    appName: import.meta.env.VITE_APP_NAME as string,
    appVersion: import.meta.env.VITE_APP_VERSION as string,
    isDevelopment: import.meta.env.MODE === 'development',
    isProduction: import.meta.env.MODE === 'production',
    enableLogging: (import.meta.env.VITE_ENABLE_LOGGING || 'false') === 'true',
    authCookieSecure: (import.meta.env.VITE_AUTH_COOKIE_SECURE || 'false') === 'true',
  };
  
  // Logger configurável que só exibe logs em ambientes apropriados
  export const logger = {
    log: (...args: any[]) => {
      if (env.enableLogging) {
        console.log(...args);
      }
    },
    error: (...args: any[]) => {
      if (env.enableLogging) {
        console.error(...args);
      }
    },
    warn: (...args: any[]) => {
      if (env.enableLogging) {
        console.warn(...args);
      }
    },
    info: (...args: any[]) => {
      if (env.enableLogging) {
        console.info(...args);
      }
    },
  };
  
  export default env;