import { Injectable } from '@nestjs/common';
import { Donation } from 'src/donation/entities/donation.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class FundraiserPageService {

    constructor(private dataSource:DataSource){}
    async updateRaisedAmount(){
        const firstUser = await this.dataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: 47 })
    .getOne()
console.log(firstUser)
    }
}
