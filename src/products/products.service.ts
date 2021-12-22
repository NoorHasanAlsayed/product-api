import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/users.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>,
  private usersService:UsersService) {}
  async create(createProductDto: CreateProductDto):Promise<Product> {
    return new this.productModel(createProductDto).save();
  }

  async findAll():Promise<Product[]> {
    return this.productModel.find();
  }

  findOne(id: number) {
    return this.productModel.findOne({_id:id});
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productModel.findOneAndUpdate({_id:id},{$set:{...updateProductDto}});
  }

  remove(id: number) {
    return this.productModel.findOneAndRemove({_id:id});
  }
  async buyProduct( productId:string,quantity:Number ,userId:string){
    return await this.usersService.purchaseProduct(userId,{"productId":productId,"quantity":quantity});
    
    
  }
}
