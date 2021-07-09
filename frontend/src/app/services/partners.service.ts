import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PartnerModel} from '../models/partner.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getAll(): Promise<PartnerModel[]> {
    return this.httpClient.get<PartnerModel[]>('http://localhost:3000/api/partners',
      {headers: { Authorization: 'Bearer ' + this.authService.token}}).toPromise();
  }
}
