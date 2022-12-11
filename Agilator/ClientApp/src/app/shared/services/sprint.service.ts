import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseDto } from '../interfaces/dtos/IResponseDto';
import { ICreateSprintDto } from '../interfaces/dtos/Sprint/ICreateSprintDto';
import { IEditSprintDto } from '../interfaces/dtos/Sprint/IEditSprintDto';
import { ISprint } from '../interfaces/ISprint';
import { getRoute } from './helper';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private http: HttpClient) { }

  getSprint(route: string, id: string){
    return this.http.get<ISprint> (getRoute(route, id));
  }

  getSprints(route: string, id: string){
    return this.http.get<ISprint[]> (getRoute(route, id));
  }

  create(route: string, body: ICreateSprintDto) {
    return this.http.post<IResponseDto> (getRoute(route), body);
  }

  edit(route: string, body: IEditSprintDto){
    return this.http.put (getRoute(route), body);
  }

  delete(route: string, id: string){
    return this.http.delete (getRoute(route, id));
  }
}
