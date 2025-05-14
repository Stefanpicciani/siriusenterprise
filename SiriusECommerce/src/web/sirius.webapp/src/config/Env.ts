import env from "./enviroment";

const dev = {
    url: {
        API_URL: "https://localhost:44363/api/",        
        // API_URL: "https://api.siriuspt.eu/api/",
    },
  };
  
  const prod = {
    url: {
      API_URL: "https://api.siriuspt.eu/api/",
    },
  };
  
  export const config =
    env.isDevelopment  ? dev : prod;
  
  