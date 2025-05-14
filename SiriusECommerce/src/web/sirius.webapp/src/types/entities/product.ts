export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    }

// Interface para criar/atualizar produto
export interface ProductInput {
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    category: string;
    stock: number;
  }

// Interface para os parâmetros de busca de produtos
export interface ProductQueryParams {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }