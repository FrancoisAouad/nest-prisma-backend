import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class SearchDto {
  @IsString()
  @IsOptional()
  search?: string;
}

export class ImageDto {
  @IsNotEmpty({ message: 'Image data is required' })
  @IsString()
  data: string;

  @IsNotEmpty({ message: 'Image extension is required' })
  @IsString()
  ext: string;
}

export class LocalizedString {
  en: string;
  ar: string;
  fr: string;
}
