import { Role } from '../config/enums';
import { IsString, MinLength, MaxLength, IsEmail, IsIn, IsJWT } from 'class-validator';
// import { RegisterInterface } from './user/user.interfaces';

// export const _RegisterDto = retrieveDtoClass(AuthenticationDtoEnum.REGISTER);
// export class RegisterDto extends _RegisterDto implements RegisterInterface {}

// export const _LoginDto = retrieveDtoClass(AuthenticationDtoEnum.LOGIN);
// export class LoginDto extends _LoginDto {}

// export const _ForgotPassword = retrieveDtoClass(AuthenticationDtoEnum.FORGOT_PASSWORD);
// export class ForgotPasswordDto extends _ForgotPassword {}

// export const _ResetPassword = retrieveDtoClass(AuthenticationDtoEnum.RESET_PASSWORD);
// export class ResetPasswordDto extends _ResetPassword {}

// export const _LogoutDto = retrieveDtoClass(AuthenticationDtoEnum.LOGOUT);
// export class LogoutDto extends _LogoutDto {}

// export const _RefreshTokenDto = retrieveDtoClass(AuthenticationDtoEnum.REFRESH_TOKEN);
// export class RefreshTokenDto extends _RefreshTokenDto {}

export class RegisterDto {
  @IsString()
  @MinLength(2, { message: 'firstname must be at least 2 character' })
  @MaxLength(20, { message: 'username must be at most 20 characters' })
  firstName: string;

  @IsString()
  @MinLength(2, { message: 'username must be at least 2 character' })
  @MaxLength(20, { message: 'username must be at most 20 characters' })
  lastName: string;

  @IsString({ message: 'username is not valid' })
  @MinLength(5, { message: 'username must be at least 5 character' })
  @MaxLength(32, { message: 'username must be at most 32 characters' })
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'password must be at least 6 character' })
  @MaxLength(32, { message: 'password must be at most 32 characters' })
  password: string;

  @IsString()
  @MinLength(6, { message: 'password must be at least 6 character' })
  @MaxLength(32, { message: 'password must be at most 32 characters' })
  confirmPassword: string;

  @IsString()
  @IsIn(Object.values(Role))
  role: string;
}

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'password must be at least 6 character' })
  @MaxLength(32, { message: 'password must be at most 32 characters' })
  password: string;
}

export class ForgotPasswordDto {
  @IsString()
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @IsString()
  @MinLength(6, { message: 'password must be at least 6 character' })
  @MaxLength(32, { message: 'password must be at most 32 characters' })
  password: string;

  @IsString()
  @MinLength(6, { message: 'password must be at least 6 character' })
  @MaxLength(32, { message: 'password must be at most 32 characters' })
  confirmPassword: string;

  token: string;
}

export class LogoutDto {
  @IsString()
  @IsJWT()
  refreshToken: string;
}

export class RefreshTokenDto {
  @IsString()
  @IsJWT()
  refreshToken: string;
}
