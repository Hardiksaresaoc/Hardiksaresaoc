import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class UpdateFundraiserDto {

        firstName?:string;
        lastName?:string;
        mobile_number?:number;
        profilePicture?:string;
        address?:string;
        city?:string;
        state?:string
        country?:string
        pincode?:number
        dob?:string
        pan?:string


}
