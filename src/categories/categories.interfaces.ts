import { Prisma } from '@prisma/client';
import { PrismaGeneralOptions } from '../global/global.interfaces';
import { CategoryOrderByOptions } from './categories.types';
//TODO: remove unecessary try catch block

/**
 * @interface CategoryServiceArgs - Category that should be used in param and inherited by dto when passing args to service class
 */
//TODO: check again if thhere is a need to  use this instead of the entity for service classes
export interface CategoryServiceArgs {
  name: string;
  description?: string;
}

/**
 * @interface CategoryEntity - Entity that will implemented in main dto class
 */
export interface CategoryEntity {
  name: string;
  description: string;
}

/**
 * @interface PrismaUpdateCategory - Used when editing document
 */
export interface PrismaUpdateCategory {
  name?: string;
  description?: string;
}

/**
 * @interface CategoryDataList - Used when returning list of data
 */
export interface CategoryDataList {
  data: CategoryEntity[];
}

/**
 * @interface CategoryData - Used when getting data
 */
export interface CategoryData {
  data: CategoryEntity;
}

/**
 * @interface CategoryOptions - Category options for when passing args to findmany method
 */
export interface CategoryOptions extends PrismaGeneralOptions {
  where: Prisma.CategoryWhereUniqueInput;
  orderBy: CategoryOrderByOptions;
}
