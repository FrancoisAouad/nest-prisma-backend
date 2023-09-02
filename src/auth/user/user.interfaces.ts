import { Profile } from './user.types';

export interface Success {
  success: boolean;
}

export interface Register extends Success {
  accessToken: string;
  refreshToken: string;
  profile: Profile;
}
export interface Token {
  token: string;
}
export interface RegisterInterface {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}
export interface RefreshTokenInterface {
  refreshToken: string;
}
export interface RefreshToken {
  refreshToken: string;
  accessToken: string;
}

export interface ResetPasswordInterface extends Token {
  password: string;
}

export interface ForgotPasswordInterface {
  email: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}
