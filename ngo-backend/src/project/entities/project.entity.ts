import { Field } from "@nestjs/graphql";
import { Fundraiser } from "src/fundraiser/entities/fundraiser.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    project_id: number;

    @Column({unique:true})
    project_name: string;

    @Column()
    project_description: string;

    @Column('text',{array: true})
    project_images: string[];

    @Column()
    total_donations:number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    @ManyToOne(()=>Fundraiser,fundraiser=>fundraiser.project,{onDelete:"SET NULL"})
    fundraiser:Fundraiser;


}
