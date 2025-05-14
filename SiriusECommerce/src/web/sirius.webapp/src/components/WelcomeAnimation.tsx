// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';

// interface WelcomeAnimationProps {
//   onFinish: () => void;
// }

// const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ onFinish }) => {
//   const { t } = useTranslation();
//   const [step, setStep] = useState(0);
//   const [visible, setVisible] = useState(true);

//   // Efeito para animar a sequência
//   useEffect(() => {
//     const timer1 = setTimeout(() => {
//       setStep(1);
//     }, 1000);

//     const timer2 = setTimeout(() => {
//       setStep(2);
//     }, 2500);

//     const timer3 = setTimeout(() => {
//       setStep(3);
//     }, 4000);

//     const timer4 = setTimeout(() => {
//       setVisible(false);
//       setTimeout(() => onFinish(), 1000); // Aguarda a animação de saída terminar
//     }, 6000);

//     return () => {
//       clearTimeout(timer1);
//       clearTimeout(timer2);
//       clearTimeout(timer3);
//       clearTimeout(timer4);
//     };
//   }, [onFinish]);

//   return (
//     <div 
//       className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-blue-900 to-black transition-opacity duration-1000 ${
//         visible ? 'opacity-100' : 'opacity-0'
//       }`}
//     >
//       <div className="text-center max-w-xl px-4">
//         <div className="mb-8 transform transition-all duration-700 scale-100">
//           {/* Logo Sirius Animado */}
//           <svg 
//             className={`h-32 w-32 mx-auto mb-6 ${step >= 1 ? 'opacity-100' : 'opacity-0'} transition-all duration-700`} 
//             viewBox="0 0 100 100" 
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             {/* Forma hexagonal */}
//             <polygon 
//               points="50,5 87.5,27.5 87.5,72.5 50,95 12.5,72.5 12.5,27.5" 
//               fill="none" 
//               stroke="white" 
//               strokeWidth="3"
//               strokeDasharray="400"
//               strokeDashoffset={step >= 1 ? "0" : "400"}
//               style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
//             />
            
//             {/* Design do floco de neve */}
//             <path 
//               d="M50,20 L50,80" 
//               stroke="white" 
//               strokeWidth="3" 
//               strokeLinecap="round"
//               strokeDasharray="60"
//               strokeDashoffset={step >= 2 ? "0" : "60"}
//               style={{ transition: 'stroke-dashoffset 0.5s ease-out 1.5s' }}
//             />
//             <path 
//               d="M20,50 L80,50" 
//               stroke="white" 
//               strokeWidth="3" 
//               strokeLinecap="round"
//               strokeDasharray="60"
//               strokeDashoffset={step >= 2 ? "0" : "60"}
//               style={{ transition: 'stroke-dashoffset 0.5s ease-out 1.7s' }}
//             />
//             <path 
//               d="M28,28 L72,72" 
//               stroke="white" 
//               strokeWidth="2" 
//               strokeLinecap="round"
//               strokeDasharray="60"
//               strokeDashoffset={step >= 2 ? "0" : "60"}
//               style={{ transition: 'stroke-dashoffset 0.5s ease-out 1.9s' }}
//             />
//             <path 
//               d="M28,72 L72,28" 
//               stroke="white" 
//               strokeWidth="2" 
//               strokeLinecap="round"
//               strokeDasharray="60"
//               strokeDashoffset={step >= 2 ? "0" : "60"}
//               style={{ transition: 'stroke-dashoffset 0.5s ease-out 2.1s' }}
//             />
            
//             {/* Ponto central */}
//             <circle 
//               cx="50" 
//               cy="50" 
//               r={step >= 3 ? "6" : "0"}
//               fill="#00a1ff"
//               style={{ transition: 'r 0.5s ease-out' }}
//             />
//           </svg>
//         </div>
        
//         <h1 
//           className={`text-5xl font-bold text-white mb-4 transition-all duration-700 transform ${
//             step >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//           }`}
//         >
//           {t('home.welcome')}
//         </h1>
        
//         <p 
//           className={`text-xl text-blue-100 mb-8 transition-all duration-700 delay-300 transform ${
//             step >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//           }`}
//         >
//           {t('home.subtitle')}
//         </p>
        
//         <div 
//           className={`w-16 h-1 bg-blue-400 mx-auto mb-8 transition-all duration-700 transform ${
//             step >= 3 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
//           }`}
//         ></div>
        
//         <p 
//           className={`text-lg text-blue-200 transition-all duration-700 delay-500 transform ${
//             step >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//           }`}
//         >
//           {t('home.quality.description')}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default WelcomeAnimation;









// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';

// interface WelcomeAnimationProps {
//   onFinish: () => void;
// }

// const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ onFinish }) => {
//   const { t } = useTranslation();
//   const [step, setStep] = useState(0);
//   const [visible, setVisible] = useState(true);
//   const [showSkipButton, setShowSkipButton] = useState(false);

//   // Efeito para animar a sequência
//   useEffect(() => {
//     // Mostrar botão de pular após 2 segundos
//     const timerShowSkip = setTimeout(() => {
//       setShowSkipButton(true);
//     }, 2000);

//     // Sequência de animação mais longa
//     const timer1 = setTimeout(() => {
//       setStep(1);
//     }, 1500);

//     const timer2 = setTimeout(() => {
//       setStep(2);
//     }, 3500);

//     const timer3 = setTimeout(() => {
//       setStep(3);
//     }, 5500);
    
//     const timer4 = setTimeout(() => {
//       setStep(4);
//     }, 7500);

//     // Duração total aumentada para 12 segundos
//     const timer5 = setTimeout(() => {
//       setVisible(false);
//       setTimeout(() => onFinish(), 1000); // Aguarda a animação de saída terminar
//     }, 12000);

//     return () => {
//       clearTimeout(timerShowSkip);
//       clearTimeout(timer1);
//       clearTimeout(timer2);
//       clearTimeout(timer3);
//       clearTimeout(timer4);
//       clearTimeout(timer5);
//     };
//   }, [onFinish]);

//   // Função para pular a animação
//   const handleSkip = () => {
//     setVisible(false);
//     setTimeout(() => onFinish(), 1000);
//   };

//   return (
//     <div 
//       className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-blue-900 to-black transition-opacity duration-1000 ${
//         visible ? 'opacity-100' : 'opacity-0'
//       }`}
//     >
//       <div className="text-center max-w-2xl px-4 relative">
//         {/* Botão para pular animação */}
//         {showSkipButton && (
//           <button 
//             onClick={handleSkip}
//             className={`absolute top-0 right-0 mt-4 mr-4 px-4 py-2 bg-blue-600 bg-opacity-30 hover:bg-opacity-50 text-white text-sm rounded-full transition-all duration-300 transform ${
//               showSkipButton ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
//             }`}
//           >
//             {t('animation.skip') || 'Pular Introdução'}
//           </button>
//         )}

//         <div className="mb-12 transform transition-all duration-700 scale-100">
//           {/* Logo Sirius Animado */}
//           <svg 
//             className={`h-40 w-40 mx-auto mb-8 ${step >= 1 ? 'opacity-100' : 'opacity-0'} transition-all duration-1000`} 
//             viewBox="0 0 100 100" 
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             {/* Brilho de fundo (pulsa lentamente) */}
//             <circle 
//               cx="50" 
//               cy="50" 
//               r="44" 
//               fill="rgba(0, 102, 204, 0.1)" 
//               className={`${step >= 1 ? 'animate-pulse-slow' : ''}`}
//             />
            
//             {/* Forma hexagonal */}
//             <polygon 
//               points="50,5 87.5,27.5 87.5,72.5 50,95 12.5,72.5 12.5,27.5" 
//               fill="none" 
//               stroke="white" 
//               strokeWidth="3"
//               strokeDasharray="400"
//               strokeDashoffset={step >= 1 ? "0" : "400"}
//               style={{ transition: 'stroke-dashoffset 2s ease-out' }}
//             />
            
//             {/* Design do floco de neve */}
//             <path 
//               d="M50,20 L50,80" 
//               stroke="white" 
//               strokeWidth="3" 
//               strokeLinecap="round"
//               strokeDasharray="60"
//               strokeDashoffset={step >= 2 ? "0" : "60"}
//               style={{ transition: 'stroke-dashoffset 0.8s ease-out 2s' }}
//             />
//             <path 
//               d="M20,50 L80,50" 
//               stroke="white" 
//               strokeWidth="3" 
//               strokeLinecap="round"
//               strokeDasharray="60"
//               strokeDashoffset={step >= 2 ? "0" : "60"}
//               style={{ transition: 'stroke-dashoffset 0.8s ease-out 2.3s' }}
//             />
//             <path 
//               d="M28,28 L72,72" 
//               stroke="white" 
//               strokeWidth="2" 
//               strokeLinecap="round"
//               strokeDasharray="60"
//               strokeDashoffset={step >= 2 ? "0" : "60"}
//               style={{ transition: 'stroke-dashoffset 0.8s ease-out 2.6s' }}
//             />
//             <path 
//               d="M28,72 L72,28" 
//               stroke="white" 
//               strokeWidth="2" 
//               strokeLinecap="round"
//               strokeDasharray="60"
//               strokeDashoffset={step >= 2 ? "0" : "60"}
//               style={{ transition: 'stroke-dashoffset 0.8s ease-out 2.9s' }}
//             />
            
//             {/* Ponto central com efeito de brilho */}
//             <circle 
//               cx="50" 
//               cy="50" 
//               r={step >= 3 ? "6" : "0"}
//               fill="#00a1ff"
//               style={{ transition: 'r 0.8s ease-out' }}
//             />
            
//             {/* Efeito de brilho */}
//             <circle 
//               cx="50" 
//               cy="50" 
//               r={step >= 3 ? "12" : "0"}
//               fill="none"
//               stroke="#00a1ff"
//               strokeWidth="1"
//               strokeOpacity="0.6"
//               style={{ transition: 'r 1s ease-out 0.3s' }}
//             />
//             <circle 
//               cx="50" 
//               cy="50" 
//               r={step >= 3 ? "18" : "0"}
//               fill="none"
//               stroke="#00a1ff"
//               strokeWidth="0.5"
//               strokeOpacity="0.3"
//               style={{ transition: 'r 1.2s ease-out 0.6s' }}
//             />
//           </svg>
//         </div>
        
//         <h1 
//           className={`text-5xl font-bold text-white mb-6 transition-all duration-1000 transform ${
//             step >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//           }`}
//         >
//           {t('home.welcome')}
//         </h1>
        
//         <p 
//           className={`text-xl text-blue-100 mb-10 transition-all duration-1000 delay-300 transform ${
//             step >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//           }`}
//         >
//           {t('home.subtitle')}
//         </p>
        
//         <div 
//           className={`w-24 h-1 bg-blue-400 mx-auto mb-10 transition-all duration-1000 transform ${
//             step >= 3 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
//           }`}
//         ></div>
        
//         <p 
//           className={`text-lg text-blue-200 mx-auto max-w-xl mb-12 transition-all duration-1000 delay-500 transform ${
//             step >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//           }`}
//         >
//           {t('home.quality.description')}
//         </p>
        
//         {/* Botão para entrar no site */}
//         <button
//           onClick={handleSkip}
//           className={`px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition-all duration-1000 transform ${
//             step >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//           }`}
//         >
//           {t('animation.enter') || 'Explorar Sirius'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WelcomeAnimation;








import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface WelcomeAnimationProps {
  onFinish: () => void;
}

const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ onFinish }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Imagens de fundo que transmitem confiança e modernidade
  const backgroundImages = [
    // Hotel moderno com equipamentos de refrigeração profissional
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1920',
    // Cozinha industrial moderna de hotel
    'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&q=80&w=1920',
    // Recepção de hotel de luxo
    'https://images.unsplash.com/photo-1529290130-4ca3753253ae?auto=format&fit=crop&q=80&w=1920'
  ];

  // Efeito para animar a sequência
  useEffect(() => {
    // Mostrar e alternar imagens de fundo
    const timerBg1 = setTimeout(() => {
      setBackgroundOpacity(0.25);
    }, 500);

    const timerBg2 = setTimeout(() => {
      setCurrentBgIndex(1);
      setBackgroundOpacity(0.2);
    }, 5500);

    const timerBg3 = setTimeout(() => {
      setCurrentBgIndex(2);
      setBackgroundOpacity(0.15);
    }, 9500);

    // Mostrar botão de pular após 2 segundos
    const timerShowSkip = setTimeout(() => {
      setShowSkipButton(true);
    }, 2000);

    // Sequência de animação principal
    const timer1 = setTimeout(() => {
      setStep(1);
    }, 1500);

    const timer2 = setTimeout(() => {
      setStep(2);
    }, 3500);

    const timer3 = setTimeout(() => {
      setStep(3);
    }, 5500);
    
    const timer4 = setTimeout(() => {
      setStep(4);
    }, 7500);

    // Duração total aumentada para 15 segundos
    const timer5 = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onFinish(), 1000); // Aguarda a animação de saída terminar
    }, 15000);

    return () => {
      clearTimeout(timerBg1);
      clearTimeout(timerBg2);
      clearTimeout(timerBg3);
      clearTimeout(timerShowSkip);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onFinish]);

  // Função para pular a animação
  const handleSkip = () => {
    setVisible(false);
    setTimeout(() => onFinish(), 1000);
  };

  // Adicionando uma leve animação de flutuação ao conteúdo central
  const floatingAnimationClass = step >= 2 ? 'animate-float' : '';

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-1000 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Fundo gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-black"></div>
      
      {/* Imagem de fundo com transição suave */}
      <div 
        className="absolute inset-0 bg-center bg-cover transition-opacity duration-2000"
        style={{
          backgroundImage: `url(${backgroundImages[currentBgIndex]})`,
          opacity: backgroundOpacity,
        }}
      ></div>

      {/* Partículas de fundo (efeito de estrelas) */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-30"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 10 + 's'
            }}
          ></div>
        ))}
      </div>

      {/* Overlay para ajudar na legibilidade do texto */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-900/20 to-black/70"></div>

      <div className="text-center max-w-2xl px-4 relative z-10">
        {/* Botão para pular animação */}
        {showSkipButton && (
          <button 
            onClick={handleSkip}
            className={`absolute top-0 right-0 mt-4 mr-4 px-4 py-2 bg-blue-600 bg-opacity-30 hover:bg-opacity-50 text-white text-sm rounded-full transition-all duration-300 transform ${
              showSkipButton ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            {t('animation.skip') || 'Pular Introdução'}
          </button>
        )}

        {/* Elemento decorativo superior */}
        <div 
          className={`w-20 h-1 bg-blue-400 mx-auto mb-8 transition-all duration-1000 transform ${
            step >= 1 ? 'scale-100 opacity-70' : 'scale-0 opacity-0'
          }`}
        ></div>

        <div className={`mb-12 transform transition-all duration-700 ${floatingAnimationClass}`}>
          {/* Logo Sirius Animado */}
          <svg 
            className={`h-40 w-40 mx-auto mb-8 ${step >= 1 ? 'opacity-100' : 'opacity-0'} transition-all duration-1000`} 
            viewBox="0 0 100 100" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Brilho de fundo (pulsa lentamente) */}
            <circle 
              cx="50" 
              cy="50" 
              r="44" 
              fill="rgba(0, 102, 204, 0.1)" 
              className={`${step >= 1 ? 'animate-pulse-slow' : ''}`}
            />
            
            {/* Forma hexagonal */}
            <polygon 
              points="50,5 87.5,27.5 87.5,72.5 50,95 12.5,72.5 12.5,27.5" 
              fill="none" 
              stroke="white" 
              strokeWidth="3"
              strokeDasharray="400"
              strokeDashoffset={step >= 1 ? "0" : "400"}
              style={{ transition: 'stroke-dashoffset 2s ease-out' }}
            />
            
            {/* Design do floco de neve */}
            <path 
              d="M50,20 L50,80" 
              stroke="white" 
              strokeWidth="3" 
              strokeLinecap="round"
              strokeDasharray="60"
              strokeDashoffset={step >= 2 ? "0" : "60"}
              style={{ transition: 'stroke-dashoffset 0.8s ease-out 2s' }}
            />
            <path 
              d="M20,50 L80,50" 
              stroke="white" 
              strokeWidth="3" 
              strokeLinecap="round"
              strokeDasharray="60"
              strokeDashoffset={step >= 2 ? "0" : "60"}
              style={{ transition: 'stroke-dashoffset 0.8s ease-out 2.3s' }}
            />
            <path 
              d="M28,28 L72,72" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round"
              strokeDasharray="60"
              strokeDashoffset={step >= 2 ? "0" : "60"}
              style={{ transition: 'stroke-dashoffset 0.8s ease-out 2.6s' }}
            />
            <path 
              d="M28,72 L72,28" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round"
              strokeDasharray="60"
              strokeDashoffset={step >= 2 ? "0" : "60"}
              style={{ transition: 'stroke-dashoffset 0.8s ease-out 2.9s' }}
            />
            
            {/* Ponto central com efeito de brilho */}
            <circle 
              cx="50" 
              cy="50" 
              r={step >= 3 ? "6" : "0"}
              fill="#00a1ff"
              style={{ transition: 'r 0.8s ease-out' }}
            />
            
            {/* Efeito de brilho */}
            <circle 
              cx="50" 
              cy="50" 
              r={step >= 3 ? "12" : "0"}
              fill="none"
              stroke="#00a1ff"
              strokeWidth="1"
              strokeOpacity="0.6"
              style={{ transition: 'r 1s ease-out 0.3s' }}
            />
            <circle 
              cx="50" 
              cy="50" 
              r={step >= 3 ? "18" : "0"}
              fill="none"
              stroke="#00a1ff"
              strokeWidth="0.5"
              strokeOpacity="0.3"
              style={{ transition: 'r 1.2s ease-out 0.6s' }}
            />
          </svg>
        </div>
        
        <h1 
          className={`text-5xl font-bold text-white mb-6 transition-all duration-1000 transform ${
            step >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } ${floatingAnimationClass}`}
        >
          {t('home.welcome')}
        </h1>
        
        <p 
          className={`text-xl text-blue-100 mb-10 transition-all duration-1000 delay-300 transform ${
            step >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {t('home.subtitle')}
        </p>
        
        <div 
          className={`w-24 h-1 bg-blue-400 mx-auto mb-10 transition-all duration-1000 transform ${
            step >= 3 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        ></div>
        
        <p 
          className={`text-lg text-blue-200 mx-auto max-w-xl mb-12 transition-all duration-1000 delay-500 transform ${
            step >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {t('home.quality.description')}
        </p>
        
        {/* Distintivos de confiança */}
        <div 
          className={`flex justify-center space-x-6 mb-10 transition-all duration-1000 transform ${
            step >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        {/* Botão para entrar no site */}
        {/* <button
          onClick={handleSkip}
          className={`mt-5 ml-8 px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition-all duration-1000 transform ${
            step >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {t('animation.enter') || 'Explorar Sirius'}
        </button> */}
        
        {/* Badge de confiança na parte inferior */}
        <div 
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center text-sm text-blue-200 transition-all duration-1000 ${
            step >= 3 ? 'opacity-70' : 'opacity-0'
          }`}
        >
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {t('animation.trustBadge') || 'Equipamentos de Qualidade e Confiança desde 1957'}
        </div>
      </div>
    </div>
  );
};

export default WelcomeAnimation;