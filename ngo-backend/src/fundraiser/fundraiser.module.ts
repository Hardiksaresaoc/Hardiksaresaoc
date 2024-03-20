import { Module } from '@nestjs/common';
import { FundraiserService } from './fundraiser.service';
import { FundraiserController } from './fundraiser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fundraiser } from './entities/fundraiser.entity';
import { FundRaiserRepository } from './repo/fundraiser.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Fundraiser]),UserModule],
  controllers: [FundraiserController],
  providers: [FundraiserService,FundRaiserRepository],
  exports:[FundraiserService,FundRaiserRepository],
})
export class FundraiserModule {}
