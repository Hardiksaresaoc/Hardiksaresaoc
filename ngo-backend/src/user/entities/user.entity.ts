import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column({nullable:true})
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

}
