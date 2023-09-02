import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { CategoryData, CategoryDataList, CategoryEntity, PrismaUpdateCategory } from '../categories/categories.interfaces';
import { PrismaUpdateProduct, CreateProduct, ProductEntity, ProductData, ProductDataList, ProductInterface } from '../products/products.interfaces';
import { CategoryOrderByOptions, CreateCategory, UpdateCategory } from '../categories/categories.types';

/**
 * @type ObjectValue - Default value type used to generalize the lower level types
 */
export type ObjectValue = number | boolean | string | object;

/**
 * @type PrismaEntity - General Prisma type used in the abstract classes to generalize the reponse type of methods
 */
export type PrismaEntity = CategoryEntity | ProductEntity;

/**
 * @type PrismaDataUpdateOptions - General type for arguments that will be used in update methods in repository classes
 */
export type PrismaDataUpdateOptions = PrismaUpdateCategory | PrismaUpdateProduct;

/**
 * @type WhereOptions - Options used to query in the find unique prisma method
 */
export type WhereOptions = Prisma.CategoryWhereUniqueInput | Prisma.UserWhereUniqueInput | Prisma.ProductWhereUniqueInput;

/**
 * @type SelectOptions - General options that can be used in selecting and projecting fields
 */
export type SelectOptions = Prisma.CategorySelect<DefaultArgs> | Prisma.UserSelect<DefaultArgs> | Prisma.ProductSelect<DefaultArgs>;

/**
 * @type DataOptions - Options to be passed in arguments to create an entity
 */
export type DataOptions = PrismaEntity | CreateProduct;

/**
 * @type OrderByOptions - Options to be used for sorting in the repository classes
 */
export type OrderByOptions = CategoryOrderByOptions;

/**
 * @type EntityData - Used as return type when returning a single document in service classes
 */
export type EntityData = CategoryData | ProductData;

/**
 * @type EntityDataList - Used as return type when returning a list of documents in service classes
 */
export type EntityDataList = CategoryDataList | ProductDataList;

/**
 * @type UpdateEntityData - Used as type service classes when upating data
 */
export type UpdateEntityData = UpdateCategory | PrismaUpdateProduct;

/**
 * @type CreateEntityData - Used as type in create method ins service classes
 */
export type CreateEntityData = CreateCategory | ProductInterface;
