// src/components/EnvironmentDebugInfo.tsx
import React from 'react';

import { useTranslation } from 'react-i18next';
import env from '../config/enviroment';

const EnvironmentDebugInfo: React.FC = () => {
  const { i18n } = useTranslation();
  
  // Não mostrar nada em produção
  if (env.isProduction) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 right-0 bg-black bg-opacity-80 text-white text-xs p-2 rounded-tl-md m-0 z-50 font-mono">
      <div>ENV: {env.isDevelopment ? '🔧 DEV' : '🚀 PROD'}</div>
      <div>API: {env.apiBaseUrl}</div>
      <div>LANG: {i18n.language}</div>
      <div>VERSION: {env.appVersion}</div>
    </div>
  );
};

export default EnvironmentDebugInfo;