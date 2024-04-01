import { Body, Controller, Get, Post, Req, UseGuards ,Param, NotFoundException, Res} from "@nestjs/common";
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
import { AuthService} from "src/auth/auth.service"
import { ForgottenPasswordRepository } from "./repo/forgot-password.repo";
import { UserRepository } from "src/user/repo/user.repository";
import { response } from "express";

@Controller("auth")
@ApiTags("Login")
export class AuthController {

    constructor(private jwtService: JwtService,
        private userService: UserService,
        private adminService:AdminService,
        private fundRaiserService:FundraiserService,
        private authService:AuthService,
        private forgottenPasswordRepository:ForgottenPasswordRepository,
        private userRepository:UserRepository
        ){}

    //Login Route
    @Post("/login")
    @UseGuards(AuthGuard("local"))
    async login(@Req() req, @Body() loginDto: LoginDto,@Res({passthrough:true}) response){
        //jwt token
        const user : User = req.user;
        if((user.role=="FUNDRAISER" && await this.fundRaiserService.getFundRaiserStatusByEmail(user.email)=="active" ) ||(user.role=="NORMAL_USER_ROLE") || (user.role=="ADMIN")){
            
        
        if(user && (await bcrypt.compare(loginDto.password,user.password))){
            const payload = {
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
                "role": user.role,
                "userId": user.id   
            }
            return {token: this.jwtService.sign(payload)};   
            // return this.authService.issueTokens(user, response); // Issue tokens on login
 
        }
        else{
            return null;
        }      
    }
    else{
        return "Please contact the administrator";
    } 
    }

    @Get("forgot-password")
    public async sendEmailForgotPassword(@Body("email") email:string){
        return await this.authService.sendEmailForgotPassword(email);
    }

    @Post("reset-password")
    async setNewPassword(@Body()body){
        var user = await this.forgottenPasswordRepository.findOne({where:{newPasswordToken:body.otp}})
        if(!user){
            throw new NotFoundException("Invalid Otp")
        }
        else{
            var user_new = await this.userService.findUserByEmail(user.email)
            const password = body.newPassword
            const hashedPassword = await bcrypt.hash(password,10)
            var status = await this.userRepository.update(user_new.id,{password:hashedPassword})
            if(status){
            await this.forgottenPasswordRepository.remove(user)}
            return "Success"

        }
        

        }
    

}