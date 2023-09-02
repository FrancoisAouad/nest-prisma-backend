import { IsString } from 'class-validator';
import { CategoryEntity } from './categories.interfaces';

export class CategoryDto implements CategoryEntity {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
