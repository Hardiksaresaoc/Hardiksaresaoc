import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { FundraiserPage } from "../entities/fundraiser-page.entity";


@Injectable()
export class ProjectRepository extends Repository<FundraiserPage>{
    constructor(private dataSource: DataSource){
        super(FundraiserPage,dataSource.createEntityManager());
    }
}