import { Injectable } from '@nestjs/common';
import { DonationRepository } from './repo/donation.repository';
import { User } from 'src/user/entities/user.entity';
import { Fundraiser } from 'src/fundraiser/entities/fundraiser.entity';
import { FundraiserService } from 'src/fundraiser/fundraiser.service';
import { Donation } from './entities/donation.entity';
import { FundRaiserRepository } from 'src/fundraiser/repo/fundraiser.repository';
import { first } from 'rxjs';
import { FundraiserPageRepository } from 'src/fundraiser-page/repo/fundraiser-page.repository';

@Injectable()
export class DonationService {
    constructor(private donationRepository: DonationRepository,
        private readonly fundRaiserRepository:FundRaiserRepository,
        private readonly fundRaiserPageRepository:FundraiserPageRepository){}

    async donate(req,body,id?){
        let user:User = req.user;
        let donation:Donation = new Donation();
        try{
            if(id){
            let fundraiser:Fundraiser = await this.fundRaiserRepository.findOne({where:{fundraiser_id:id}})
            const total_amount_raised = fundraiser.total_amount_raised + parseInt(body.amount);
            const total_donations = fundraiser.total_donations + 1;
            await this.fundRaiserRepository.update(id,{total_amount_raised:total_amount_raised,
            total_donations:total_donations})
            let supporters = await this.fundRaiserPageRepository.find({where:{fundraiser:{fundraiser_id:id}}})
            // console.log(supporters)
                    supporters.forEach(async supporters => {
                        const newAmount:number = supporters.raised_amount + parseInt(body.amount);
                        await this.fundRaiserPageRepository.update(supporters.id,{ raised_amount:newAmount})
          });


            if(fundraiser.status == "active"){
                donation.fundraiser = fundraiser;
              }
            }
        }
        finally{
        donation.amount = body.amount;
        donation.Name = body.name;
        if(user){
            const {firstName,lastName} = user;

            donation.Name = firstName + " " + lastName;
            donation.user = user;
        }

        
        return this.donationRepository.save(donation);
    }
      }
    
}
