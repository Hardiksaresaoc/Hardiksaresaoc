import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repo/user.repository';
import { Fundraiser } from './entities/fundraiser.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Fundraiser])],
  controllers: [UserController],
  providers: [UserService,UserRepository],
  exports:[UserService]
})
export class UserModule {}
