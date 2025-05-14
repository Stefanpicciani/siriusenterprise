export interface Category {
    id: string;
    name: string;
    slug: string;
  }
  
// Interface para criar/atualizar categoria
export interface CategoryInput {
  name: string;
  slug?: string;
}
