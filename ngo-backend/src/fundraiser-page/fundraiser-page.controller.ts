import { Body, Controller, Get, Param, Post, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FundraiserPageService } from './fundraiser-page.service';
import { FundraiserService } from 'src/fundraiser/fundraiser.service';
import { Public } from 'src/public.decorator';
import { FundRaiserRepository } from 'src/fundraiser/repo/fundraiser.repository';
import { ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { DonationRepository } from 'src/donation/repo/donation.repository';
import { FundraiserPageRepository } from './repo/fundraiser-page.repository';

@ApiTags("Fundraiser-Page")
@Controller('fundraiser-page')
export class FundraiserPageController {
  constructor(private readonly fundraiserPageService: FundraiserPageService,
    private readonly fundRaiserRepository:FundRaiserRepository,
    private readonly fundraiserService:FundraiserService,
    private readonly fundraiserPageRepository:FundraiserPageRepository
    ) {}

  // @Get()
  // updateRaisedAmount(){
  //   return this.fundraiserPageService.updateRaisedAmount();
  // }
  @Post("createPage")
  @UseInterceptors(FilesInterceptor("file",20,storage))
  async createPage(@UploadedFiles() files,@Req() req,@Body() body){
    // console.log(body.data)
    let user:User = req.user;
    let fundRaiser = await this.fundraiserService.findFundRaiserByEmail(user.email)
    const response = [];
    try {
      files.forEach(file => {
        // const fileReponse = {
        //   filename: file.filename,
        // };
        response.push(file.filename);
        // console.log(response)
      });
    
    } catch (error) {
      return true;
    }
return await this.fundraiserPageService.create(req,JSON.parse(body.data),response,fundRaiser.fundraiser_id,fundRaiser)
  }


    //public page for fundraiser
    @Get(":id")
    @Public()
    async getFundraiserById(@Param("id") id:number){
      return await this.fundraiserPageRepository.findOne({where:{id:id}})
    }
  
}
