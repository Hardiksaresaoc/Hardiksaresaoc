import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt"
import { UserService } from "src/user/user.service";
import { sendEmailDto } from "src/mailer/mail.interface";
import { MailerService } from "src/mailer/mailer.service";

@Controller("auth")
@ApiTags("Login")
export class AuthController {

    constructor(private jwtService: JwtService,
        private userService: UserService,
        private mailerService:MailerService){}

    //Login Route
    @Post("/login")
    @UseGuards(AuthGuard("local"))
    login(@Req() req, @Body() loginDto: LoginDto){
        //jwt token
        const user : User = req.user;
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

    @Post("/generate")
   async generatePasswordByEmail(@Body() body){
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
            
        return this.userService.createdByAdmin(body, randomstring)
    }

}