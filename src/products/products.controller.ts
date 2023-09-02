import { Controller, Post, Body, Get, UseInterceptors, Delete, Param, Patch, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductDto } from './products.dto';
import { GlobalInterceptor } from '../global/global.interceptor';
import { ProductService } from './products.service';
import { Query as QueryType } from '../global/global.interfaces';
import { ReqData } from '../global/global.decorator';
import { LoggerInterceptor } from '../global/logger/logger.interceptor';

@ApiTags('Product')
@Controller('products')
@UseInterceptors(GlobalInterceptor, LoggerInterceptor)
export class ProductController {
  public constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() body: ProductDto, @ReqData('user') user: any) {
    return this.productService.create(body, user?.id);
  }

  @Get()
  //TODO: @UsePipes() use pipe to lowercase all query values and transform other type of data
  findMany(@Query() query: QueryType) {
    return this.productService.findMany(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: ProductDto) {
    return this.productService.update(id, body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
