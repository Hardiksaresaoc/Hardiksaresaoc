import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { sendEmailDto } from 'src/mailer/mail.interface';
import { MailerService } from 'src/mailer/mailer.service';
import { UserRepository } from 'src/user/repo/user.repository';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';
import { ProjectService } from 'src/project/project.service';

@UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
@ApiTags("Admin")
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private mailerService:MailerService,
    private userRepository:UserRepository,
    private projectService:ProjectService
    ) {}

  @ApiSecurity("JWT-auth")
  @Post("/fundraiser/status/:id")
  changeFundraiserStatus(@Param('id') id: number) {
    return this.adminService.changeFundraiserStatus(id);
  }

  @ApiSecurity("JWT-auth")
  @Delete("/fundraiser/delete/:id")
  deleteFundraiser(@Param('id',ParseIntPipe) id: number) {
    return this.adminService.deleteFundraiser(id);
  }

  @ApiSecurity("JWT-auth")
  @Get("/fundraiser")
  getAllFundraiser() {
    return this.adminService.getAllFundraiser();
  }

  @ApiSecurity("JWT-auth")
  @Post("/generate")
 async generatePasswordByEmail(@Body() body){
  const isUserExists = await this.userRepository.findOne({where:{email: body.email}})
  if(isUserExists && isUserExists.role == "FUNDRAISER"){
    throw new BadRequestException("Email already in use")
  }    
else{

      var randomstring = Math.random().toString(36).slice(-8);
      // console.log(randomstring);
      // console.log(body.email)
      var body2 = {
          "firstName":body.firstName,
          "password":randomstring
      }
      const dto:sendEmailDto = {
          // from: {name:"Lucy", address:"lucy@example.com"},
          recipients: [{name: body.firstName, address:body.email}],
          subject: "FundRaiser Password",
          html: "<p>Hi {firstName}, Login to Portal using:{password} </p><p><strong>Cheers!</strong></p>",
          placeholderReplacements:body2
        };
        await this.mailerService.sendMail(dto);
          
      return this.adminService.createdByAdmin(body, randomstring)
}
  }

  @ApiSecurity("JWT-auth")
  @Delete("/user/delete/:id")
  deleteUser(@Param('id',ParseIntPipe) id: number) {
    return this.adminService.deleteUser(id);
  }

  @Get("projects")
  getProjects(){
    return this.projectService.getProjects();
  }

  @Get("project/:id")
  async getProjectById(@Param("id") project_id:number){
    return await this.projectService.getProjectById(project_id)
  }



}
