import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseDto } from '../interfaces/dtos/IResponseDto';
import { IVacationDto } from '../interfaces/dtos/Vacation/IVacationDto';
import { IVacation } from '../interfaces/IVacation';
import { getRoute } from './helper';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  constructor(private http: HttpClient) { }

  getVacations(route: string, id: string){
    return this.http.get<IVacation[]> (getRoute(route, id));
  }

  update(route: string, body: IVacationDto) {
    return this.http.post<IResponseDto> (getRoute(route), body);
  }

}
