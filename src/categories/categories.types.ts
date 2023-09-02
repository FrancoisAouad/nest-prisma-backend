import { Prisma } from '@prisma/client';
import { CategoryEntity, PrismaUpdateCategory } from './categories.interfaces';
import { Query } from '../global/global.interfaces';

export type CategoryOrderByOptions = Prisma.CategoryOrderByWithRelationInput | Prisma.CategoryOrderByWithRelationInput[];

export type CreateCategory = {
  body: CategoryEntity;
};

export type UpdateCategory = {
  id: string;
  body: PrismaUpdateCategory;
};

export type FindOneArgs = {
  id: string;
};

export type FindManyArgs = {
  query?: Query;
};
