import { IProject } from "./interfaces/IProject";

export interface ITeamMember{
    
    id: string;
    name: string;
    workingHours: number;
    project: IProject;
}