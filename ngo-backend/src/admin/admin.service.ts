import { Injectable } from '@nestjs/common';
import { Fundraiser } from 'src/fundraiser/entities/fundraiser.entity';
import { FundraiserService } from 'src/fundraiser/fundraiser.service';
import * as bcrypt from 'bcrypt';
import { Constants } from 'src/utils/constants';
import { FundRaiserRepository } from 'src/fundraiser/repo/fundraiser.repository';

@Injectable()
export class AdminService {

    constructor(private fundRaiserService:FundraiserService,
        private fundraiserRepository:FundRaiserRepository){}

    async createdByAdmin(createUserDto:any, password:string){
        const hashedPassword = await bcrypt.hash(password,10)
        let user: Fundraiser = new Fundraiser();
        user.email = createUserDto.email;
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.password = hashedPassword;
        user.role = Constants.ROLES.FUNDRAISER_ROLE;
        user.status = "active";
        return this.fundraiserRepository.save(user);
      }
    
}
