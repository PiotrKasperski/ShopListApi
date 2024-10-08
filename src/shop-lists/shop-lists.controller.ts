import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { Controller, Get, Post, Body, Put, Param, Delete, Logger, UseGuards, Req } from '@nestjs/common';
import { ShopListsService } from './shop-lists.service';
import { CreateShopListDto } from './dto/create-shop-list.dto';
import { UpdateShopListDto } from './dto/update-shop-list.dto';
import { RequestWithUser } from 'src/authentication/interfaces/request-with-user.interface';
@UseGuards(JwtAuthenticationGuard)
@Controller('shop-lists')
export class ShopListsController {
  private readonly logger = new Logger(ShopListsService.name);
  constructor(private readonly shopListsService: ShopListsService) {
  }

  @Post()
  create(@Body() createShopListDto: CreateShopListDto) {
    this.logger.log('post /shop-lists')
   
    return this.shopListsService.create(createShopListDto);
  }
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll(@Req() request: RequestWithUser) {
    this.shopListsService.findAll()
    return this.shopListsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopListsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateShopListDto: UpdateShopListDto) {
    return this.shopListsService.update(+id, updateShopListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopListsService.remove(+id);
  }
}
