import { Component, OnInit } from '@angular/core';
import {PartnerModel} from '../models/partner.model';
import {PartnersService} from '../services/partners.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  partners: PartnerModel[] = [];
  constructor(private partnersService: PartnersService) { }

  ngOnInit(): void {
    this.partnersService.getAll().then(res => {
      this.partners = res;
    });
  }

}
