import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/productcms'),
  UsersModule,
  ProductsModule,
  AuthModule,
  CommonModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
