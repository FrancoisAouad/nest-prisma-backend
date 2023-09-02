import { randomBytes } from 'crypto';
import { Cache } from 'cache-manager';
import { genSalt, hashSync } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { JwtTokens } from './auth.interface';
import config from '../config/config';
import { Logger } from '../global/logger/logger';
import { CustomObject } from '../global/global.interfaces';

@Injectable()
export class AuthService {
  public constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    private readonly jwtService: JwtService,
  ) {}
  //TODO: create a single function that creates the jwt tokens, and pass the enum value for the jwt type instead of many similar methods
  /**
   * @function hashPassword - Function hashes a given string
   * @param {string} password
   */
  public async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hashSync(password, salt);
  }

  /**
   * @function generateToken - Function that return a token
   */
  public async generateToken(): Promise<string> {
    return randomBytes(64).toString('hex');
  }

  /**
   * @function generateJwtToken - Function that return the jwt tokens
   * @param {JwtSignOptions} payload
   */
  public generateJwtToken(payload: JwtSignOptions): JwtTokens {
    const accessTokenPayload: JwtSignOptions = { ...payload, expiresIn: '15m' };
    const refreshTokenPayload: JwtSignOptions = { ...payload, expiresIn: '1h' };
    try {
      const accessToken = this.jwtService.sign(accessTokenPayload, { secret: this.configService.get<string>('jwt.accessToken') });
      const refreshToken = this.jwtService.sign(refreshTokenPayload, { secret: this.configService.get<string>('jwt.refreshToken') });
      return { accessToken, refreshToken };
    } catch (err) {
      this.logger.error('Error while signing jwt token', { service: 'Common-utils' }, { err });
      throw err;
    }
  }

  /**
   * @function generateResetPasswodToken - Generates reset password token
   * @param {JwtSignOptions} payload
   */
  public generateResetPasswodToken(payload: JwtSignOptions): string {
    const resetPasswordPayload: JwtSignOptions = { ...payload, expiresIn: '10m' };
    try {
      return this.jwtService.sign(resetPasswordPayload, { secret: this.configService.get<string>('jwt.accessToken') });
    } catch (err) {
      this.logger.error('failed to generate reset password token', { service: 'Common-utils' }, { err });
      throw err;
    }
  }

  /**
   * @function genVerifyAccountToken - Generates verifiy token password
   * @param {JwtSignOptions} payload
   */
  public genVerifyAccountToken(payload: JwtSignOptions): string {
    const verifyToken: JwtSignOptions = { ...payload, expiresIn: '1y' };
    return this.jwtService.sign(verifyToken, { secret: config().jwt.resetPasswordToken });
  }

  /**
   * @function decodeJwt - Decoded content of jwt token
   * @param {string} jwtToken
   */
  public decodeJwt(jwtToken: string): string | CustomObject {
    return this.jwtService.decode(jwtToken);
  }

  /**
   * @function verifyJwt - Verifies signature of jwt token
   * @param {string} jwtToken
   * @param {string} secret
   */
  public verifyJwt(jwtToken: string, secret: string): object {
    try {
      return this.jwtService.verify(jwtToken, { secret: this.configService.get<string>(secret) });
    } catch (err) {
      this.logger.error(`Failed to verify jwt token: ${jwtToken}`, { service: 'Common-Utils' }, { err });
      throw err;
    }
  }
}
