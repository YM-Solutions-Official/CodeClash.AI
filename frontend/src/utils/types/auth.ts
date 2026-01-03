export interface User {
  id: string;
  email?: string;
  username: string;
  isGuest: boolean;
  stats?: {
    wins: number;
    losses: number;
    draws: number;
  };
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}
