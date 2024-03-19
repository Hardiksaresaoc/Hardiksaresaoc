import { Field } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Fundraiser } from "../../fundraiser/entities/fundraiser.entity";

@Entity()
export class Donation {

    @PrimaryGeneratedColumn()
    donation_id: number;

    @OneToOne(()=> Fundraiser,(id)=>{id.fundraiser_id})
    fundraiser_id: Fundraiser;

    @Column()
    user_id: number;

    @Column()
    amount: number;
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

}
