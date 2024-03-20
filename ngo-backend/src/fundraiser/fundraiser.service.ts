import { Injectable } from '@nestjs/common';
import { FundRaiserRepository } from './repo/fundraiser.repository';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Fundraiser } from './entities/fundraiser.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/user/repo/user.repository';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class FundraiserService {

    constructor(private fundRaiserRepository:FundRaiserRepository,private userRepository:UserRepository){}
    
    findFundRaiserByEmail(email: string) {
        return this.fundRaiserRepository.findOne({where: {email: email}});
      }

    async getFundRaiserStatusByEmail(email: string) {
        var fundraiser = await this.fundRaiserRepository.findOne({where: {email: email}});
        return fundraiser.status;
    }  

    async changePassword(req,changePasswordDto:ChangePasswordDto){
        const user:User = req.user;
        const user2 = await this.userRepository.findOne({where:{email:user.email}})
        var isSame = await bcrypt.compare(changePasswordDto.oldPassword,user2.password)
        console.log(changePasswordDto.newPassword==changePasswordDto.confirmPassword)
        if(isSame && changePasswordDto.newPassword == changePasswordDto.confirmPassword){
          const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword,10)
          return this.userRepository.update(user2.id,{password:hashedPassword});
        }
      }
    
    
}
