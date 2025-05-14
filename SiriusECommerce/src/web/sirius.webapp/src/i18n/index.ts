import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptTranslations from '../i18n/locales/pt.json'
import enTranslations from '../i18n/locales/en.json'
import esTranslations from '../i18n/locales/es.json'
import frTranslations from '../i18n/locales/fr.json'
import itTranslations from '../i18n/locales/it.json'
import deTranslations from '../i18n/locales/de.json'
import commonTranslations from '../i18n/locales/common.json'


const language = localStorage.getItem('i18nextLng') || 'en'; // Padrão para inglês caso nao haja valor no localStorage
localStorage.setItem('i18nextLng', language); // Salvar o idioma no localStorage    



i18n
    .use(initReactI18next)
    .init({
        resources: {
            pt: {
                translation: ptTranslations
            },
            en: {
                translation: enTranslations
            },
            es: {
                translation: esTranslations
            },
            fr: {
                translation: frTranslations
            },
            it: {
                translation: itTranslations
            },
            de: {
                translation: deTranslations
            },
            common: {
                translation: commonTranslations                  
            }
        }, 
        lng: language,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }

    });

    export default i18n;

    export { 
        language
     };