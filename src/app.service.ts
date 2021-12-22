import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection){}

  getConnection() {
    return this.connection;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
