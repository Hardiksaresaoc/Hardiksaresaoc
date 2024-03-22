import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repo/user.repository';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private userRepository: UserRepository
    ){}

    async refreshToken(req: Request,res:Response):Promise<string>{
        const refreshToken = req.cookies["refresh_token"];
        if(!refreshToken){
            throw new UnauthorizedException("Refresh token not found");
        }
        let payload;
        try {
            payload = this.jwtService.verify(refreshToken, {
                secret: "secret"
            })
            
        } catch (error) {
            throw new UnauthorizedException("Invalid or expired refresh token")
        }

        const userExists = await this.userRepository.findOne({where:{id:payload.sub}});
        console.log("hello")
        if(!userExists){
            throw new BadRequestException("User no longer exists")
        }
        const expiresIn = 15000;
        const expiration = Math.floor(Date.now() / 1000) + expiresIn;
        const accessToken = this.jwtService.sign(
            {...payload, exp:expiration},
            {
                secret:"access_token_Secret",
            }
        )
        res.cookie("access_token", accessToken, {
            httpOnly: true
        })

        return accessToken;
    }

    issueTokens(user:User, response:Response){
        const payload = {email:user.email, sub:user.id}

        const accessToken = this.jwtService.sign(
            {...payload,},
            {
                secret:"access_token_Secret",
                expiresIn:"150sec"
            }
        )

        const refreshToken = this.jwtService.sign(payload,{
            secret:"refresh_token_Secret",
            expiresIn:"7d"
        });

        console.log(refreshToken)
        response.cookie("access_token", accessToken, {
            httpOnly: true
        })
        console.log(refreshToken)

        response.cookie("refresh_token", refreshToken, {
            httpOnly: true
        })
        return {user};
    }


}
