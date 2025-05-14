


import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import SiriusLogo from '../../public/sirius-logo-only.svg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTranslatedRoute } from '../routes/translatedRoutes/translatedRoutes';

// Interface para as propriedades do componente
interface HeaderProps {
  activeLink?: string;
  onLinkClick?: (link: string) => void;
}

// Interface para os itens do menu
interface MenuItem {
  id: string;
  label: string;
  url: string;
}

const Navbar: React.FC<HeaderProps> = ({ activeLink = 'home', onLinkClick }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { t, i18n } = useTranslation();  
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('i18nextLng')); // Estado para armazenar o idioma atual
  useEffect(() => {
    setCurrentLanguage(localStorage.getItem('i18nextLng')); // Atualiza o idioma atual quando o componente é montado
  }, [i18n.language]); // Adiciona i18n.language como dependência para atualizar o idioma atual quando o idioma mudar

  // Lista de itens do menu
  const menuItems: MenuItem[] = [
    { id: 'home', label: 'HOME', url: '/' },
    { id: 'products', label: `${t('nav.products').toUpperCase()}`, url: '/produtos' },    
    { id: 'about', label: `${t('nav.aboutUs').toUpperCase()}`, url: '/sobre' },
    { id: 'contact', label: `${t('nav.contact').toUpperCase()}`, url: '/contato' }
  ];

  // Efeito para verificar o tamanho da tela
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    // Verificar tamanho inicial
    checkScreenSize();
    
    // Adicionar listener para redimensionamento
    window.addEventListener('resize', checkScreenSize);
    
    // Limpar o listener quando o componente for desmontado
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handler para clique nos links
  const handleLinkClick = (item: MenuItem) => {
    if (onLinkClick) {
      onLinkClick(item.id);
    }
    setIsMenuOpen(false);
  };

  // Toggle para o menu mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 md:px-8 py-3 flex justify-between items-center">
      {/* <div className="max-w-6xl mx-auto px-6 md:px-8 py-3 flex justify-between items-center"> */}
        {/* Logo com link para a home */}
        <div className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center" 
            // onClick={(e) => {
            //   e.preventDefault();
            //   handleLinkClick(menuItems[0]);
            // }}
          >
            {/* SVG do logo */}
            <img src={SiriusLogo} alt="" width={60} className="mr-4"/>
            
            {/* Texto do logo */}
            <div className="flex flex-col">
              <span 
                className="font-bold text-xl md:text-2xl tracking-wider"
                style={{
                  background: 'linear-gradient(to right, #0066cc, #00a1ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                SIRIUS
              </span>
              <span className="text-xs text-blue-700 tracking-wide -mt-1 hidden sm:block">
                {t('nav.description')}    
              </span>    
            </div>
          </Link>
        </div>

        {/* Botão de menu mobile */}
        {isMobile && (
          <button 
            className="flex flex-col justify-center items-center w-10 h-10 border-none bg-transparent cursor-pointer"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span 
              className={`block w-6 h-0.5 bg-blue-700 my-1 transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''
              }`}
            ></span>
            <span 
              className={`block w-6 h-0.5 bg-blue-700 my-1 transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span 
              className={`block w-6 h-0.5 bg-blue-700 my-1 transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''
              }`}
            ></span>
          </button>
        )}

        {/* Menu de navegação */}
        <nav 
          className={`
            ${isMobile ? 'fixed top-16 left-0 w-full bg-white shadow-md' : 'flex items-center'} 
            ${isMobile && !isMenuOpen ? 'h-0 overflow-hidden' : ''} 
            ${isMobile && isMenuOpen ? 'h-auto' : ''}
            transition-all duration-300 ease-in-out
          `}
        >
          <ul 
            className={`
              ${isMobile ? 'flex-col py-4' : 'flex'} 
              list-none m-0 p-0
            `}
          >
            {menuItems.map((item) => (
              <li 
                key={item.id} 
                className={`
                  ${isMobile ? 'w-full text-center' : 'ml-6'} 
                `}
              >
                <Link
                  to={item.url}                   
                  className={`
                    font-sans text-sm text-blue-700 no-underline 
                    transition duration-300 ease-in-out
                    ${isMobile ? 'block py-4' : 'px-3 py-2 rounded-2xl'}
                    ${activeLink === item.id ? 'font-bold bg-blue-50' : 'hover:bg-blue-50'}
                  `}
                  onClick={(e) => {
                    // e.preventDefault();
                    handleLinkClick(item);
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSelector />
          <Link
            // to={t('routes.login')}
            to={getTranslatedRoute('login', t)}
            className="text-sm text-white bg-blue-400 px-4 py-2 rounded-md hover:bg-gray-500"
            >
              {t('nav.login')}
          </Link>
          <Link
             to={getTranslatedRoute('register', t)}
            className="text-sm text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {t('nav.register')}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

