import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repo/user.repository';
import { User } from './entities/user.entity';
import { Constants } from 'src/utils/constants';

@Injectable()
export class UserService {

  constructor(private userRepository: UserRepository){}


  create(createUserDto: CreateUserDto) {
    let user: User = new User();
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.NORMAL_ROLE;
    return this.userRepository.save(user);
  }

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
