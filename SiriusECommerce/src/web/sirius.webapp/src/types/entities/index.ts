export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  
 
  // Interface para a resposta de erro da API
export interface ApiErrorResponse {
  message?: string;
  code?: string;  
  title?: string;
  status?: number;
  errors?: Record<string, string[] | string>;
  detail?: string;
  type?: string;
  userMessage?: string;
}
