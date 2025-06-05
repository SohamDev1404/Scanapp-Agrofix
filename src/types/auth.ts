
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  name?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'admin' | 'user') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
  role: 'admin' | 'user';
}
