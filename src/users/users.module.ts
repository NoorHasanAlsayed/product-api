import { CommonModule } from './../common/common.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';


@Module({
  imports:[MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  CommonModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
