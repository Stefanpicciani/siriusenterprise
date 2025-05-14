// import type { User } from "./User";


// Interface para os dados de login
export interface LoginCredentials {
    email: string;
    password: string;
}

// Interface para os dados do formulário
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}
 
// Interface para os dados de registro
export interface RegisterData extends LoginCredentials {
    firstName: string;
    lastName: string;    
    confirmPassword: string;
}

// Interface para resposta de autenticação
export interface AuthResponse {
    // user: User;
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
    userToken: UserToken;
}

export interface UserToken{
    id: string;
    email: string;
    claims?: UserClaims[];
}

export interface UserClaims {
    value: string;
    type: string;
}

// export interface AuthContextType {
//     user: User | null;
//     login: (credentials: LoginCredentials) => Promise<void>;
//     logout: () => void;
//     register: (data: RegisterData) => Promise<void>;
//     isAuthenticated: boolean;
//     loading: boolean;
//     error: string | null;
// }
