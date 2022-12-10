import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseDto } from 'src/app/shared/interfaces/dtos/IResponseDto';
import { ITeamMemberDto } from 'src/app/shared/interfaces/dtos/ITeamMemberDto';
import { ITeamMember } from 'src/app/shared/ITeamMember';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getTeamMembers(route: string, id: string){
    return this.http.get<ITeamMember[]> (this.getRoute(route, id));
  }

  create(route: string, body: ITeamMemberDto) {
    return this.http.post<IResponseDto> (this.getRoute(route), body);
  }

  edit(route: string, id: string, body: ITeamMemberDto){
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
