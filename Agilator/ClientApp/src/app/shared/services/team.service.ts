import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseDto } from 'src/app/shared/interfaces/dtos/IResponseDto';
import { ICreateTeamMemberDto } from 'src/app/shared/interfaces/dtos/TeamMember/ICreateTeamMemberDto';
import { IEditTeamMemberDto } from 'src/app/shared/interfaces/dtos/TeamMember/IEditTeamMemberDto';
import { ITeamMember } from 'src/app/shared/interfaces/ITeamMember';
import { getRoute } from './helper';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getTeamMembers(route: string, id: string){
    return this.http.get<ITeamMember[]> (getRoute(route, id));
  }

  create(route: string, body: ICreateTeamMemberDto) {
    return this.http.post<IResponseDto> (getRoute(route), body);
  }

  edit(route: string, body: IEditTeamMemberDto){
    return this.http.put (getRoute(route), body);
  }

  delete(route: string, id: string){
    return this.http.delete (getRoute(route, id));
  }
}
