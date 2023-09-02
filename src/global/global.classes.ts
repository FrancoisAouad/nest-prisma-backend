import { Prisma } from '@prisma/client';
import {
  PrismaDataUpdateOptions,
  OrderByOptions,
  EntityDataList,
  UpdateEntityData,
  CreateEntityData,
  DataOptions,
  WhereOptions,
  SelectOptions,
  PrismaEntity,
  EntityData,
} from './global.types';
import { PrismaUpdateCategory } from '../categories/categories.interfaces';
import { FindManyArgs, FindOneArgs } from '../categories/categories.types';

/**
 * @class Repository - Abstract class used to generalize behavious between all repository classes
 */
export abstract class Repository {
  abstract create(data: DataOptions): Promise<PrismaEntity>;
  abstract findOne(whereOptions: WhereOptions, selectOptions?: SelectOptions): Promise<PrismaEntity>;
  abstract update(whereOptions: WhereOptions, data: PrismaDataUpdateOptions): Promise<PrismaEntity>;
  abstract delete(whereOptions: WhereOptions): Promise<PrismaEntity>;
  abstract findMany(whereOptions: WhereOptions, orderByOptions: OrderByOptions, skip: number, take: number): Promise<PrismaEntity[]>;
  abstract deleteMany(whereOptions: WhereOptions): Promise<Prisma.BatchPayload>;
}

/**
 * @class Service - Abstract class used to generalize behavious between all service classes
 */
export abstract class Service {
  abstract create(createArgs: CreateEntityData): Promise<PrismaEntity>;
  abstract findOne(findOneArgs: FindOneArgs): Promise<EntityData>;
  abstract update(updateArgs: UpdateEntityData): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findMany(findManyArgs: FindManyArgs): Promise<EntityDataList>;
  abstract deleteMany(whereOptions: WhereOptions): Promise<void>;
}

/**
 * @class Controller - Abstract class used to generalize behavious between all controller classes
 */
export abstract class Controller {
  abstract findOne(whereOptions: WhereOptions, selectOptions?: SelectOptions): Promise<PrismaEntity>;
  abstract update(whereOptions: WhereOptions, data: PrismaUpdateCategory): Promise<PrismaEntity>;
  abstract delete(whereOptions: WhereOptions): Promise<PrismaEntity>;
  abstract findMany(whereOptions: WhereOptions): Promise<PrismaEntity[]>;
  abstract deleteMany(whereOptions: WhereOptions): Promise<PrismaEntity>;
}
