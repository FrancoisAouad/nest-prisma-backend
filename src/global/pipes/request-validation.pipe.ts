import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  public transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
