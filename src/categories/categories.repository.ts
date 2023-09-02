import { Injectable } from '@nestjs/common';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';
import { CategoryOrderByOptions } from './categories.types';
import { CategoryEntity, PrismaUpdateCategory } from './categories.interfaces';
import { Logger } from '../global/logger/logger';
import { Repository } from '../global/global.classes';
import { PrismaService } from '../lib/prisma/prisma.service';

@Injectable()
export class CategoryRepository extends Repository {
  public constructor(private readonly prismaService: PrismaService, private readonly logger: Logger) {
    super();
  }

  /**
   * @function findOne - Method that returns single row
   * @param {Prisma.CategoryWhereUniqueInput} whereOptions
   * @param {Prisma.CategorySelect<DefaultArgs>} selectOptions
   */
  public async findOne(whereOptions: Prisma.CategoryWhereUniqueInput, selectOptions?: Prisma.CategorySelect<DefaultArgs>): Promise<CategoryEntity> {
    return await this.prismaService.category.findUnique({ where: whereOptions, select: selectOptions });
  }

  /**
   * @function create - Method to create a single document
   * @param {CategoryEntity} data
   */
  public async create(data: CategoryEntity): Promise<CategoryEntity> {
    return await this.prismaService.category.create({ data });
  }

  /**
   * @function update - Method responsible for editing document
   * @param {Prisma.CategoryWhereUniqueInput} whereOptions
   * @param {PrismaUpdateCategory} data
   */
  public async update(whereOptions: Prisma.CategoryWhereUniqueInput, data: PrismaUpdateCategory): Promise<CategoryEntity> {
    return await this.prismaService.category.update({ where: whereOptions, data });
  }

  /**
   * @function findMany - Method to return a large list of data
   * @param {Prisma.CategoryWhereUniqueInput} whereOptions
   */
  public async findMany(
    whereOptions: Prisma.CategoryWhereUniqueInput,
    orderByOptions: CategoryOrderByOptions,
    skip: number,
    take: number,
  ): Promise<CategoryEntity[]> {
    return await this.prismaService.category.findMany({ where: whereOptions, orderBy: orderByOptions, skip, take });
  }

  /**
   * @function delete - Remove single row
   * @param {Prisma.CategoryWhereUniqueInput} whereOptions
   */
  public async delete(whereOptions: Prisma.CategoryWhereUniqueInput): Promise<CategoryEntity> {
    return await this.prismaService.category.delete({ where: whereOptions });
  }

  /**
   * @function deleteMany - Remove single row
   * @param {Prisma.CategoryWhereUniqueInput} whereOptions
   */
  public async deleteMany(whereOptions: Prisma.CategoryWhereUniqueInput): Promise<Prisma.BatchPayload> {
    return await this.prismaService.category.deleteMany({ where: whereOptions });
  }
}
