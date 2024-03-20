import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { FundraiserModule } from 'src/fundraiser/fundraiser.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [FundraiserModule,UserModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports:[AdminService]
})
export class AdminModule {}
