import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt"
import { UserService } from "src/user/user.service";
import { sendEmailDto } from "src/mailer/mail.interface";
import { MailerService } from "src/mailer/mailer.service";
import { AdminService } from "src/admin/admin.service";
import { FundraiserService } from "src/fundraiser/fundraiser.service";

@Controller("auth")
@ApiTags("Login")
export class AuthController {

    constructor(private jwtService: JwtService,
        private userService: UserService,
        private adminService:AdminService,
        private fundRaiserService:FundraiserService){}

    //Login Route
    @Post("/login")
    @UseGuards(AuthGuard("local"))
    async login(@Req() req, @Body() loginDto: LoginDto){
        //jwt token
        const user : User = req.user;
        if((user.role=="FUNDRAISER" && await this.fundRaiserService.getFundRaiserStatusByEmail(user.email)=="active" ) ||(user.role=="NORMAL_USER_ROLE") || (user.role=="ADMIN")){
            
        
        if(user && (bcrypt.compare(loginDto.password,user.password))){
            const payload = {
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
                "role": user.role,
                "userId": user.id   
            }
            return {token: this.jwtService.sign(payload)};    
        }
        else{
            return null;
        }      
    }
    else{
        return "Please contact the administrator";
    } 
    }

    

}