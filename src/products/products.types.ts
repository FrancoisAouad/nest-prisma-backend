import { ProductCategoryEntity } from './products.interfaces';
import { Prisma } from '@prisma/client';

export type Product = {
  name: string;
  price: string;
  description: string;
  image: string;
};
export type ProductOrderByOptions = Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
export type ProductCategoryData = ProductCategoryEntity;
