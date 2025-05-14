import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Lock, Globe, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SiriusTextLogo from '../../public/sirius-text-only-left.svg';


// Interface para as filiais
interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  region: string;
  isMain?: boolean;
}

const Footer = () => {
  const { t } = useTranslation();
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  
  // Lista de filiais da empresa agrupadas por região
  const branches: Branch[] = [
    {
      id: 'main',
      name: 'Sede Principal',
      address: 'Rua Example, 123 - Porto',
      phone: '+351 123 456 789',
      email: 'sede@sirius.com',
      region: 'norte',
      isMain: true
    },
    {
      id: 'branch1',
      name: 'Filial Lisboa',
      address: 'Av. da Liberdade, 456 - Lisboa',
      phone: '+351 123 456 790',
      email: 'lisboa@sirius.com',
      region: 'centro'
    },
    {
      id: 'branch2',
      name: 'Filial Coimbra',
      address: 'Praça do Comércio, 789 - Coimbra',
      phone: '+351 123 456 791',
      email: 'coimbra@sirius.com',
      region: 'centro'
    },
    {
      id: 'branch3',
      name: 'Filial Algarve',
      address: 'Rua das Palmeiras, 321 - Faro',
      phone: '+351 123 456 792',
      email: 'algarve@sirius.com',
      region: 'sul'
    },
    {
      id: 'branch4',
      name: 'Filial Braga',
      address: 'Av. Central, 567 - Braga',
      phone: '+351 123 456 793',
      email: 'braga@sirius.com',
      region: 'norte'
    }
  ];

  // Encontrar a filial principal
  const mainBranch = branches.find(branch => branch.isMain) || branches[0];
  
  // Agrupar regiões para o seletor
  const regions = [
    { id: 'all', name: 'Todas' },
    { id: 'norte', name: 'Norte' },
    { id: 'centro', name: 'Centro' },
    { id: 'sul', name: 'Sul' }
  ];
  
  // Filtrar filiais pela região selecionada
  const filteredBranches = selectedRegion === 'all' 
    ? branches 
    : branches.filter(branch => branch.region === selectedRegion);
 
  return (
    <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 pt-12 pb-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
                    {/* Seções do rodapé */}

                    {/* Seção Sobre Nós*/}
                    <div>  
                      <div>
                        <h3 className="text-xl font-bold mb-4">{t('footer.group')}</h3>  
                      </div>                    
                      <div>
                        <h3 className="text-md font-bold mb-4 border-t border-gray-800">                         
                          <Link to="/qualitycertifications" className="hover:text-gray-400 text-white flex items-center">
                            {t('footer.qualityCertifications')}
                            <ExternalLink className='ml-2 h-5'/>
                          </Link> 
                        </h3>                        
                      </div>
                      <div>
                        <h3 className="text-md font-bold mb-4 border-t border-gray-800">
                          <Link to="/about" className="hover:text-gray-400 text-white flex items-center">
                            {t('footer.aboutUs')}
                            <ExternalLink className='ml-2 h-5'/>
                          </Link> 
                        </h3>
                        <p className="text-gray-400">
                          {t(`footer.aboutUsDescription`)}
                        </p>
                      </div>
                    </div>

                    {/* Seção Links Rápidos */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">{t(`footer.quickLinks`)}</h3>                        
                        <ul className="space-y-2">
                            <li>
                              <Link to="/products" className="text-gray-400 hover:text-white">
                                {t(`product.title`)}
                              </Link> 
                            </li>
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
                    
                    {/* <div>
                        <h3 className="text-xl font-bold mb-4">{t(`footer.legal`)}</h3>                        
                        <ul className="space-y-2">
                            <li>
                              <Link to="/terms" className="text-gray-400 hover:text-white">
                                {t(`footer.terms`)}  
                              </Link> 
                            </li>
                            <li>
                              <Link to="/privacy" className="text-gray-400 hover:text-white">
                                {t(`footer.privacy`)}  
                              </Link> 
                            </li>
                        </ul>
                    </div> */}
                    {/* Seção de Contato com Mapa de Filiais */}
                    <div className="col-span-1 md:col-span-2">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold">{t('footer.ourLocations')}</h3>
                        <div className="flex items-center bg-gray-800 rounded-md overflow-hidden">
                          <Globe className="h-4 w-4 ml-2 text-gray-400" />
                          <select 
                            className="bg-gray-800 border-none text-sm px-2 py-1 text-gray-300 focus:outline-none"
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                          >
                            {regions.map(region => (
                              <option key={region.id} value={region.id}>
                                {region.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Filial Principal destacada */}
                        <div className="bg-gray-800 rounded-md p-3 border-l-4 border-blue-500">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-white">{mainBranch.name}</span>
                            <span className="text-xs bg-blue-600 px-2 py-0.5 rounded">Principal</span>
                          </div>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                              <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{mainBranch.address}</span>
                            </li>
                            <li className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span className="text-sm">{mainBranch.phone}</span>
                            </li>
                            <li className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span className="text-sm">{mainBranch.email}</span>
                            </li>
                          </ul>
                        </div>
                        
                        {/* Outras filiais filtradas */}
                        {filteredBranches
                          .filter(branch => !branch.isMain)
                          .map(branch => (
                            <div key={branch.id} className="bg-gray-800/50 rounded-md p-3">
                              <div className="font-medium text-white mb-2">{branch.name}</div>
                              <ul className="space-y-1 text-gray-300 text-sm">
                                <li className="flex items-start">
                                  <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                                  <span>{branch.address}</span>
                                </li>
                                <li className="flex items-center">
                                  <Phone className="h-4 w-4 mr-1 flex-shrink-0" />
                                  <span>{branch.phone}</span>
                                </li>
                                <li className="flex items-center">
                                  <Mail className="h-4 w-4 mr-1 flex-shrink-0" />
                                  <span>{branch.email}</span>
                                </li>
                              </ul>
                            </div>
                          ))
                        }
                      </div>
                      
                      {/* Link para página de todas as filiais */}
                      <div className="mt-3 text-center">
                        <Link 
                          to="/our-locations" 
                          className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center"
                        >
                          Ver todas as nossas filiais
                          <MapPin className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                </div>
              </div>
              
              <div className="mt-8 py-4 border-t border-gray-800 items-center flex">
                <div className="mb-4 md:mb-0">
                  <div className="mb-4 md:mb-0  pb-4">
                      <span className="font-bold text-xl">SIRIUS</span>
                      <span className="block text-xs text-blue-200">{t('footer.description')}</span>
                  </div>


                  <div className="flex items-center text-green-400 bg-gray-800 p-2 rounded-lg mb-4 md:mb-4 w-12/12">
                    <Lock className="h-4 w-4 mr-2" />
                    <span className="text-xs">{t('footer.secureSite')}</span>
                  </div>
                  <div className="text-sm text-blue-200 ">
                      &copy; {new Date().getFullYear()} Sirius. {t('footer.allRightsReserved')}
                  </div>  
                </div>
                
                <div className="ml-4 md:mb-0 pt-12 pb-0">
                  <div>
                    <Link to="/" className="flex items-left mb-4">
                      <img src={SiriusTextLogo} alt="Logo" className="h-14 w-30 mr-2" />                      
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-800 mt-4 pt-2 text-left text-gray-400">
                <p className="text-xs">&copy; Powered by - <strong className='text-white'><a href='https://stefantech.me' target='_blank'>Stefan Picciani</a></strong> </p>
              </div>
        </div>
      </footer>
  );
};

export default Footer;