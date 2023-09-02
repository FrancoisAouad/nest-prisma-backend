import { Prisma } from '@prisma/client';
import { PrismaGeneralOptions } from '../global/global.interfaces';
import { ProductOrderByOptions } from './products.types';

/**
 * @interface ProductServiceArgs - Product that should be used in param and inherited by dto when passing args to service class
 */

//TODO: check again if thhere is a need to  use this instead of the entity for service classes
export interface ProductServiceArgs {
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

export interface ProductInterface {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  currency: any;
  weight: any;
}

/**
 * @interface ProductEntity - Entity that will implemented in main dto class
 */
export interface ProductEntity {
  id: string;
  userId: string;
  description: string;
  name: string;
  price: string;
  image: string;
  productCategoryId: string;
}

export interface CreateProduct {
  name: string;
  image: string;
  price: string;
  userId: string;
  currency: any;
  description: string;
}

/**
 * @interface PrismaUpdateProduct - Used when editing document
 */
export interface PrismaUpdateProduct {
  id?: string;
  userId?: string;
  description?: string;
  name?: string;
  price?: string;
  image?: string;
  productCategoryId?: string;
}

/**
 * @interface ProductDataList - Used when returning list of data
 */
export interface ProductDataList {
  data: ProductEntity[];
}

/**
 * @interface ProductData - Used when getting data
 */
export interface ProductData {
  data: ProductEntity;
}

/**
 * @interface ProductOptions - Product options for when passing args to findmany method
 */
export interface ProductOptions extends PrismaGeneralOptions {
  where: Prisma.ProductWhereUniqueInput;
}

export interface ProductCategoryEntity {
  id?: string;
  productId: string;
  categoryId: string;
}

export interface ProductOptions extends PrismaGeneralOptions {
  where: Prisma.ProductWhereUniqueInput;
  orderBy: ProductOrderByOptions;
}
