import { Controller, Get, Post, Body, Put, Param, Delete, Query, Logger, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { query } from 'express';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
@UseGuards(JwtAuthenticationGuard)
@Controller('items')
export class ItemsController {
  private readonly logger = new Logger(ItemsController.name);
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    this.logger.log('create item ins shop list: '+ createItemDto.shopListID)
    return this.itemsService.create(createItemDto);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get('findByShopID')
  findByShopID(@Query() query){

    return this.itemsService.findByShoplistID(query.id);

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
