// src/i18n/languageHandler.tsx
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { type RouteKey, getTranslatedRoute } from '../routes/translatedRoutes/translatedRoutes';
import type { TFunction } from 'i18next';

// Função auxiliar para obter a chave da rota a partir do caminho atual
const getRouteKeyFromPath = (path: string, t: TFunction): RouteKey | null => {
  // Caso especial para a rota raiz
  if (path === '/' || path === '') {
    return 'home';
  }
  
  // Remover barra inicial para normalizar o caminho
  const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
  
  // 1. Verifica correspondência exata com as rotas traduzidas
  const routeKeysToCheck: RouteKey[] = [
    "home", "products", "about", "contact", "support", 
    "login", "register", "help", "checkout", "dashboard", 
    "account", "cart", "productDetail"
  ];
  
  for (const key of routeKeysToCheck) {
    const translatedPath = t(`routes.${key}`);
    if (normalizedPath === translatedPath) {
      return key;
    }
  }
  
  // 2. Fallback mapping
  const fallbackMapping: Record<string, RouteKey> = {
    // Versões simplificadas do seu mapeamento original
    'inicio': 'home',
    'home': 'home',
    'startseite': 'home',
    'accueil': 'home',
    'casa': 'home',
    'produtos': 'products',
    'products': 'products',
    'prodotti': 'products',
    'productos': 'products',
    'produits': 'products',
    'produkte': 'products',
    'register': 'register',
    'registrar': 'register',
    'registrati': 'register',
    'registrarse': 'register',
    'sinscrire': 'register',
    'registrieren': 'register',
    'login': 'login',
    'entrar': 'login',
    'accedi': 'login',
    'iniciarsesion': 'login',
    'connexion': 'login',
    'anmelden': 'login',
    // Adicione outros conforme necessário...
  };
  
  return fallbackMapping[normalizedPath] || null;
};

export const LanguageRouteHandler: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const lastHandledPath = useRef("");
  const lastHandledLang = useRef("");
  const isFirstMount = useRef(true);
  
  useEffect(() => {
    // Não fazer nada na primeira montagem
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    
    // Função para tratar mudanças de idioma
    const handleLanguageChange = () => {
      const currentPath = location.pathname;
      const currentLang = i18n.language;
      
      // Evitar processamento repetido da mesma combinação path/idioma
      if (lastHandledPath.current === currentPath && lastHandledLang.current === currentLang) {
        return;
      }
      
      // Caso especial para a rota raiz
      if (currentPath === '/') {
        const homeTranslated = getTranslatedRoute('home', t);
        // Só redirecionar se a rota home traduzida não for "/"
        if (homeTranslated !== '/' && homeTranslated !== currentPath) {
          lastHandledPath.current = homeTranslated;
          lastHandledLang.current = currentLang;
          navigate(homeTranslated, { replace: true });
        }
        return;
      }
      
      // Para outras rotas, procurar a chave e redirecionar se necessário
      const routeKey = getRouteKeyFromPath(currentPath, t);
      if (routeKey) {
        const newPath = getTranslatedRoute(routeKey, t);
        if (newPath !== currentPath) {
          lastHandledPath.current = newPath;
          lastHandledLang.current = currentLang;
          navigate(newPath, { replace: true });
        }
      }
      
      // Atualizar os valores de referência
      lastHandledPath.current = currentPath;
      lastHandledLang.current = currentLang;
    };
    
    // Registrar o listener para mudança de idioma
    i18n.on('languageChanged', handleLanguageChange);
    
    // Limpar o listener na desmontagem
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n, navigate, t, location.pathname]);
  
  return null;
};


// const fallbackMapping: Record<string, RouteKey> = {
//     // Português (pt)
//     'inicio': 'home',
//     'produtos': 'products',
//     'contato': 'contact',
//     'sobre': 'about',
//     'ajuda': 'help',
//     'registrar': 'register',
//     'entrar': 'login',
//     'carrinho': 'cart',
    
//     // Inglês (en)
//     'home': 'home',
//     'products': 'products',
//     'contact': 'contact',
//     'about': 'about',
//     'help': 'help',
//     'register': 'register',
//     'login': 'login',
//     'cart': 'cart',
    
//     // Espanhol (es)
//     // 'inicio': 'home',
//     'productos': 'products',
//     'contacto': 'contact',
//     'sobre-nosotros': 'about',
//     'ayuda': 'help',
//     'registrarse': 'register',
//     'iniciarsesion': 'login',
//     'carrito': 'cart',
    
//     // Francês (fr)
//     'accueil': 'home',
//     'produits': 'products',
//     // 'contact': 'contact', // Mesmo que inglês
//     'apropos': 'about',
//     'aide': 'help',
//     'sinscrire': 'register',
//     'connexion': 'login',
//     'panier': 'cart',
    
//     // Alemão (de)
//     'startseite': 'home',
//     'produkte': 'products',
//     'kontakt': 'contact',
//     'uberuns': 'about',
//     'hilfe': 'help',
//     'registrieren': 'register',
//     'anmelden': 'login',
//     'warenkorb': 'cart',
    
//     // Italiano (it)
//     // 'home': 'home', // Mesmo que inglês
//     'prodotti': 'products',
//     'contatto': 'contact',
//     'chi-siamo': 'about',
//     'aiuto': 'help',
//     'registrati': 'register',
//     'accedi': 'login',
//     'carrello': 'cart',

//     // Variações adicionais que podem aparecer
//     'about-us': 'about',    
//     'nosotros': 'about',
//     'quienes-somos': 'about',
//     'uber-uns': 'about',
//     'a-propos-de-nous': 'about',
//     'signin': 'login',
//     'sign-in': 'login',
//     'log-in': 'login',
//     'iniciar-sesion': 'login',
//     'se-connecter': 'login',
//     'einloggen': 'login',
//     'checkout': 'checkout',
//     'finalizar-compra': 'checkout',
//     'paiement': 'checkout',
//     'zur-kasse': 'checkout',
//     'pagamento': 'checkout',
//     'help-center': 'help',
//     'centro-de-ayuda': 'help',
//     'centre-d-aide': 'help',
//     'hilfecenter': 'help',
//     'centro-aiuto': 'help',
//     'support': 'support',
//     'soporte': 'support',
//     'supporto': 'support',    
//   };