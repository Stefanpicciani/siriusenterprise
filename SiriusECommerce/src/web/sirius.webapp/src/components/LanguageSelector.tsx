import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Opções de idioma
    const languages = [
        // { code: 'pt', label: 'Português', flag: '🇧🇷' },
        { code: 'pt', label: 'Português', flag: '🇵🇹' },
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'it', label: 'Italiano', flag: '🇮🇹' },
        { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
        { code: 'es', label: 'Español', flag: '🇪🇸' },
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
    ];

    // Encontrar o idioma atual
    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    // Função para trocar idioma
    const changeLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode);
        setIsOpen(false);
        // Salvar a preferência no localStorage
        localStorage.setItem('i18nextLng', langCode);
    };

    useEffect(() => {
        // Verificar se o idioma está salvo no localStorage e definir o idioma inicial
        const savedLanguage = localStorage.getItem('i18nextLng') || 'en';
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        } else {
            i18n.changeLanguage(languages[0].code); // Definir o primeiro idioma como padrão
        }
    },[]);

    // Fechar o dropdown quando clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md hover:bg-blue-50 transition duration-200"
            >
                <span className="mr-1">{currentLanguage.flag}</span>
                <span className="text-sm font-medium hidden md:inline">{currentLanguage.label}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200">
                    <div className="py-1">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => changeLanguage(language.code)}
                                className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-blue-50 transition duration-150
                                    ${i18n.language === language.code ? 'font-medium text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                            >
                                <span className="mr-2">{language.flag}</span>
                                {language.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;