import { Controller } from '@nestjs/common';
import { FundraiserService } from './fundraiser.service';

@Controller('fundraiser')
export class FundraiserController {
  constructor(private readonly fundraiserService: FundraiserService) {}
}
