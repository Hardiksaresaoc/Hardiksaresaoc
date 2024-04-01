import { Body, Controller, Get, NotFoundException, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FundraiserService } from './fundraiser.service';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { FundRaiserRepository } from './repo/fundraiser.repository';
import { Public } from 'src/public.decorator';
import { Fundraiser } from './entities/fundraiser.entity';
import { UpdateFundraiserDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repo/user.repository';
import { of } from 'rxjs';
import * as path from 'path';

@ApiTags("FundRaiser")
@Controller('fundRaiser')
export class FundraiserController {
  constructor(private readonly fundraiserService: FundraiserService,
    private fundRaiserRepository:FundRaiserRepository,
    private userRepository:UserRepository
  ) {}

  @UseGuards(new RoleGuard(Constants.ROLES.FUNDRAISER_ROLE))
  @ApiSecurity("JWT-auth")
  @Post("/changePassword")
  async changePassword(@Req() req,@Body() changePasswordDto:ChangePasswordDto){
    await this.fundraiserService.changePassword(req,changePasswordDto)
    return "Password Changed Successfully";
  }

  
  @UseGuards(new RoleGuard(Constants.ROLES.FUNDRAISER_ROLE))
  @Get()
  @ApiSecurity("JWT-auth")
  async getFundraiser(@Req() req){
    const id = req.user;
    try {
      return await this.fundRaiserRepository.findOneOrFail({where:{email:id.email}});

    } catch (error) {
      throw new NotFoundException("Fundraiser not found");
    }
  }

  @Get(":id")
  @Public()
  async getFundraiserById(@Param("id") id:number){
    return await this.fundRaiserRepository.findOne({where:{fundraiser_id:id}})
  }

  @Put("/update")
  @UseGuards(new RoleGuard(Constants.ROLES.FUNDRAISER_ROLE))
  async updateFundraiser(@Req() req,@Body()body:UpdateFundraiserDto){
    return this.fundraiserService.updateFundRaiserById(req,body)
  }


  @Post("upload")
  @UseGuards(new RoleGuard(Constants.ROLES.FUNDRAISER_ROLE))
  @UseInterceptors(FileInterceptor("file",storage))
  async uploadFile(@UploadedFile() file,@Req() req){
    let user:User = req.user;
    let fundRaiser = await this.fundraiserService.findFundRaiserByEmail(user.email)
    await this.fundRaiserRepository.update(fundRaiser.fundraiser_id,{profileImage:file.filename})
    return await this.userRepository.update(user.id,{profileImage:file.filename})
  }

  @Get("profile-image/:imagename")
  @UseGuards(new RoleGuard(Constants.ROLES.FUNDRAISER_ROLE))
  findProfileImage(@Param("imagename") imagename,@Res() res){
    return of(res.sendFile(path.join(process.cwd(), "uploads/profileImages/"+ imagename)));
  }


}
