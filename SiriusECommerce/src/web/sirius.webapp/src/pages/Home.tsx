import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ShoppingBag, 
  Shield, 
  Truck, 
  Headphones, 
  Star, 
  TrendingUp, 
  ChevronRight,
  Clock,
  Percent,
  ThumbsUp
} from 'lucide-react';
import { Helmet } from 'react-helmet';
import WelcomeAnimation from '../components/WelcomeAnimation';
import { preloadImages, mainImages } from '../utils/imagePreloader';

const Home = () => { 
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [showIntro, setShowIntro] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  // Pré-carregar imagens enquanto exibe a animação
  useEffect(() => {
    preloadImages(mainImages);
    setPageLoaded(true);
  }, []);

  // Verificar se o usuário já viu a animação antes
  useEffect(() => {
    // Verificar o parâmetro na URL para forçar a exibição da animação (para testes)
    const urlParams = new URLSearchParams(window.location.search);
    const forceIntro = urlParams.get('intro') === 'true';
    
    // Verificar se já mostrou a animação antes
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');

    if (forceIntro || !hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  // Função para finalizar a animação
  const handleIntroFinish = () => {
    setShowIntro(false);
    localStorage.setItem('hasSeenIntro', 'true');

    // Limpar parâmetro da URL após exibir a animação
    const url = new URL(window.location.href);
    url.searchParams.delete('intro');
    window.history.replaceState({}, document.title, url.toString());
  };






   // Benefícios em destaque
   const benefits = [
    {
      id: 'guarantee',
      title: t('home.benefits.guarantee.title') || 'Garantia Estendida',
      description: t('home.benefits.guarantee.description') || 'Todos os produtos com até 3 anos de garantia',
      icon: <Shield className="h-8 w-8 text-blue-500" />
    },
    {
      id: 'delivery',
      title: t('home.benefits.delivery.title') || 'Frete Grátis',
      description: t('home.benefits.delivery.description') || 'Para pedidos acima de R$ 5.000',
      icon: <Truck className="h-8 w-8 text-blue-500" />
    },
    {
      id: 'support',
      title: t('home.benefits.support.title') || 'Suporte 24/7',
      description: t('home.benefits.support.description') || 'Assistência técnica especializada',
      icon: <Headphones className="h-8 w-8 text-blue-500" />
    }
  ];

  // Lista de produtos para tradução dinâmica
  const products = [
    { 
      id: 'refrigerators', 
      name: t('home.products.refrigeratorsTitle'),
      icon: (
        <svg className="h-20 w-20 text-blue-500" viewBox="0 0 64 64" aria-hidden="true">
          <rect width="48" height="58" x="8" y="3" fill="none" stroke="currentColor" strokeWidth="2" rx="2" />
          <rect width="44" height="20" x="10" y="5" fill="none" stroke="currentColor" strokeWidth="1.5" rx="1" />
          <line x1="10" y1="32" x2="54" y2="32" stroke="currentColor" strokeWidth="1.5" />
          <line x1="32" y1="32" x2="32" y2="58" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="45" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="44" cy="45" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    },
    { 
      id: 'freezers', 
      name: t('home.products.freezersTitle'),
      icon: (
        <svg className="h-20 w-20 text-blue-500" viewBox="0 0 64 64" aria-hidden="true">
          <rect width="48" height="40" x="8" y="12" fill="none" stroke="currentColor" strokeWidth="2" rx="2" />
          <rect width="44" height="8" x="10" y="14" fill="none" stroke="currentColor" strokeWidth="1.5" rx="1" />
          <line x1="18" y1="8" x2="18" y2="14" stroke="currentColor" strokeWidth="1.5" />
          <line x1="46" y1="8" x2="46" y2="14" stroke="currentColor" strokeWidth="1.5" />
          <path d="M18,8 L46,8" stroke="currentColor" strokeWidth="1.5" />
          <line x1="16" y1="30" x2="48" y2="30" stroke="currentColor" strokeWidth="1.5" />
          <line x1="16" y1="42" x2="48" y2="42" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    },
    { 
      id: 'coldRooms', 
      name: t('home.products.coldRoomsTitle'),
      icon: (
        <svg className="h-20 w-20 text-blue-500" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M10,12 L54,12 L54,52 L10,52 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M10,12 L10,52 L40,52 L40,12 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect width="8" height="12" x="42" y="25" fill="none" stroke="currentColor" strokeWidth="1.5" rx="1" />
          <line x1="10" y1="28" x2="40" y2="28" stroke="currentColor" strokeWidth="1.5" />
          <line x1="20" y1="52" x2="20" y2="58" stroke="currentColor" strokeWidth="1.5" />
          <line x1="44" y1="52" x2="44" y2="58" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    }
  ];


  // Produtos em destaque/mais procurados
  const trendingProducts = [
    {
      id: 'commercial-refrigerator-pro',
      name: 'Refrigerador Comercial Pro Series',
      category: 'refrigerators',
      price: '€ 7.899,00',
      originalPrice: '€ 8.599,00',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?auto=format&fit=crop&q=80&w=400',
      discount: 8,
      tag: 'new',
      badgeText: 'Mais Vendido'
    },
    {
      id: 'vertical-freezer-600l',
      name: 'Freezer Vertical 600 Litros',
      category: 'freezers',
      price: '€ 5.699,00',
      originalPrice: '€ 6.299,00',
      rating: 4.7,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZXplcnxlbnwwfHwwfHx8MA%3D%3D',
      // image: 'https://siriusmedia.s3.eu-west-2.amazonaws.com/CustomerDataSheet/20240410162950270_d1669287-3fd7-4b17-839f-0fd2107fc525_274010-7.jpg',
      // image: 'https://images.unsplash.com/photo-1584992236310-6eded29bb7b4?auto=format&fit=crop&q=80&w=400',
      discount: 10,
      tag: 'popular',
      badgeText: 'Economia de Energia'
    },
    {
      id: 'cold-room-modular',
      name: 'Câmara Fria Modular Hoteleira',
      category: 'coldRooms',
      price: '€ 12.999,00',
      originalPrice: '€ 13.999,00',
      rating: 4.9,
      reviews: 56,
      image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      discount: 7,
      tag: 'premium',
      badgeText: 'Premium'
    },
    {
      id: 'fridge-counter-2doors',
      name: 'Balcão Refrigerado 2 Portas',
      category: 'refrigerators',
      price: '€ 4.299,00',
      originalPrice: '€ 4.499,00',
      rating: 4.6,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1585057638352-55e2e0155b55?auto=format&fit=crop&q=80&w=400',
      discount: 5,
      tag: 'promo',
      badgeText: 'Promoção'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Meta tags SEO */}
      <Helmet>
        <html lang={currentLanguage} />
        <title>{t('home.pageTitle') || t('home.welcome')}</title>
        <meta name="description" content={t('home.pageDescription') || t('home.subtitle')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={t('home.pageTitle') || t('home.welcome')} />
        <meta property="og:description" content={t('home.pageDescription') || t('home.subtitle')} />
        <meta property="og:image" content="/images/sirius-og-image.jpg" />
        <meta property="og:type" content="website" />
        
        {/* Idiomas alternativos */}
        <link rel="alternate" href={`${window.location.origin}?lng=pt`} hrefLang="pt" />
        <link rel="alternate" href={`${window.location.origin}?lng=en`} hrefLang="en" />
        <link rel="alternate" href={`${window.location.origin}?lng=it`} hrefLang="it" />
        <link rel="alternate" href={`${window.location.origin}?lng=de`} hrefLang="de" />
        <link rel="alternate" href={`${window.location.origin}?lng=es`} hrefLang="es" />
        <link rel="alternate" href={`${window.location.origin}?lng=fr`} hrefLang="fr" />
      </Helmet>

      {/* Animação de Introdução */}
      {showIntro && <WelcomeAnimation onFinish={handleIntroFinish} />}

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="relative h-[500px] rounded-2xl overflow-hidden mb-12">
          <img
            src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80"
            alt={t('home.hero.title')}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl text-white">
                <h1 className="text-5xl font-bold mb-4">
                  {t('home.hero.title')}
                </h1>
                <p className="text-xl mb-8">
                  {t('home.hero.description')}
                </p>
                <Link
                  to="/products"
                  className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
                >
                  {t('home.hero.button')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Banner de Benefícios */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map(benefit => (
                <div key={benefit.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        {/* <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">{t('home.features.title')}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <ShoppingBag className="h-12 w-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">{t('home.features.premiumProducts.title')}</h3>
              <p className="text-gray-600">{t('home.features.premiumProducts.description')}</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">{t('home.features.warranty.title')}</h3>
              <p className="text-gray-600">{t('home.features.warranty.description')}</p>
            </div>
            <div className="text-center">
              <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">{t('home.features.delivery.title')}</h3>
              <p className="text-gray-600">{t('home.features.delivery.description')}</p>
            </div>
            <div className="text-center">
              <Headphones className="h-12 w-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">{t('home.features.support.title')}</h3>
              <p className="text-gray-600">{t('home.features.support.description')}</p>
            </div>
          </div>
        </section> */}

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">{t('home.features.title')}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <ShoppingBag className="h-12 w-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">{t('home.features.premiumProducts.title')}</h3>
              <p className="text-gray-600">{t('home.features.premiumProducts.description')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">{t('home.features.warranty.title')}</h3>
              <p className="text-gray-600">{t('home.features.warranty.description')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">{t('home.features.delivery.title')}</h3>
              <p className="text-gray-600">{t('home.features.delivery.description')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <Headphones className="h-12 w-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">{t('home.features.support.title')}</h3>
              <p className="text-gray-600">{t('home.features.support.description')}</p>
            </div>
          </div>
        </section>


        {/* Featured Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">{t('home.categories.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative h-64 rounded-lg overflow-hidden group shadow-md">
              <img
                src="https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80"
                alt={t('home.categories.kitchen')}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{t('home.categories.kitchen')}</h3>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden group shadow-md">
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80"
                alt={t('home.categories.laundry')}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{t('home.categories.laundry')}</h3>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden group shadow-md">
              <img
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80"
                alt={t('home.categories.furniture')}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{t('home.categories.furniture')}</h3>
              </div>
            </div>
          </div>
        </section>


        {/* Trending Products Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-blue-700">
              <TrendingUp className="inline-block h-8 w-8 mr-2 -mt-1" />
              {t('home.trending.title') || 'Mais Procurados'}
            </h2>
            <Link 
              to="/products/trending" 
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              {t('home.trending.viewAll') || 'Ver todos'} 
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <Link to={`/products/${product.category}/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  </Link>
                  
                  {/* Badge */}
                  {product.badgeText && (
                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.badgeText}
                    </div>
                  )}
                  
                  {/* Discount tag */}
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-3 w-3" 
                          fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                  
                  <Link to={`/products/${product.category}/${product.id}`}>
                    <h3 className="font-bold text-lg mb-1 text-gray-800 hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center mb-2">
                    <span className="font-bold text-lg text-blue-700">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/products/${product.category}/${product.id}`}
                      className="flex-1 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      {t('home.products.details') || 'Detalhes'}
                    </Link>
                    <button 
                      className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200 transition-colors"
                      aria-label="Adicionar ao carrinho"
                    >
                      <ShoppingBag className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Products Categories Section - Melhorado */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">{t('nav.products')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 flex items-center justify-center h-52 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>
                <div className="p-6 border-t border-blue-100">
                  <h3 className="font-bold text-xl mb-3 text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.products.description')}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/products/${item.id}`}
                      className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center"
                    >
                      {t('home.products.button')}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs">
                      {index === 0 ? '15+ produtos' : index === 1 ? '12+ produtos' : '8+ produtos'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        
        {/* Banner Promocional */}
        <section className="mb-16">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?auto=format&fit=crop&q=80"
              alt="Promoção Especial"
              className="w-full h-64 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/50 flex items-center">
              <div className="px-8 md:px-16 max-w-xl">
                <div className="bg-white/20 text-white text-sm px-3 py-1 rounded-full inline-block backdrop-blur-sm mb-3">
                  <Clock className="h-3 w-3 inline-block mr-1" /> Oferta por tempo limitado
                </div>
                <h3 className="text-white text-3xl font-bold mb-3">Promoção de Inverno</h3>
                <p className="text-white/90 mb-4">
                  Economize até 20% em equipamentos de refrigeração para seu hotel. Aproveite esta oferta exclusiva!
                </p>
                <Link
                  to="/products/promo"
                  className="bg-white text-blue-700 px-6 py-2 rounded-lg font-semibold inline-block hover:bg-blue-50 transition"
                >
                  Ver Ofertas
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">{t('home.whyChooseUs.title') || 'Por que nos escolher?'}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-600">
              <ThumbsUp className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="font-bold text-xl mb-2">{t('home.whyChooseUs.experience.title') || 'Experiência'}</h3>
              <p className="text-gray-600">
                {t('home.whyChooseUs.experience.description') || 'Mais de 15 anos fornecendo equipamentos de alta qualidade para o setor hoteleiro.'}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-600">
              <Percent className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="font-bold text-xl mb-2">{t('home.whyChooseUs.efficiency.title') || 'Eficiência'}</h3>
              <p className="text-gray-600">
                {t('home.whyChooseUs.efficiency.description') || 'Nossos equipamentos são projetados para maximizar a eficiência energética e reduzir custos operacionais.'}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-600">
              <Star className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="font-bold text-xl mb-2">{t('home.whyChooseUs.quality.title') || 'Qualidade'}</h3>
              <p className="text-gray-600">
                {t('home.whyChooseUs.quality.description') || 'Trabalhamos apenas com as melhores marcas e materiais, garantindo durabilidade e confiabilidade.'}
              </p>
            </div>
          </div>
        </section>
        
         {/* Pequeno banner de qualidade na parte inferior */}
     
        <div className="bg-blue-50 p-4 rounded mb-6">
          <h3 className="font-semibold text-blue-700 mb-2 text-center">
            {t('home.quality.title')}
          </h3>
          <p className="text-blue-600 text-sm text-center">
            {t('home.quality.description')}
          </p>
        </div>


{/* ###################### */}


{/* Trending Products Section - Enhanced */}
<section className="mb-16 py-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-3xl font-bold text-blue-700 flex items-center">
          <TrendingUp className="inline-block h-8 w-8 mr-2 -mt-1" />
          {t('home.trending.title') || 'Mais Procurados'}
        </h2>
        <p className="text-gray-600 mt-2">
          {t('home.trending.subtitle') || 'Os produtos preferidos pelos nossos clientes'}
        </p>
      </div>
      <Link 
        to="/products/trending" 
        className="text-blue-600 hover:text-blue-800 flex items-center"
      >
        {t('home.trending.viewAll') || 'Ver todos'} 
        <ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {trendingProducts.map((product) => (
        <div 
          key={product.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="relative">
            <Link to={`/products/${product.category}/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            </Link>
            
            {/* Badge */}
            {product.badgeText && (
              <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                {product.badgeText}
              </div>
            )}
            
            {/* Discount tag */}
            {product.discount > 0 && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{product.discount}%
              </div>
            )}
            
            {/* Quick view overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button 
                className="bg-white text-blue-600 font-medium px-4 py-2 rounded-md text-sm hover:bg-blue-50 mx-1"
                aria-label="Visualização rápida"
              >
                Visualização rápida
              </button>
            </div>
          </div>
          
          <div className="p-4">
            {/* Category tag */}
            <div className="mb-2">
              <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {product.category === 'refrigerators' ? 'Refrigerador' : 
                 product.category === 'freezers' ? 'Freezer' : 'Câmara Fria'}
              </span>
            </div>
            
            <div className="flex items-center mb-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-3 w-3" 
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
            </div>
            
            <Link to={`/products/${product.category}/${product.id}`}>
              <h3 className="font-bold text-lg mb-1 text-gray-800 hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
            </Link>
            
            <div className="flex items-center mb-3">
              <span className="font-bold text-lg text-blue-700">{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
              )}
            </div>
            
            {/* Stock info */}
            <div className="mb-3">
              <span className="text-xs text-green-600 flex items-center">
                <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Em estoque - Pronta entrega
              </span>
            </div>
            
            <div className="flex space-x-2">
              <Link
                to={`/products/${product.category}/${product.id}`}
                className="flex-1 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
              >
                {t('home.products.details') || 'Detalhes'}
              </Link>
              <button 
                className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200 transition-colors"
                aria-label="Adicionar ao carrinho"
              >
                <ShoppingBag className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


{/* Products Categories Section - Enhanced */}
<section className="mb-16">
  <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
    {t('nav.products')}
    <span className="block text-base font-normal text-gray-600 mt-2">
      {t('home.products.subtitle') || 'Soluções completas para seu estabelecimento'}
    </span>
  </h2>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {products.map((item, index) => (
      <div 
        key={index} 
        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group relative"
      >
        {/* Badge indicando popularidade */}
        {index === 0 && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            Mais Vendido
          </div>
        )}
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 flex items-center justify-center h-52 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
          <div className="group-hover:scale-110 transition-transform duration-300">
            {item.icon}
          </div>
        </div>
        
        <div className="p-6 border-t border-blue-100">
          <h3 className="font-bold text-xl mb-3 text-gray-800">{item.name}</h3>
          <p className="text-gray-600 mb-4">
            {t(`home.products.${item.id}.description`) || t('home.products.description')}
          </p>
          
          {/* Product Features List */}
          <ul className="mb-4 text-sm text-gray-600">
            {[1, 2, 3].map((featureNum) => (
              <li key={featureNum} className="flex items-center mb-1">
                <svg className="h-4 w-4 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t(`home.products.${item.id}.feature${featureNum}`) || `Característica ${featureNum}`}
              </li>
            ))}
          </ul>
          
          <div className="flex items-center justify-between">
            <Link
              to={`/products/${item.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition flex items-center"
            >
              {t('home.products.button')}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs">
              {index === 0 ? '15+ produtos' : index === 1 ? '12+ produtos' : '8+ produtos'}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  
  {/* Ver Todos os Produtos button */}
  <div className="text-center mt-8">
    <Link
      to="/products"
      className="inline-flex items-center justify-center bg-blue-100 text-blue-700 font-medium px-6 py-3 rounded-lg hover:bg-blue-200 transition"
    >
      {t('home.products.viewAll') || 'Ver todos os produtos'}
      <ChevronRight className="h-5 w-5 ml-1" />
    </Link>
  </div>
</section>

{/* Comentários e Avaliações dos Clientes */}
<section className="mb-16">
  <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
    {t('home.testimonials.title') || 'O que nossos clientes dizem'}
  </h2>
  
  <div className="grid md:grid-cols-3 gap-6">
    {/* Avaliação 1 */}
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      <div className="flex text-yellow-400 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4" fill="currentColor" />
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic">
        "Os refrigeradores comerciais da Sirius transformaram a eficiência da cozinha do nosso hotel. O consumo de energia caiu 20% e a manutenção é mínima."
      </p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-3">
          RM
        </div>
        <div>
          <h4 className="font-bold text-gray-800">Rafael Mendes</h4>
          <p className="text-sm text-gray-500">Chef Executivo, Hotel Palácio</p>
        </div>
      </div>
      <div className="absolute -top-2 -right-2 text-blue-100">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
    </div>
    
    {/* Avaliação 2 */}
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      <div className="flex text-yellow-400 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4" fill={i < 4 ? "currentColor" : "none"} />
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic">
        "Investimos em três câmaras frias da Sirius e a diferença na conservação dos alimentos é notável. O suporte técnico é excelente e sempre disponível."
      </p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-3">
          AS
        </div>
        <div>
          <h4 className="font-bold text-gray-800">Amanda Silva</h4>
          <p className="text-sm text-gray-500">Gerente, Restaurante Vivace</p>
        </div>
      </div>
      <div className="absolute -top-2 -right-2 text-blue-100">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
    </div>
    
    {/* Avaliação 3 */}
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      <div className="flex text-yellow-400 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4" fill="currentColor" />
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic">
        "A qualidade dos freezers verticais superou nossas expectativas. Após dois anos de uso intenso, continuam funcionando como novos. Recomendo totalmente."
      </p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-3">
          CP
        </div>
        <div>
          <h4 className="font-bold text-gray-800">Carlos Pereira</h4>
          <p className="text-sm text-gray-500">Proprietário, Sorveteria Glacial</p>
        </div>
      </div>
      <div className="absolute -top-2 -right-2 text-blue-100">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
    </div>
  </div>
  
  <div className="text-center mt-8">
    <Link 
      to="/testimonials" 
      className="text-blue-600 hover:text-blue-800 inline-flex items-center font-medium"
    >
      {t('home.testimonials.viewAll') || 'Ver todas as avaliações'} 
      <ChevronRight className="h-4 w-4 ml-1" />
    </Link>
  </div>
</section>

{/* Blog/Artigos Recentes */}
<section className="mb-16">
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-3xl font-bold text-blue-700">
      {t('home.blog.title') || 'Blog & Dicas'}
    </h2>
    <Link 
      to="/blog" 
      className="text-blue-600 hover:text-blue-800 flex items-center"
    >
      {t('home.blog.viewAll') || 'Ver todos os artigos'} 
      <ChevronRight className="h-4 w-4 ml-1" />
    </Link>
  </div>
  
  <div className="grid md:grid-cols-3 gap-6">
    {/* Artigo 1 */}
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to="/blog/economia-energia-refrigeracao">
        <img
          src="https://images.unsplash.com/photo-1606171047533-0f39518631c3?auto=format&fit=crop&q=80&w=400"
          alt="Economia de energia em sistemas de refrigeração"
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </Link>
      <div className="p-5">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>15 Abr, 2025</span>
        </div>
        <Link to="/blog/economia-energia-refrigeracao">
          <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-blue-600 transition-colors">
            Como reduzir em 30% o consumo de energia dos seus equipamentos de refrigeração
          </h3>
        </Link>
        <p className="text-gray-600 mb-3 line-clamp-2">
          Dicas práticas para otimizar o funcionamento dos seus refrigeradores comerciais e reduzir significativamente o consumo de energia.
        </p>
        <Link 
          to="/blog/economia-energia-refrigeracao" 
          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
        >
          Ler mais 
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
    
    {/* Artigo 2 */}
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to="/blog/manutencao-preventiva">
        <img
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=400"
          alt="Manutenção preventiva de equipamentos"
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </Link>
      <div className="p-5">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>2 Abr, 2025</span>
        </div>
        <Link to="/blog/manutencao-preventiva">
          <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-blue-600 transition-colors">
            Guia completo de manutenção preventiva para câmaras frias
          </h3>
        </Link>
        <p className="text-gray-600 mb-3 line-clamp-2">
          Aprenda a identificar problemas antes que eles aconteçam e garanta a longevidade dos seus equipamentos de refrigeração industrial.
        </p>
        <Link 
          to="/blog/manutencao-preventiva" 
          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
        >
          Ler mais 
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
    
    {/* Artigo 3 */}
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to="/blog/tendencias-refrigeracao">
        <img
          src="https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&q=80&w=400"
          alt="Tendências em refrigeração"
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </Link>
      <div className="p-5">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>25 Mar, 2025</span>
        </div>
        <Link to="/blog/tendencias-refrigeracao">
          <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-blue-600 transition-colors">
            Tendências de 2025 para refrigeração comercial sustentável
          </h3>
        </Link>
        <p className="text-gray-600 mb-3 line-clamp-2">
          Descubra as principais inovações em refrigeração comercial que estão tornando o setor mais sustentável e economicamente viável.
        </p>
        <Link 
          to="/blog/tendencias-refrigeracao" 
          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
        >
          Ler mais 
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  </div>
</section>

{/* Newsletter Subscription */}
<section className="mb-16">
  <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-10">
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="mb-6 md:mb-0 md:mr-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          {t('home.newsletter.title') || 'Mantenha-se atualizado!'}
        </h2>
        <p className="text-blue-100 max-w-md">
          {t('home.newsletter.description') || 'Assine nossa newsletter e receba dicas, promoções exclusivas e novidades do setor de refrigeração comercial.'}
        </p>
      </div>
      
      <div className="w-full md:w-auto">
        <form className="flex flex-col sm:flex-row">
          <input
            type="email"
            placeholder={t('home.newsletter.placeholder') || 'Seu e-mail profissional'}
            className="px-4 py-3 rounded-lg sm:rounded-r-none mb-2 sm:mb-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-950 text-white font-semibold px-6 py-3 rounded-lg sm:rounded-l-none transition-colors"
          >
            {t('home.newsletter.button') || 'Assinar'}
          </button>
        </form>
        <p className="text-blue-200 text-sm mt-2">
          {t('home.newsletter.privacy') || 'Respeitamos sua privacidade. Você pode cancelar a assinatura a qualquer momento.'}
        </p>
      </div>
    </div>
  </div>
</section>

{/* Parceiros e Marcas */}
<section className="mb-16">
  <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
    {t('home.partners.title') || 'Parceiros e Marcas'}
  </h2>
  
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center justify-items-center">
    {/* Logos de parceiros/marcas */}
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
        <div className="bg-gray-100 rounded-lg h-16 w-28 flex items-center justify-center">
          <span className="font-bold text-gray-500">Logo {index + 1}</span>
        </div>
      </div>
    ))}
  </div>
</section>

{/* CTA Final */}
<section className="mb-8">
  <div className="bg-blue-50 rounded-2xl p-8 md:p-12 text-center">
    <h2 className="text-3xl font-bold text-blue-700 mb-4">
      {t('home.cta.title') || 'Pronto para transformar seu negócio?'}
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
      {t('home.cta.description') || 'Converse com nossos especialistas e descubra como nossos equipamentos de refrigeração podem otimizar seu estabelecimento.'}
    </p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link
        to="/contact"
        className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        {t('home.cta.contactButton') || 'Entre em contato'}
      </Link>
      <Link
        to="/catalog"
        className="bg-white text-blue-700 border border-blue-200 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
      >
        {t('home.cta.catalogButton') || 'Baixar catálogo'}
      </Link>
    </div>
  </div>
</section>
{/* ###################### */}



      </main>

     
      
      {/* Botão para reexibir a animação de introdução (apenas para testes) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4">
          <button
            // onClick={() => window.location.href = '/?intro=true'}
            onClick={() => setShowIntro(true)}
            className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full shadow-md opacity-70 hover:opacity-100"
          >
            Replay Intro
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;