import { Field } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Donation } from "../../donation/entities/donation.entity";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Fundraiser {

    @PrimaryGeneratedColumn()
    @OneToOne(()=> User,(id)=>{id.id})
    fundraiser_id: number;

    @Column()
    firstName: string;

    @Column({
        nullable: true
    })
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column({
    })
    status:string
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

}
