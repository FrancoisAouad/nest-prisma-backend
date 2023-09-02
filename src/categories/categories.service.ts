import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import errorMessages from './categories.errorMessages';
import { CategoryRepository } from './categories.repository';
import { CreateCategory, FindManyArgs, FindOneArgs, UpdateCategory } from './categories.types';
import { CategoryEntity, CategoryData, CategoryDataList, CategoryOptions } from './categories.interfaces';
import { Logger } from '../global/logger/logger';
import { Service } from '../global/global.classes';
import { WhereOptions } from '../global/global.types';
import { HttpException } from '../global/exceptions/exception';
import { handleAggregationOptions } from '../utils/common-utils';

@Injectable()
export class CategoryService extends Service {
  public constructor(
    private readonly logger: Logger,
    private readonly categoryRepository: CategoryRepository,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {
    super();
  }

  /**
   * @function create - Function that creates a category
   * @param {CategoryEntity} body
   */
  public async create(createArgs: CreateCategory): Promise<CategoryEntity> {
    const { body } = createArgs;
    return await this.categoryRepository.create(body);
  }

  /**
   * @function update - Function that updates a category
   * @param {string} id
   * @param {CategoryEntity} body
   */
  public async update(updateArgs: UpdateCategory): Promise<void> {
    const { body, id } = updateArgs;
    try {
      await this.categoryRepository.update({ id }, body);
    } catch (err) {
      this.logger.error(`Error caught`, { service: 'CategoryService' }, { err });
      throw new HttpException(errorMessages().categoryAlready);
    }
  }

  /**
   * @function findOne - Function that returns a single row
   * @param {string} id
   */
  public async findOne(findOneArgs: FindOneArgs): Promise<CategoryData> {
    const { id } = findOneArgs;
    const data = await this.categoryRepository.findOne({ id }, { id: true, name: true, description: true });
    if (data && Object.keys(data)?.length > 0) {
      return { data };
    }
    throw new HttpException(errorMessages().categoryNotFound);
  }

  /**
   * @function findMany - Function that returns list of categories
   * @param {Query} query
   */
  public async findMany(findManyArgs: FindManyArgs): Promise<CategoryDataList> {
    const { query } = findManyArgs;
    //TODO: update type in handle method to generalize all interface
    const options: CategoryOptions = handleAggregationOptions(query);
    const { orderBy, skip, take, where } = options;
    let data = await this.categoryRepository.findMany(where, orderBy, skip, take);
    data = data?.length > 0 ? data : [];
    return { data };
  }

  /**
   * @function delete - Function deletes row
   * @param {string} id
   */
  public async delete(id: string): Promise<void> {
    await this.categoryRepository.delete({ id });
  }

  public async deleteMany(whereOptions: WhereOptions): Promise<void> {
    throw new Error('Method not implemented.' + whereOptions);
  }

  public async getCategoryIdByName(name: string) {
    try {
      return name;
      // const data = await this.categoryRepository.findOne({ name: { contains: name } }, { id: true });
      // return data?.id.;
    } catch (err) {
      this.logger.error(`Error caught`, { service: 'CategoryService' }, { err });
      throw new HttpException(errorMessages().categoryNotFound);
    }
  }
}
