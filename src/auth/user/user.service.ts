import { compare } from 'bcryptjs';
import { Cache } from 'cache-manager';
import { SendMailOptions } from 'nodemailer';
import { JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Logout, Login, ForgotPassword, ResetPassword, verifyAccount, LogoutInterface } from './user.types';
import {
  RegisterInterface,
  RefreshToken,
  Register,
  Token,
  RefreshTokenInterface,
  ResetPasswordInterface,
  ForgotPasswordInterface,
  LoginInterface,
} from './user.interfaces';
import { AuthService } from '../auth.service';
import errorMessages from '../auth.errorMessages';
import { AuthRepository } from '../auth.repository';
import { HandleEmailOpions } from '../auth.interface';
import { Logger } from '../../global/logger/logger';
import { MailService } from '../../utils/nodemailer.service';
import { HttpException } from '../../global/exceptions/exception';

@Injectable()
export class UserService {
  public constructor(
    private readonly logger: Logger,
    private readonly authRepository: AuthRepository,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  /**
   * @function register - Main method used to register users
   * @param {RegisterDto} body
   */
  public async register(body: RegisterInterface): Promise<Register> {
    const { email, password } = body;
    // check if user already exists
    const user = await this.authRepository.findOne({ email });
    // // if exists return exception
    if (user) {
      const error = new HttpException(errorMessages().userAlreadyExists);
      this.logger.error(`User with email: ${body.email} is already registered`, { service: 'AuthService' }, { err: error });
      throw error;
    }
    const { firstName, lastName, username, role } = body;
    // encrypt password
    const hashedPassword = await this.authService.hashPassword(password);
    // generate token to verify user
    const emailToken = await this.authService.generateToken();
    try {
      const data = {
        email,
        firstName,
        lastName,
        username,
        role,
        verified: false,
        emailToken,
        resetPasswordToken: '',
      };
      const newUser = await this.authRepository.create(data);
      // connect credential document to user
      await this.authRepository.handleCredentials({ userId: newUser?.id, password: hashedPassword });
      const payload: JwtSignOptions = {
        expiresIn: 24 * 60 * 60,
        subject: newUser?.id,
        issuer: 'nest-app.com',
      };
      const { accessToken, refreshToken } = this.authService.generateJwtToken(payload);
      const verifyAccounToken = this.authService.genVerifyAccountToken({ issuer: 'nest-app.com', subject: newUser?.id });
      const htmlMessage = `<h2>Welcome ${newUser?.username} to Nest Application! </h2>
                           <br/>
                           <p> This is the latest demo project for a nest application using Prisma and PostrgeSQL </p>
                           <br/>
                           <p>You still have to verify your account. Please click on the button below </p>
                           <a href="http://localhost:5021/api/v2/auth/verify-account/${verifyAccounToken}">Reset</a> 
                        `;
      const options = { email, subject: 'Welcome Email', html: htmlMessage };
      const emailToSend: SendMailOptions = this.handleEmailObject(options);
      this.mailService.sendMail(emailToSend);
      await this.cacheService.set(newUser?.id, refreshToken);
      return { success: true, accessToken, refreshToken, profile: { username, email, role } };
    } catch (err) {
      this.logger.error(`Error caught while registering user`, { service: 'authService' }, { err });
      throw new HttpException(errorMessages().usernameMustBeUnique);
    }
  }

  /**
   * @function login - Method used to login and authenticate user
   * @param {LoginDto} body
   */
  public async login(body: LoginInterface): Promise<Login> {
    const { email, password } = body;
    // check if user already exists
    const user = await this.authRepository.findOne({ email }, { username: true, email: true, role: true, id: true });
    // // if exists return exception
    if (!user) {
      const error = new HttpException(errorMessages().userNotFound);
      this.logger.error(`User with email: ${body.email} is already registered`, { service: 'AuthService' }, { err: error });
      throw error;
    }
    const userId = user?.id.toString();
    const credential = await this.authRepository.getPassword(userId);
    const passwordMatch = await compare(password, credential);
    if (!passwordMatch) {
      const error = new HttpException(errorMessages().wrongPassword);
      this.logger.error(`Wrong password`, { service: 'AuthService' }, { err: error });
      throw error;
    }
    const payload: JwtSignOptions = { issuer: 'nest-app.com', subject: userId };
    const { accessToken, refreshToken } = this.authService.generateJwtToken(payload);
    return {
      success: true,
      accessToken,
      refreshToken,
      profile: { username: user?.username.toString(), email: user?.email.toString(), role: user?.role.toString() },
    };
  }

  /**
   * @function forgotPassword - Method used to send mail to users who want to reset their password
   * @param {ForgotPasswordDto} body
   */
  public async forgotPassword(body: ForgotPasswordInterface): Promise<ForgotPassword> {
    const { email } = body;
    const user = await this.authRepository.findOne({ email }, { email: true, username: true, id: true });
    if (!user) {
      const error = new HttpException(errorMessages().userNotFound);
      this.logger.error(`Email does not exist`, { service: 'AuthService' }, { err: error });
      throw error;
    }
    const userId = user?.id.toString();
    const payload = { issuer: 'nest-app.com', subject: userId };
    const resetPasswordToken = this.authService.generateResetPasswodToken(payload);
    await this.authRepository.update({ id: userId }, { resetPasswordToken });
    const htmlMessage = `<h2>Hello ${user?.username}! </h2>
                         <p> Find your reset password link available below </p>
                         <br/>
                         <a href="http://localhost:5021/api/v2/auth/reset-password/${resetPasswordToken}">Reset</a> 
                        `;
    const options = { email, subject: 'Forgot Password Link', html: htmlMessage };
    const emailToSend: SendMailOptions = this.handleEmailObject(options);
    this.mailService.sendMail(emailToSend);
    return { success: true };
  }

  /**
   * @function handleEmailObject - Helper method that return object to be sent to user
   * @param {HandleEmailOpions} options
   */
  private handleEmailObject(options: HandleEmailOpions): SendMailOptions {
    const { email, subject, html } = options;
    return { from: this.configService.get<string>('nodemailer.user'), to: email, subject, html };
  }

  /**
   *@function resetPassword - Method used to reset password
   * @returns
   */
  public async resetPassword(param: Token, body: ResetPasswordInterface): Promise<ResetPassword> {
    const { token } = param;
    const data = this.authService.decodeJwt(token);
    const id: string = data['subject'];
    const user = await this.authRepository.findOne({ id }, { username: true, id: true });
    if (!user) {
      const error = new HttpException(errorMessages().userNotFound);
      this.logger.error(`invalid token: ${token}`, { service: 'AuthService', method: 'resetPassword' }, { err: error });
      throw error;
    }
    const { password } = body;
    const hashedPassword = await this.authService.hashPassword(password);
    await this.authRepository.updatePassword(id, hashedPassword);
    return { success: true };
  }

  /**
   * @function refreshToken - Method used to return new pair of tokens to clients
   * @returns
   */
  public refreshToken(body: RefreshTokenInterface): RefreshToken {
    const token = body?.refreshToken;
    try {
      this.authService.verifyJwt(token, 'jwt.refreshToken');
    } catch (err) {
      throw new HttpException({
        status: 401,
        errorCode: 'unauthorized',
        errorMessage: {
          en: 'Unable to verify credentials',
          ar: 'غير قادر على التحقق من بيانات الاعتماد',
          fr: "Impossible de vérifier les informations d'identification",
        },
      });
    }
    const decodedToken = this.authService.decodeJwt(token);
    const id = decodedToken['subject'];
    const payload = { issuer: 'nest-app.com', subject: id };
    return this.authService.generateJwtToken(payload);
  }

  /**
   * @function verifyAccount - Method used to verify jwt tokens for resetting passwordF
   * @returns
   */
  public async verifyAccount(param: Token): Promise<verifyAccount> {
    const { token } = param;
    const data = this.authService.decodeJwt(token);
    const id = data['subject'];
    await this.authRepository.update({ id }, { verified: true, emailToken: '' });
    return { success: true };
  }

  /**
   * @function userExists - Method used to check if user exists
   * @returns
   */
  public async userExists(id: string): Promise<boolean> {
    const user = await this.authRepository.findOne({ id });
    return !!user;
  }

  /**
   * @function logout - Method used to logout user
   * @param {LogoutDto} body
   */
  public async logout(body: LogoutInterface): Promise<Logout> {
    const { refreshToken } = body;
    try {
      this.authService.verifyJwt(refreshToken, 'jwt.refreshToken');
    } catch (err) {
      throw new HttpException({
        status: 401,
        errorCode: 'unauthorized',
        errorMessage: {
          en: 'Unable to verify credentials',
          ar: 'غير قادر على التحقق من بيانات الاعتماد',
          fr: "Impossible de vérifier les informations d'identification",
        },
      });
    }
    const decodedToken = this.authService.decodeJwt(refreshToken);
    const id = decodedToken['subject'];
    await this.cacheService.del(id);
    return { success: true };
  }
}
