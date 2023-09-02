import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ProductInterface } from './products.interfaces';

export class ProductDto implements ProductInterface {
  @IsString()
  @MaxLength(30)
  name: string;

  @IsString()
  price: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  description: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  category: string;

  @IsString()
  weight: string;

  @IsString()
  currency: string;
}
