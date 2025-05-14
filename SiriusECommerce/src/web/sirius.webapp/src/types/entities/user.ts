export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'customer' | any | null;
    createdAt: string;
  }