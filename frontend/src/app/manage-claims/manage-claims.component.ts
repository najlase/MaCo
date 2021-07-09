import { Component, OnInit } from '@angular/core';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {ClaimModel} from '../models/claim.model';
import {ClaimsService} from '../services/claims.service';
import {faCheck, faSearch, faStar} from '@fortawesome/free-solid-svg-icons';
import {ManagerClaimsService} from '../services/manager-claims.service';
import {ManagerClaimModel} from '../models/manager-claim.model';

@Component({
  selector: 'app-manage-claims',
  templateUrl: './manage-claims.component.html',
  styleUrls: ['./manage-claims.component.css']
})
export class ManageClaimsComponent implements OnInit {

  faStar = faStar;
  faSearch = faSearch;
  faCheck = faCheck;
  faDetails = faChevronDown;
  faDetailsOff = faChevronUp;

  claims: ManagerClaimModel[] = [];
  isDetailedView: boolean[] = [];
  starredClaims: number[] = [];
  claimsFilters = {description: '', start_date: null, end_date: null, reduction: 0, partner: -1, validated: false};

  myApplications = [];
  constructor(private claimsService: ManagerClaimsService) {
  }

  ngOnInit() {
    this.claimsService.getAll().then(res => {
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

  validate(index: number): void {
    this.claimsService.confirm(this.claims[index].id, this.claims[index].personID).then(res => {
      this.claims[index].validated = true;
    });
  }

  remove(index: number): void {
    this.claimsService.remove(this.claims[index].id, this.claims[index].personID).then(res => {
      this.claims.splice(index, 1);
    });
  }

  alreadyApplied(index: number): boolean {
    // const x = this.myApplications.filter(app => app.ClaimId === this.claims[index].id);
    // return x.length > 0;
    return false;
  }

  toggleDetails(index: number): void
  {
    this.isDetailedView[index] = !this.isDetailedView[index];
  }

}
