export interface User {
  id: string;
  email: string;
  password: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface SafeUser {
  id: string;
  email: string;
  name: string | null;
}
