import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Get, UseInterceptors, Delete, Param, Query, Patch, UseGuards } from '@nestjs/common';
import { CategoryDto } from './categories.dto';
import { CategoryService } from './categories.service';
import { Role } from '../config/enums';
import { Roles } from '../global/global.decorator';
import { RoleGuard } from '../global/guards/roles.guard';
import { GlobalInterceptor } from '../global/global.interceptor';
import { Query as QueryType } from '../global/global.interfaces';
import { LoggerInterceptor } from '../global/logger/logger.interceptor';
import { PaginationInterceptor } from '../global/interceptors/pagination.interceptor';
import { CategoryRoute } from '../config/enums.routes';

@ApiTags('Category')
@Controller('categories')
@UseInterceptors(GlobalInterceptor, LoggerInterceptor)
export class CategoryController {
  public constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  create(@Body() body: CategoryDto) {
    return this.categoryService.create({ body });
  }

  @Get()
  @UseInterceptors(PaginationInterceptor)
  findMany(@Query() query?: QueryType) {
    return this.categoryService.findMany({ query });
  }

  @Patch(CategoryRoute.UPDATE)
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  update(@Param('id') id: string, @Body() body: CategoryDto) {
    return this.categoryService.update({ id, body });
  }

  @Get(CategoryRoute.FIND_BY_ID)
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne({ id });
  }

  @Delete(CategoryRoute.DELETE)
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
