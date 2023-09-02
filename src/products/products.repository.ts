import { Injectable } from '@nestjs/common';
import { Logger } from '../global/logger/logger';
import { PrismaService } from '../lib/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { CreateProduct, PrismaUpdateProduct, ProductCategoryEntity, ProductEntity } from './products.interfaces';
import { Repository } from '../global/global.classes';
import { ProductCategoryData, ProductOrderByOptions } from './products.types';

@Injectable()
export class ProductRepository extends Repository {
  public constructor(private readonly prismaService: PrismaService, private readonly logger: Logger) {
    super();
  }

  /**
   * @function findOne - Method that returns single row
   * @param {Prisma.ProductWhereUniqueInput} whereOptions
   * @param {Prisma.ProductSelect<DefaultArgs>} selectOptions
   */
  //TODO: update and fix return type of get
  public async findOne(whereOptions: Prisma.ProductWhereUniqueInput, selectOptions?: Prisma.ProductSelect<DefaultArgs>) {
    return await this.prismaService.product.findUnique({ where: whereOptions, select: selectOptions });
  }

  /**F
   * @function create - Method Fto create a single document
   * @param {CreateProduct} data
   */
  //TODO: change parameters and return  types
  public async create(data: any): Promise<ProductEntity> {
    return this.prismaService.product.create({ data });
  }

  /**
   * @function update - Method responsible for editing document
   * @param {Prisma.ProductWhereUniqueInput} whereOptions
   * @param {PrismaUpdateProduct} data
   */
  public async update(whereOptions: Prisma.ProductWhereUniqueInput, data: PrismaUpdateProduct): Promise<ProductEntity> {
    return await this.prismaService.product.update({ where: whereOptions, data });
  }

  /**
   * @function findMany - Method to return a large list of data
   * @param {Prisma.ProductWhereUniqueInput} whereOptions
   */
  public async findMany(
    whereOptions: Prisma.ProductWhereUniqueInput,
    orderByOptions: ProductOrderByOptions,
    skip: number,
    take: number,
  ): Promise<ProductEntity[]> {
    return await this.prismaService.product.findMany({ where: whereOptions, orderBy: orderByOptions, skip, take });
  }

  /**
   * @function delete - Remove single row
   * @param {Prisma.ProductWhereUniqueInput} whereOptions
   */
  public async delete(whereOptions: Prisma.ProductWhereUniqueInput): Promise<ProductEntity> {
    return await this.prismaService.product.delete({ where: whereOptions });
  }

  /**
   * @function createJunctionTable - Helper method used to create the junction document for the ctageory and product tables
   * @param {ProductCategoryData} data
   */
  public async createJunctionTable(data: ProductCategoryData): Promise<ProductCategoryEntity> {
    return await this.prismaService.productCategory.create({ data });
  }

  /**
   * @function deleteMany - Remove single row
   * @param {Prisma.ProductWhereUniqueInput} whereOptions
   */
  public async deleteMany(whereOptions: Prisma.ProductWhereUniqueInput): Promise<Prisma.BatchPayload> {
    return await this.prismaService.product.deleteMany({ where: whereOptions });
  }
}
