
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Lock, Link2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
 
  return (
    <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 pt-12 pb-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">{t('footer.aboutUs')}</h3>
                        <p className="text-gray-400">
                        {t(`footer.aboutUsDescription`)}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">   {t(`footer.quickLinks`)}</h3>                        
                        <ul className="space-y-2">
                              <Link to="/products" >
                                 <li className="text-gray-400 hover:text-white">
                                  {t(`product.title`)}
                                </li>
                             </Link> 
                           <li>
                              <Link to="/support" className="text-gray-400 hover:text-white">
                              {t(`footer.support`)}
                             </Link> 
                           </li>
                           <li>
                              <Link to="/contact" className="text-gray-400 hover:text-white">
                              {t(`footer.contact`)}  
                             </Link> 
                           </li>
                           <li>
                              <Link to="/help" className="text-gray-400 hover:text-white">
                              {t(`footer.help`)}
                              </Link> 
                            </li>
                        </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-4">Contato</h3>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-center">
                          <MapPin className="h-5 w-5 mr-2" />
                          Rua Example, 123
                        </li>
                        <li className="flex items-center">
                          <Phone className="h-5 w-5 mr-2" />
                          +351 123 456 789
                        </li>
                        <li className="flex items-center">
                          <Mail className="h-5 w-5 mr-2" />
                          contato@example.com
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
                      <div className="flex space-x-4 mb-6">
                        <a
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Facebook className="h-6 w-6" />
                        </a>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Instagram className="h-6 w-6" />
                        </a>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Linkedin className="h-6 w-6" />
                        </a>
                      </div>
                      <div className="flex items-center text-green-400 bg-gray-800 p-3 rounded-lg">
                        <Lock className="h-5 w-5 mr-2" />
                        <span className="text-sm">Site Seguro e Criptografado</span>
                      </div>
                    </div>
                  
                </div>
              </div>
               
                 <div className="mb-4 md:mb-0">
                    <span className="font-bold text-xl">SIRIUS</span>
                    <span className="block text-xs text-blue-200">{t('footer.description')}</span>
                </div>
                
                <div className="text-sm text-blue-200">
                    &copy; {new Date().getFullYear()} Sirius. {t('footer.allRightsReserved')}
                </div>  
            <div className="border-t border-gray-800 mt-8 pt-2 text-left text-gray-400">
                {/* <p className="text-sm">Desenvolvido por Stefan Picciani</p> */}
                
                  <p className="text-sm">&copy; Powered by - <strong className='text-white'><a href='https://stefantech.me' target='_blank'>Stefan Picciani</a></strong> </p>
            </div>
        </div>
      </footer>
  );
};

export default Footer;

