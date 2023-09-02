import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export interface FindUniqueParams {
  whereOptions: Prisma.UserWhereUniqueInput;
  selectOptions?: Prisma.UserSelect<DefaultArgs>;
  includeOptions?: Prisma.UserInclude<DefaultArgs>;
}

export interface Credentials {
  userId: string;
  password: string;
}

export interface JwtTokens {
  refreshToken: string;
  accessToken: string;
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  verified: boolean;
  resetPasswordToken: string;
  emailToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Token = {
  token: string;
};

export interface Logoout {
  success: boolean;
}

export interface PrismaUpdateUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  role?: string;
  verified?: boolean;
  emailToken?: string;
  password?: string;
  resetPasswordToken?: string;
}

export interface JwtData {
  secret: string;
  issuer: string;
  audience: string;
  expiresIn: string;
  iat: number;
  exp: number;
}

export interface Register {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  verified: boolean;
  emailToken: string;
  resetPasswordToken: string;
}

export interface HandleEmailOpions {
  email: string;
  subject: string;
  html: string;
}
