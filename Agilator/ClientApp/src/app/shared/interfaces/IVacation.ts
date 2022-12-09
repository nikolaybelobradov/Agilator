import { ITeamMember } from "../ITeamMember";
import { ISprint } from "./ISprint";

export interface IVacation{

    id: string;
    duration: number;
    teamMember: ITeamMember;
    sprint: ISprint;
}