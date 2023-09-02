import { RefreshTokenInterface, Register, Success } from './user.interfaces';

export type Token = {
  token: string;
};

export type Profile = {
  username: string;
  email: string;
  role: string;
};

export type Logout = Success;
export type Login = Register;
export type ForgotPassword = Success;
export type ResetPassword = Success;
export type verifyAccount = Success;
export type LogoutInterface = RefreshTokenInterface;
