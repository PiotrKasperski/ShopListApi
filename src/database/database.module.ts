import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Item from 'src/items/entities/item.entity';
import ShopList from 'src/shop-lists/entities/shop-list.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          entities: [
            ShopList, Item, User
          ],
          synchronize: true,
        })
      }),
    ],
  })
export class DatabaseModule {}
