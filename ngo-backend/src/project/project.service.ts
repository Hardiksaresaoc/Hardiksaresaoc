import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './repo/project.repository';

@Injectable()
export class ProjectService {

    constructor(private projectRepository: ProjectRepository){}

    getProjects(){
        return this.projectRepository.find()
    }

    async getProjectById(projectId:number){
        var project = await this.projectRepository.findOne({where:{project_id:projectId}})
        if(project){
            return project;
        }
        else{
            throw new NotFoundException('Project not found');
        }
    }

}
