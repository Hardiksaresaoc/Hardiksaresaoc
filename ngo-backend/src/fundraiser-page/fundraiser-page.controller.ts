import { Controller } from '@nestjs/common';
import { FundraiserPageService } from './fundraiser-page.service';

@Controller('fundraiser-page')
export class FundraiserPageController {
  constructor(private readonly fundraiserPageService: FundraiserPageService) {}
}
