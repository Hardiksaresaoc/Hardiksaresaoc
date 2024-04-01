import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { DonationService } from './donation.service';
import { User } from 'src/user/entities/user.entity';
import { Fundraiser } from 'src/fundraiser/entities/fundraiser.entity';
import { Donation } from './entities/donation.entity';
import { FundraiserService } from 'src/fundraiser/fundraiser.service';
import { Public } from 'src/public.decorator';

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService
    ) {}

    @Post("/pay")
    @Public()
    async donate(@Req()req,@Body()body,@Param("id") id:number){
      await this.donationService.donate(req,body,id);
    }
  

  @Post("/pay/:id")
  @Public()
  async donateToFundRaiser(@Req()req,@Body()body,@Param("id") id:number){
    await this.donationService.donate(req,body,id);
  }


}
