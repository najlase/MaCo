import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConventionModel} from '../models/convention.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConventionsService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getAllAsStudent(): Promise<any> {
    return this.httpClient.get<any>('http://localhost:3000/api/student/conventions',
      {headers: { Authorization: 'Bearer ' + this.authService.token}}).toPromise();
  }

  getAllAsTeacher(): Promise<ConventionModel[]> {
    return this.httpClient.get<ConventionModel[]>('http://localhost:3000/api/teacher/conventions',
      {headers: { Authorization: 'Bearer ' + this.authService.token}}).toPromise();
  }

  claimAsStudent(conventionId: number): Promise<ConventionModel[]> {
    return this.httpClient.get<ConventionModel[]>('http://localhost:3000/api/student/conventions/' + conventionId + '/claim',
      {headers: { Authorization: 'Bearer ' + this.authService.token}}).toPromise();
  }

  remove(conventionId: number): Promise<any> {
    return this.httpClient.delete('http://localhost:3000/api/student/claims/:id/:userId' + conventionId + '/claim',
      {headers: { Authorization: 'Bearer ' + this.authService.token}}).toPromise();
  }
}
