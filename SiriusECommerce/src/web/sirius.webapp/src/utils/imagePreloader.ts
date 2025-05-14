// src/utils/imagePreloader.ts

/**
 * Função para pré-carregar imagens em segundo plano enquanto a animação está sendo exibida
 * Isso ajuda a melhorar a experiência do usuário ao garantir que as imagens da página principal
 * já estejam carregadas quando a animação terminar
 */
export const preloadImages = (imageUrls: string[]): void => {
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  };
  
  /**
   * Lista de imagens principais para pré-carregar durante a animação
   */
  export const mainImages = [
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80',
  ];
  
  export default preloadImages;