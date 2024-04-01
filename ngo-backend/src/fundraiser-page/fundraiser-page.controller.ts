import { Controller, Get } from '@nestjs/common';
import { FundraiserPageService } from './fundraiser-page.service';

@Controller('fundraiser-page')
export class FundraiserPageController {
  constructor(private readonly fundraiserPageService: FundraiserPageService) {}

  @Get()
  updateRaisedAmount(){
    return this.fundraiserPageService.updateRaisedAmount();
  }
}
