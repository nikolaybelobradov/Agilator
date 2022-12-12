import { IProject } from "./IProject";

export interface ITeamMember{
    
    id: string;
    name: string;
    workingHours: number;
    project: IProject;
}