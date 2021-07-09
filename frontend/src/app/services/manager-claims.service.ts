import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from './auth.service';
import {ManagerClaimModel} from '../models/manager-claim.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerClaimsService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getAll(): Promise<ManagerClaimModel[]> {
    return this.httpClient.get<ManagerClaimModel[]>('http://localhost:3000/api/manager/claims/',
      {headers: { Authorization: 'Bearer ' + this.authService.token}}).toPromise();
  }
  confirm(id: number, userId: number): Promise<ManagerClaimModel[]> {
    return this.httpClient.get<ManagerClaimModel[]>(`http://localhost:3000/api/student/claims/${id}/${userId}/confirm`,
      {headers: { Authorization: 'Bearer ' + this.authService.token}}).toPromise();
  }

  remove(id: number, userId: number): Promise<ManagerClaimModel[]> {
    return this.httpClient.delete<ManagerClaimModel[]>(`http://localhost:3000/api/student/claims/${id}/${userId}`,
      {headers: { Authorization: 'Bearer ' + this.authService.token}}).toPromise();
  }
}
