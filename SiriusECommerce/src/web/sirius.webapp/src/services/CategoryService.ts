import type { Category, CategoryInput } from "../types/entities/Category";
import { api, type ApiResponse } from "./Apis";

// Serviço de categorias
export const categoryService = {
    // Obter todas as categorias
    getCategories: (): ApiResponse<Category[]> => 
      api.get<Category[]>('/categories'),
    
    // Obter uma categoria pelo ID
    getCategoryById: (id: string): ApiResponse<Category> => 
      api.get<Category>(`/categories/${id}`),
    
    // Obter uma categoria pelo slug
    getCategoryBySlug: (slug: string): ApiResponse<Category> => 
      api.get<Category>(`/categories/slug/${slug}`),
    
    // Criar uma nova categoria
    createCategory: (category: CategoryInput): ApiResponse<Category> => 
      api.post<Category>('/categories', category),
    
    // Atualizar uma categoria existente
    updateCategory: (id: string, category: Partial<CategoryInput>): ApiResponse<Category> => 
      api.put<Category>(`/categories/${id}`, category),
    
    // Excluir uma categoria
    deleteCategory: (id: string): ApiResponse<void> => 
      api.delete<void>(`/categories/${id}`)
  };