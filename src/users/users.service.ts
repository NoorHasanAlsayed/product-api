import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}


  async create(createUserDto: CreateUserDto):Promise<User> {
    return new this.userModel(createUserDto).save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({email});
  }
  findOne(_id: string) {
    return this.userModel.findOne({_id});
  }

  async update(id: string, updateUserDto: UpdateUserDto):Promise<User> {
    return this.userModel.findOneAndUpdate({_id:id},{$set:{...updateUserDto}});
  }

 async purchaseProduct (id:string, purchase:{productId:string, quantity:Number}) {
   return this.userModel.findByIdAndUpdate({_id:id},{$push:{purchased_products:purchase}});

 }

 async getPurchasedProduct(id:string){
  const user = await this.userModel.findOne({_id:id});
  return user.purchased_products;
 }
  async remove(id: string) {
    return this.userModel.findOneAndDelete({_id:id});
  }
}
