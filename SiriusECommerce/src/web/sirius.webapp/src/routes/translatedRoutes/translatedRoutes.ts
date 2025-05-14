import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import Home from "../../pages/Home";
import Register from "../../pages/Register";
// import Login from "../../backups_insights/Login_bak";
import Login from "../../pages/Login";
import Register1 from "../../backups_insights/Register1";
import ForgotPasswordPage from "../../pages/ForgotPassword";

export type RouteKey = "/" |
"home" | "products" | "about" | "contact" | 
"support" | "login" | "register" | "help" | 
"checkout" | "dashboard" | "account" | "cart" | 
"productDetail" | "productsPage" | "productDetailPage" | "contactPage" |
"supportPage" | "loginPage" | "registerPage" | "helpPage" | 
"checkoutPage" | "dashboardPage" | "accountPage" | "forgotPassword";

// Definição da estrutura das rotas traduzíveis
export interface TranslatedRoute {
    path: string;
    component: React.ComponentType;
}


// Função para obter a rota traduzida com base na chave e função de tradução
export const getTranslatedRoute = (key: RouteKey, t: TFunction): string => {    
    return `/${t(`routes.${key}`)}`;
    
}


// Mapeamento das rotas com suas path traduzíveis
export const createTranslatedRoutes = (t: TFunction) => {
    // Exemplo de como definir rotas traduzíveis
    return {
        home: { path: getTranslatedRoute('home', t), component: Home },
        login: { path: getTranslatedRoute('login', t), component: Login },
        // login: { path: getTranslatedRoute('login', t), component: Login },
        register: { path: getTranslatedRoute("register", t), component: Register1 },
        forgotPassword: {path: getTranslatedRoute("forgotPassword", t), component: ForgotPasswordPage},
        // register: { path: getTranslatedRoute("register", t), component: Register }
    };
};

