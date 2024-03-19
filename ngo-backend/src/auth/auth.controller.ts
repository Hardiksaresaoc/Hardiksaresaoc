import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt"
import { UserService } from "src/user/user.service";

@Controller("auth")
@ApiTags("Login")
export class AuthController {

    constructor(private jwtService: JwtService,
        private userService: UserService){}

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
    generatePasswordByEmail(@Body() body){
        var randomstring = Math.random().toString(36).slice(-8);
        console.log(randomstring);
        return this.userService.createdByAdmin(body, randomstring)
    }

}