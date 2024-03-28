import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.entity';
import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create({ username, password }: CreateUserDTO): Promise<User> {
    const user = new this.userModel({ username, password });
    return user.save();
  }

  async findByUsername(username: User['username']): Promise<User | null> {
    return this.userModel.findOne({ username });
  }
}
