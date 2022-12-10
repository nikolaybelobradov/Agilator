import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProjectDto } from '../shared/interfaces/dtos/IProjectDto';
import { IResponseDto } from '../shared/interfaces/dtos/IResponseDto';
import { IProject } from '../shared/interfaces/IProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjectDetails(route: string, id: string){
    return this.http.get<IProject> (this.getRoute(route, id));
  }

  getMyProjects(route: string){
    return this.http.get<IProject[]> (this.getRoute(route));
  }

  create(route: string, body: IProjectDto) {
    return this.http.post<IResponseDto> (this.getRoute(route), body);
  }

  edit(route: string, id: string, body: IProjectDto){
    return this.http.put (this.getRoute(route, id), body);
  }

  delete(route: string, id: string){
    return this.http.delete (this.getRoute(route, id));
  }

  private getRoute = (route: string, id?: string) => {

    if(id !== undefined) return `${environment.baseUrl}/${route}/${id}`;

    return `${environment.baseUrl}/${route}`;
  }
}
