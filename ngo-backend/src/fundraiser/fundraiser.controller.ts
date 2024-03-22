import { Body, Controller, Get, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FundraiserService } from './fundraiser.service';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { FundRaiserRepository } from './repo/fundraiser.repository';

@ApiTags("FundRaiser")
@Controller('fundRaiser')
export class FundraiserController {
  constructor(private readonly fundraiserService: FundraiserService,
    private fundRaiserRepository:FundRaiserRepository) {}

  @ApiSecurity("JWT-auth")
  @Post("/changePassword")
  @UseGuards(new RoleGuard(Constants.ROLES.FUNDRAISER_ROLE))
  async changePassword(@Req() req,@Body() changePasswordDto:ChangePasswordDto){
    await this.fundraiserService.changePassword(req,changePasswordDto)
    return "Password Changed Successfully";
  }

  
  @Get()
  @ApiSecurity("JWT-auth")
  @UseGuards(new RoleGuard(Constants.ROLES.FUNDRAISER_ROLE))
  async getFundraiserById(@Req() req){
    const id = req.user;
    try {
      return await this.fundRaiserRepository.findOneOrFail({where:{email:id.email}});

    } catch (error) {
      throw new NotFoundException("Fundraiser not found");
    }
  }

}
