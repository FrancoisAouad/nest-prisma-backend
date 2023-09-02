import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaUpdateUser, Register, Credentials, User } from './auth.interface';
import { Logger } from '../global/logger/logger';
import { PrismaService } from '../lib/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  public constructor(private readonly prismaService: PrismaService, private readonly logger: Logger) {}

  /**
   * @function findOne - Method used to get a single row
   * @param {Prisma.UserWhereUniqueInput} whereOptions
   * @param {Prisma.UserSelect<DefaultArgs>} selectOptions
   */
  async findOne(whereOptions: Prisma.UserWhereUniqueInput, selectOptions?: Prisma.UserSelect<DefaultArgs>): Promise<User> {
    try {
      return await this.prismaService.user.findUnique({ where: whereOptions, select: selectOptions });
    } catch (err) {
      this.logger.error(`Failed to query db for user`, { repository: 'AuthRepository' }, { err });
    }
  }

  /**
   * @function create - Mehtod used to create a single new record
   * @param {Register} data
   */
  async create(data: Register): Promise<User> {
    try {
      return this.prismaService.user.create({ data });
    } catch (err) {
      this.logger.error(`Failed to create user. username already exists`, { repository: 'AuthRepository' }, { err });
      throw err;
    }
  }

  /**
   * @function update - Function that updates user data
   * @param {Prisma.UserWhereUniqueInput} whereOptions
   * @param {Register} data
   */
  async update(whereOptions: Prisma.UserWhereUniqueInput, data: PrismaUpdateUser): Promise<User> {
    try {
      return await this.prismaService.user.update({ where: whereOptions, data });
    } catch (err) {
      this.logger.error(`Failed to create user. username already exists`, { repository: 'AuthRepository' }, { err });
      throw err;
    }
  }

  /**
   * @function findMany - Method to return a large list of data
   */
  async findMany(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  /**
   * @function handleCredentials - Method to update user credentials
   * @param {Credentials} data
   */
  public async handleCredentials(data: Credentials): Promise<void> {
    try {
      await this.prismaService.credential.create({ data });
    } catch (err) {
      this.logger.error('Error in handling creds', { repository: 'AuthRepository' }, { err });
      throw err;
    }
  }

  /**
   * @function getPassword - Getter to get user password from credentials table
   * @param {string} userId
   */
  public async getPassword(userId: string): Promise<string> {
    const { password } = await this.prismaService.credential.findUnique({ where: { userId }, select: { password: true } });
    return password;
  }

  /**
   * @function updatePassword - Function to update user password
   * @param {string} userId
   * @param {string} updatedPassword
   */
  public async updatePassword(userId: string, updatedPassword: string): Promise<void> {
    await this.update({ id: userId }, { password: updatedPassword });
  }
}
