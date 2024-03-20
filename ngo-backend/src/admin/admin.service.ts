import { Injectable } from '@nestjs/common';
import { Fundraiser } from 'src/fundraiser/entities/fundraiser.entity';
import { FundraiserService } from 'src/fundraiser/fundraiser.service';
import * as bcrypt from 'bcrypt';
import { Constants } from 'src/utils/constants';
import { FundRaiserRepository } from 'src/fundraiser/repo/fundraiser.repository';
import { UserRepository } from 'src/user/repo/user.repository';

@Injectable()
export class AdminService {

    constructor(private fundRaiserService:FundraiserService,
        private fundraiserRepository:FundRaiserRepository,
        private userRepository:UserRepository){}

    async createdByAdmin(createUserDto:any, password:string){
        const hashedPassword = await bcrypt.hash(password,10)
        let user: Fundraiser = new Fundraiser();
        user.email = createUserDto.email;
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.password = hashedPassword;
        user.role = Constants.ROLES.FUNDRAISER_ROLE;
        await this.userRepository.save(user)
        user.status = "active";
        return this.fundraiserRepository.save(user);
      }

    async changeFundraiserStatus(id:number){
        // return await this.fundraiserRepository.update(id,{status:"inactive"});
        const fundraiser = await this.fundraiserRepository.findOne({where:{fundraiser_id:id}});

        if (!fundraiser) {
          throw new Error('Fundraiser not found');
        }
      
        // Toggle the status based on its current value
        fundraiser.status = fundraiser.status === 'active' ? 'inactive' : 'active';
      
        // Save the updated fundraiser
        await this.fundraiserRepository.update(id,{status:fundraiser.status});

        return `Status changed to ${fundraiser.status}`;
      
    }  
    
    async deleteFundraiser(id:number){
        return await this.fundraiserRepository.delete(id);
    }

    async getAllFundraiser(){
        return await this.fundraiserRepository.find();
    }
}
