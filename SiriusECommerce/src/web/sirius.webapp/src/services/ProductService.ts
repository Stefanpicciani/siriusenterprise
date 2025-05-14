import type { PaginatedResponse } from "../types/entities";
import type { Product, ProductInput, ProductQueryParams } from "../types/entities/Product";
import apiService, { type ApiResponse } from "./Apis";

// Serviço de produtos
export const productService = {
    // Obter lista de produtos com paginação
    getProducts: (params?: ProductQueryParams): ApiResponse<PaginatedResponse<Product>> => 
      apiService.get<PaginatedResponse<Product>>('/products', { params }),
    
    // Obter um produto pelo ID
    getProductById: (id: string): ApiResponse<Product> => 
      apiService.get<Product>(`/products/${id}`),
    
    // Obter produtos por categoria
    getProductsByCategory: (category: string, params?: Omit<ProductQueryParams, 'category'>): ApiResponse<PaginatedResponse<Product>> => 
      apiService.get<PaginatedResponse<Product>>(`/categories/${category}/products`, { params }),
    
    // Criar um novo produto
    createProduct: (product: ProductInput): ApiResponse<Product> => 
      apiService.post<Product>('/products', product),
    
    // Atualizar um produto existente
    updateProduct: (id: string, product: Partial<ProductInput>): ApiResponse<Product> => 
      apiService.put<Product>(`/products/${id}`, product),
    
    // Atualizar parcialmente um produto
    patchProduct: (id: string, product: Partial<ProductInput>): ApiResponse<Product> => 
      apiService.patch<Product>(`/products/${id}`, product),
    
    // Excluir um produto
    deleteProduct: (id: string): ApiResponse<void> => 
      apiService.delete<void>(`/products/${id}`),
    
    // Atualizar o estoque de um produto
    updateProductStock: (id: string, quantity: number): ApiResponse<Product> => 
      apiService.patch<Product>(`/products/${id}/stock`, { quantity }),
    
    // Upload de imagem do produto
    uploadProductImage: (id: string, imageFile: File): ApiResponse<{ imageUrl: string }> => {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      return apiService.post<{ imageUrl: string }>(`/products/${id}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
  };