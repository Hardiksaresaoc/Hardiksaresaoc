import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { Donation } from './entities/donation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationRepository } from './repo/donation.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Donation])],
  controllers: [DonationController],
  providers: [DonationService,DonationRepository],
})
export class DonationModule {}
