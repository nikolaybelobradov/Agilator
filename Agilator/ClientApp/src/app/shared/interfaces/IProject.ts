import { ISprint } from "./ISprint";

export interface IProject{

    id: string;
    name: string;
    description: string;
    sprints: ISprint[];

}