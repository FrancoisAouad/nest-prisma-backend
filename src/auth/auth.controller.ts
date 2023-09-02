import { Request } from 'express';
import { Controller, Post, Body, HttpStatus, HttpCode, Patch, Param, Get, UseInterceptors, UseGuards, Req, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Token } from './auth.interface';
import { UserService } from './user/user.service';
import { OauthService } from './oauth/oauth.service';
import { ForgotPasswordDto, LoginDto, LogoutDto, RefreshTokenDto, RegisterDto, ResetPasswordDto } from './auth.dto';
import { GlobalInterceptor } from '../global/global.interceptor';
import { AuthenticationGuard } from '../global/guards/auth.guard';
import { Register } from './user/user.interfaces';
import { Login, Logout } from './user/user.types';
import { LoggerInterceptor } from '../global/logger/logger.interceptor';
import { AuthRoute } from '../config/enums.routes';
import { DisableLog } from '../global/global.decorator';

@ApiTags('Authentication')
@Controller('auth')
@UseInterceptors(GlobalInterceptor, LoggerInterceptor)
export class AuthController {
  public constructor(private readonly userService: UserService, private readonly oauthService: OauthService) {}

  @Post(AuthRoute.REGISTER)
  @HttpCode(HttpStatus.CREATED)
  @DisableLog()
  register(@Body() body: RegisterDto): Promise<Register> {
    return this.userService.register(body);
  }

  @Post(AuthRoute.LOGIN)
  @HttpCode(HttpStatus.OK)
  @DisableLog()
  login(@Body() body: LoginDto): Promise<Login> {
    return this.userService.login(body);
  }

  @Delete(AuthRoute.LOGOUT)
  @UseGuards(AuthenticationGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Body() body: LogoutDto): Promise<Logout> {
    return this.userService.logout(body);
  }

  @Post(AuthRoute.FORGOT_PASSWORD)
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.userService.forgotPassword(body);
  }

  @Get(AuthRoute.VERIFY_ACCOUNT)
  @HttpCode(HttpStatus.OK)
  verifyAccount(@Param() param: Token) {
    return this.userService.verifyAccount(param);
  }

  @Patch(AuthRoute.RESET_PASSWORD)
  @DisableLog()
  resetPassword(@Param() token: Token, @Body() body: ResetPasswordDto) {
    return this.userService.resetPassword(token, body);
  }

  @Post(AuthRoute.REFRESH_TOKEN)
  @HttpCode(HttpStatus.CREATED)
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.userService.refreshToken(body);
  }

  @Get(AuthRoute.FACEBOOK)
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req: Request) {
    return this.oauthService.facebookAuth(req);
  }

  @Get(AuthRoute.FACEBOOK_CALLBACK)
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req: Request) {
    return this.oauthService.facebookAuthRedirect(req);
  }

  @Get(AuthRoute.GOOGLE)
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {
    return this.oauthService.googleAuth(req);
  }

  @Get(AuthRoute.GOOGLE_CALLBACK)
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request) {
    return this.oauthService.googleAuthRedirect(req);
  }
}
