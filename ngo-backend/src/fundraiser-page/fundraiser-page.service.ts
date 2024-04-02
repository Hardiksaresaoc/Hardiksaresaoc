import { Body, Injectable, Req } from '@nestjs/common';
import { Donation } from 'src/donation/entities/donation.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { FundraiserPage } from './entities/fundraiser-page.entity';
import { FundraiserPageRepository } from './repo/fundraiser-page.repository';
import { Fundraiser } from 'src/fundraiser/entities/fundraiser.entity';
import { FundRaiserRepository } from 'src/fundraiser/repo/fundraiser.repository';
import { DonationRepository } from 'src/donation/repo/donation.repository';

@Injectable()
export class FundraiserPageService {

    constructor(private dataSource:DataSource,
        private fundRaiserPageRepository:FundraiserPageRepository,
        private fundRaiserRepository:FundRaiserRepository,
        ){}

    async create(req,body,files,id,fundraiser){
        const fundraiserPage:FundraiserPage = new FundraiserPage();
        fundraiserPage.target_amount = body.target_amount;
        // fundraiserPage.raised_amount = 0;
        fundraiserPage.resolution = body.resolution;
        // fundraiserPage.about = body.data.about;
        // fundraiserPage.money_raised_for = body.data.money_raised_for;

        // let supporters = await this.donationRepository.find({where:{fundraiser:{fundraiser_id:fundraiser.fundraiser_id}}},)
        // console.log(supporters)
        let supporter = [];
        let updatedAmount = 0;

        // supporters.forEach(supporters => {
        //     // const fileReponse = {
        //     //   filename: file.filename,
        //     // };
        //     supporter.push(supporters.Name)
        //     updatedAmount = updatedAmount + supporters.amount
        //   });
        fundraiserPage.raised_amount = updatedAmount;  
        fundraiserPage.supporters = supporter  
        fundraiserPage.gallery = files;
        fundraiserPage.fundraiser = fundraiser;
        // console.log(fundraiserPage)
        await this.fundRaiserPageRepository.save(fundraiserPage);
        return fundraiserPage;
    }
//     async updateRaisedAmount(){
//         let raised_amount = 0;
//         const firstUser = await this.dataSource
//     .getRepository(Donation)
//     .createQueryBuilder("donation")
//     .leftJoinAndSelect("donation.fundraiser","fundraiser")
//     .where("donation.donation_id = :id", { id: 20 })
//     .getOne()
// console.log(firstUser)
//     }
}
