import { Field } from "@nestjs/graphql";
import { Donation } from "src/donation/entities/donation.entity";
import { Fundraiser } from "src/fundraiser/entities/fundraiser.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column({
        nullable: true
    })
    lastName: string;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    @OneToOne(()=>Fundraiser,fundraiser=>fundraiser.user,{onDelete:"CASCADE"})
    @JoinColumn()
    fundraiser: Fundraiser;

    @OneToMany(()=>Donation,donation=>donation.user)
    donations:Donation[];

}
