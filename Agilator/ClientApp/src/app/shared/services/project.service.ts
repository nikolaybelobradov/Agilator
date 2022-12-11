import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProjectDto } from '../interfaces/dtos/IProjectDto';
import { IResponseDto } from '../interfaces/dtos/IResponseDto';
import { IProject } from '../interfaces/IProject';
import { getRoute } from './helper';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjectDetails(route: string, id: string){
    return this.http.get<IProject> (getRoute(route, id));
  }

  getMyProjects(route: string){
    return this.http.get<IProject[]> (getRoute(route));
  }

  create(route: string, body: IProjectDto) {
    return this.http.post<IResponseDto> (getRoute(route), body);
  }

  edit(route: string, id: string, body: IProjectDto){
    return this.http.put (getRoute(route, id), body);
  }

  delete(route: string, id: string){
    return this.http.delete (getRoute(route, id));
  }

  loadProjectDetails = (id: string): IProject => {

    let project: IProject = {id: '', name: '', description: '', sprints: []};

    this.getProjectDetails('api/project', id).subscribe(p => {
      project = p;
    });

    return project;
  }
}
