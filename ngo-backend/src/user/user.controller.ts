import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req, UseGuards, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from '../fundraiser/dto/change-password.dto';

@Controller('user')
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService) {}


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

}
