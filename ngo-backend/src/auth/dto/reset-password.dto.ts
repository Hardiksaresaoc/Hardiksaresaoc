import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDto{

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    otp:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    newPassword:string;

}