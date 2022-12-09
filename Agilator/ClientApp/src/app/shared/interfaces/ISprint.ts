import { ITeamMember } from "../ITeamMember";

export interface ISprint{

    id: string;
    name: string;
    duration: number;
    teamMembers: ITeamMember[];
}