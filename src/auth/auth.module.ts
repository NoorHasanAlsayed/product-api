import { CommonModule } from './../common/common.module';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';



@Module({
  imports: [
   CommonModule,
   UsersModule,
 
 ],
  controllers: [AuthController]
})
export class AuthModule {}
