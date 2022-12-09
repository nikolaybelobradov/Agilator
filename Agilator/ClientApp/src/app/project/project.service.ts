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

  readonly _url = `${environment.baseUrl}/project`

  constructor(private http: HttpClient) { }

  getProjectDetails(route: string, id: string){

    var asd = this.getRoute(route, id);
    
    return this.http.get<IProject> (this.getRoute(route, id));
  }

  getMyProjects(route: string){
    return this.http.get<IProject[]> (this.getRoute(route));
  }

  create(route: string, body: IProjectDto) {
    return this.http.post<IResponseDto> (this.getRoute(route), body);
  }

  private getRoute = (route: string, id?: string) => {

    if(id !== undefined) return `${environment.baseUrl}/${route}/${id}`;

    return `${environment.baseUrl}/${route}`;
  }
}
