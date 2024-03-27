import { Module } from '@nestjs/common';
import { FundraiserPageService } from './fundraiser-page.service';
import { FundraiserPageController } from './fundraiser-page.controller';

@Module({
  controllers: [FundraiserPageController],
  providers: [FundraiserPageService],
})
export class FundraiserPageModule {}
