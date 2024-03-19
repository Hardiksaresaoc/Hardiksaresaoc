import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repo/user.repository';
import { User } from './entities/user.entity';
import { Constants } from 'src/utils/constants';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';
import { FundRaiserRepository } from '../fundraiser/repo/fundraiser.repository';
import { Fundraiser } from '../fundraiser/entities/fundraiser.entity';

@Injectable()
export class UserService {

  constructor(private userRepository: UserRepository){}


  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password,10)
    let user: User = new User();
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = hashedPassword;
    user.role = Constants.ROLES.NORMAL_ROLE;
    // user.createdAt = DateTime
    return this.userRepository.save(user);
  }

  // async createdByAdmin(createUserDto:any, password:string){
  //   const hashedPassword = await bcrypt.hash(password,10)
  //   let user: Fundraiser = new Fundraiser();
  //   user.email = createUserDto.email;
  //   user.firstName = createUserDto.firstName;
  //   user.lastName = createUserDto.lastName;
  //   user.password = hashedPassword;
  //   user.role = Constants.ROLES.FUNDRAISER_ROLE;
  //   user.status = "active";
  //   return this.fundraiserRepository.save(user);
  // }


  findAll() {
    return this.userRepository.find()
  }

  findUserById(id:number){
    return this.userRepository.findOneOrFail({where:{id:id}});
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({where: {email: email}});
  }


  remove(id: number) {
    return this.userRepository.delete(id);
  }

}
