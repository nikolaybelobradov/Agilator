import { environment } from "src/environments/environment";

export const getRoute = (route: string, id?: string) => {

    if (id !== undefined) return `${environment.baseUrl}/${route}/${id}`;

    return `${environment.baseUrl}/${route}`;
}