import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import errorMessages from './products.errorMessages';
import { ProductRepository } from './products.repository';
import { PrismaUpdateProduct, ProductData, ProductDataList, ProductInterface, ProductOptions } from './products.interfaces';
import { Logger } from '../global/logger/logger';
import { Query, Success } from '../global/global.interfaces';
import { HttpException } from '../global/exceptions/exception';
import { handleAggregationOptions } from '../utils/common-utils';

@Injectable()
export class ProductService {
  constructor(
    private readonly logger: Logger,
    private readonly productRepository: ProductRepository,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}
  //TODO: refactor dtos to use interfaces instead of classes
  public async create(body: ProductInterface, userId: string): Promise<Success> {
    body.image = body.image ? body.image : 'http://firebase/default.png';
    const { image, name, price, category, description, currency, weight } = body;
    const objToSet = { name: name.trim(), image, price, userId, description, currency, weight };
    try {
      const product = await this.productRepository.create(objToSet);
      const productId = product?.id;
      const junction = await this.productRepository.createJunctionTable({ productId, categoryId: category });
      const productCategoryId = junction?.id;
      await this.productRepository.update({ id: productId }, { productCategoryId });
      return { success: true };
    } catch (err) {
      this.logger.error(`Error caught`, { service: 'ProductService' }, { err });
      throw new HttpException(errorMessages().productAlreadyExists);
    }
  }

  public async update(id: string, body: PrismaUpdateProduct): Promise<Success> {
    body.image = body.image ? body.image : 'http://firebase/default.png';
    const { image, name, price } = body;
    const objToSet = { name: name.trim(), image, price };
    try {
      await this.productRepository.update({ id }, objToSet);
      return { success: true };
    } catch (err) {
      this.logger.error(`Error caught`, { service: 'ProductService' }, { err });
      throw new HttpException(errorMessages().productAlreadyExists);
    }
  }

  public async findOne(id: string): Promise<ProductData> {
    try {
      const data = await this.productRepository.findOne({ id }, { name: true });
      return { data };
    } catch (err) {
      this.logger.error(`Error caught`, { service: 'ProductService' }, { err });
      throw new HttpException(errorMessages().productNotFound);
    }
  }

  public async delete(id: string): Promise<Success> {
    try {
      await this.productRepository.delete({ id });
      return { success: true };
    } catch (err) {
      this.logger.error(`Error caught`, { service: 'ProductService' }, { err });
      throw new HttpException(errorMessages().productNotFound);
    }
  }

  public async findMany(query: Query): Promise<ProductDataList> {
    const options: ProductOptions = handleAggregationOptions(query);
    const { orderBy, skip, take, where } = options;
    let data = await this.productRepository.findMany(where, orderBy, skip, take);
    data = data?.length > 0 ? data : [];
    return { data };
  }
}
