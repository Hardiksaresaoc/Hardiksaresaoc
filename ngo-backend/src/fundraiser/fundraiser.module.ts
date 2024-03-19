import { Module } from '@nestjs/common';
import { FundraiserService } from './fundraiser.service';
import { FundraiserController } from './fundraiser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fundraiser } from './entities/fundraiser.entity';
import { FundRaiserRepository } from './repo/fundraiser.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Fundraiser])],
  controllers: [FundraiserController],
  providers: [FundraiserService,FundRaiserRepository],
  exports:[FundraiserService,FundRaiserRepository],
})
export class FundraiserModule {}
