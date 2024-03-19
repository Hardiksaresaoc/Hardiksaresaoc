import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { FundraiserModule } from 'src/fundraiser/fundraiser.module';

@Module({
  imports: [FundraiserModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports:[AdminService]
})
export class AdminModule {}
