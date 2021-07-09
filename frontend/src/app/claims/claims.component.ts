import { Component, OnInit } from '@angular/core';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {ClaimModel} from '../models/claim.model';
import {ClaimsService} from '../services/claims.service';
import {faCheck, faSearch, faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {

  faStar = faStar;
  faSearch = faSearch;
  faCheck = faCheck;
  faDetails = faChevronDown;
  faDetailsOff = faChevronUp;

  claims: ClaimModel[] = [];
  isDetailedView: boolean[] = [];
  starredClaims: number[] = [];
  claimsFilters = {description: '', start_date: null, end_date: null, reduction: 0, partner: -1, validated: false};

  myApplications = [];
  constructor(private claimsService: ClaimsService) {
  }

  ngOnInit() {
    this.claimsService.getAllAsStudent().then(res => {
      this.claims = res;
    });
  }

  // constructor(private claimsService: ClaimsService, private applicationService: ClaimsApplicationService) { }

  // ngOnInit() {
  //   this.applicationService.getUserApplications("5fdf84440e18dc2b67e1459d").then(res => {
  //     this.myApplications = res;
  //   });
  //
  //   this.claimsService.get().then(claimsResults => {
  //     this.claims = claimsResults;
  //     for(let i = 0; i < this.claims.length; i++)
  //       this.isDetailedView.push(false);
  //   });
  //
  //   this.claimsService.getStarred().then(res => {
  //     this.starredClaims = res;
  //   })
  // }

  filter(): void{
    // this.claimsService.filter(this.claimsFilters).then(res => {
    //   this.claims = res;
    // });
  }

  unclaimAsStudent(index: number): void {
    this.claimsService.unclaimAsStudent(this.claims[index].id).then(res => {
      this.claims.splice(index, 1);
    });
  }

  toggleDetails(index: number): void
  {
    this.isDetailedView[index] = !this.isDetailedView[index];
  }

}
