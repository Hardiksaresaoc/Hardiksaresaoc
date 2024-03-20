import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { FundraiserService } from './fundraiser.service';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags("FundRaiser")
@Controller('fundRaiser')
export class FundraiserController {
  constructor(private readonly fundraiserService: FundraiserService) {}

  @ApiSecurity("JWT-auth")
  @Post("/changePassword")
  @UseGuards(new RoleGuard(Constants.ROLES.FUNDRAISER_ROLE))
  async changePassword(@Req() req,@Body() changePasswordDto:ChangePasswordDto){
    await this.fundraiserService.changePassword(req,changePasswordDto)
    return "Password Changed Successfully";
  }

}
