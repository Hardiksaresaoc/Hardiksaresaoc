import { Controller, Get, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags("Admin")
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiSecurity("JWT-auth")
  @Post("/fundraiser/status/:id")
  changeFundraiserStatus(@Param('id') id: number) {
    return this.adminService.changeFundraiserStatus(id);
  }

  @ApiSecurity("JWT-auth")
  @Post("/fundraiser/delete/:id")
  deleteFundraiser(@Param('id') id: number) {
    return this.adminService.deleteFundraiser(id);
  }

  @ApiSecurity("JWT-auth")
  @Get("/fundraiser")
  getAllFundraiser() {
    return this.adminService.getAllFundraiser();
  }
}
