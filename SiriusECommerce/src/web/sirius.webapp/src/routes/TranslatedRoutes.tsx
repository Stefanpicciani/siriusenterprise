import React from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Navigate } from 'react-router-dom';
import { createTranslatedRoutes } from './translatedRoutes/translatedRoutes';
import Home from '../pages/Home';

export const TranslatedRoutes: React.FC = () => {
    const { t } = useTranslation();
    const routes = createTranslatedRoutes(t);


    return (
        <Routes>
            <Route path={"/"} element={<Home />} />
            
            {/* Rotas traduzidas */}
            <Route path={routes.home.path} element={<routes.home.component />} />           
            <Route path={routes.register.path} element={<routes.register.component />} />
            <Route path={routes.login.path} element={<routes.login.component />} />
            <Route path={routes.forgotPassword.path} element={<routes.forgotPassword.component />} />
            
            {/* Fallbacks para URLs fixas */}            
            <Route path="/home" element={<Navigate to={routes.home.path} replace />} />
            <Route path="/register" element={<Navigate to={routes.register.path} replace />} />
            <Route path="/login" element={<Navigate to={routes.login.path} replace />} />
            <Route path="/forgotPassword" element={<Navigate to={routes.forgotPassword.path} replace />} />
                    
            {/* Capturar rotas não encontradas */}
            {/* <Route path="*" element={<Navigate to={routes.home.path} />} /> */}

        </Routes>
    );
}