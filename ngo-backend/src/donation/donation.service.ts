import { Injectable } from '@nestjs/common';
import { DonationRepository } from './repo/donation.repository';
import { User } from 'src/user/entities/user.entity';
import { Fundraiser } from 'src/fundraiser/entities/fundraiser.entity';
import { FundraiserService } from 'src/fundraiser/fundraiser.service';
import { Donation } from './entities/donation.entity';
import { FundRaiserRepository } from 'src/fundraiser/repo/fundraiser.repository';

@Injectable()
export class DonationService {
    constructor(private donationRepository: DonationRepository,
        private readonly fundRaiserRepository:FundRaiserRepository){}

    async donate(req,body,id){
        let user:User = req.user;
        let donation:Donation = new Donation();
        try{
            if(id){
            let fundraiser:Fundraiser = await this.fundRaiserRepository.findOne({where:{fundraiser_id:id}})
            if(fundraiser.status == "active"){
                donation.fundraiser = fundraiser;
              }
            }
        }
        finally{
        donation.amount = body.amount;
        if(user){
            donation.user = user;
        }
        
        return this.donationRepository.save(donation);
    }
      }
    
}
