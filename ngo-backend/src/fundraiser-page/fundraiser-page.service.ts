import { Body, Injectable, NotFoundException, Req } from '@nestjs/common';
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

    async update(body,files,PageId){
        try {
                    let fundRaiserPageNew = await this.fundRaiserPageRepository.find({where:{id:PageId}})
        await this.fundRaiserPageRepository.update(PageId,body) 
        const fundraiserGallery = fundRaiserPageNew[0].gallery
        for(let i = 0; i <files.length; i++){
            fundraiserGallery.push(files[i])
        }
        // console.log(fundraiserGallery)

        await this.fundRaiserPageRepository.update(PageId,{gallery:fundraiserGallery}) 
    } catch (error) {
            throw new NotFoundException("Not Found")
    }

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
