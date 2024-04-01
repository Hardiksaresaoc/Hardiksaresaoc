import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req, UseGuards, UnauthorizedException, BadRequestException, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { UserService, storage } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from '../fundraiser/dto/change-password.dto';
import { Observable, of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer"
import * as path from 'path';
import {v4 as uuidv4} from "uuid";
import { User } from './entities/user.entity';
import { UserRepository } from './repo/user.repository';
import { Fundraiser } from 'src/fundraiser/entities/fundraiser.entity';
import { Donation } from 'src/donation/entities/donation.entity';


@Controller('user')
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly userRepository:UserRepository) {}


  //signUp Route
  @Post("/signUp")
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findUserByEmail(createUserDto.email);
    if(existingUser){
      throw new BadRequestException("Email already in use")
    }
    else{
    return this.userService.create(createUserDto);
    }
  }

  //Get-all user route NOTE:Only admin-access route
  @Get()
  @ApiSecurity("JWT-auth")
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  findAll(@Req()req) {
    return this.userService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // Delete user route by id
  @Delete(':id')
  @ApiSecurity("JWT-auth")
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  remove(@Param('id') id: string,@Req() req) {
    return this.userService.remove(+id);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file",storage))
  async uploadFile(@UploadedFile() file,@Req() req){
    let user:User = req.user;
    return await this.userRepository.update(user.id,{profileImage:file.filename})
    // return of({imagePath: file.filename});
  }

  @Get("profile-image/:imagename")
  findProfileImage(@Param("imagename") imagename,@Res() res){
    return of(res.sendFile(path.join(process.cwd(), "uploads/profileImages/"+ imagename)));
  }

}
