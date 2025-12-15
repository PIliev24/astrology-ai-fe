// Internal format (camelCase) for storage
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

// API Response format (snake_case)
export interface AuthResponse {
  success: boolean;
  access_token: string;
  refresh_token: string;
  user?: User;
  message?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

