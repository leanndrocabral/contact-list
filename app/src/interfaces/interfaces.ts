export interface LoginInput {
  email: string;
  password: string;
}

export interface CreateClientInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  telephone: string;
}

export interface ContextProps {
  children: React.ReactNode;
}

export interface Context {
  clientLogin: (payload: LoginInput) => Promise<void>;
  createClient: (payload: CreateClientInput) => Promise<void>;
}

export interface PrismaClientArray {
  email: string;
  telephone: string;
}

