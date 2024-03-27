import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, response } from 'express';
import { sendEmailDto } from 'src/mailer/mail.interface';
import { MailerService } from 'src/mailer/mailer.service';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repo/user.repository';
import { UserService } from 'src/user/user.service';
import { ForgottenPasswordRepository } from './repo/forgot-password.repo';
import { ForgottenPassword } from './entities/forgot-password.entity';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private mailerService: MailerService,
        private forgottenPasswordRepository:ForgottenPasswordRepository
    ){}

    async sendEmailForgotPassword(email:string){
        const user = await this.userService.findUserByEmail(email)
        if(!user){
            throw new NotFoundException("User not found")
        }

        var randomstring = Math.random().toString(36).slice(-8);
        var body2 = {
            "firstName":user.firstName,
            "otp":randomstring
        }
        const dto:sendEmailDto = {
            recipients: [{name: user.firstName, address:user.email}],
            subject: "Reset Password",
            html: "<p>Hi {firstName}, Reset password using:{otp} </p><p>Otp expires in<strong>10</strong>minutes</p>",
            placeholderReplacements:body2
          };
          await this.mailerService.sendMail(dto);
  
        let forgotPassword = new ForgottenPassword()
        forgotPassword.email = email
        forgotPassword.newPasswordToken = randomstring
        await this.forgottenPasswordRepository.save(forgotPassword)  
        setTimeout(async ()=>{
            try{
            var user2 = await this.forgottenPasswordRepository.findOne({where:{email:email}})
            await this.forgottenPasswordRepository.remove(user2)
            
            }catch{
                return true
            }},600000)   
                 return "true"
    }
    
       
       
     
}
