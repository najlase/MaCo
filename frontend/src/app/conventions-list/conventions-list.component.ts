import { Component, OnInit } from '@angular/core';
import {ConventionModel} from '../models/convention.model';
import {faCheck, faChevronDown, faChevronUp, faSearch, faStar} from '@fortawesome/free-solid-svg-icons';
import {ConventionsService} from '../services/conventions.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-conventions-list',
  templateUrl: './conventions-list.component.html',
  styleUrls: ['./conventions-list.component.css']
})
export class ConventionsListComponent implements OnInit {

  faStar = faStar;
  faSearch = faSearch;
  faCheck = faCheck;
  faDetails = faChevronDown;
  faDetailsOff = faChevronUp;

  conventions: ConventionModel[] = [];
  isDetailedView: boolean[] = [];
  starredConventions: number[] = [];
  conventionsFilters = {description: '', start_date: null, end_date: null, reduction: 0, partner: -1};

  myApplications = [];
  constructor(private conventionsService: ConventionsService, public authService: AuthService) {
  }

  ngOnInit() {
    this.conventionsService.getAllAsStudent().then(res => {
      this.conventions = res;
    });
  }

  filter(): void{
    // this.conventionsService.filter(this.conventionsFilters).then(res => {
    //   this.conventions = res;
    // });
  }

  claim(index: number): void {
    this.conventionsService.claimAsStudent(this.conventions[index].id).then(res => {
      this.conventions.splice(index, 1);
    });
  }

  remove(index: number): void {
    this.conventionsService.remove(this.conventions[index].id).then(res => {
      this.conventions.splice(index, 1);
    });
  }

  alreadyApplied(index: number): boolean {
    // const x = this.myApplications.filter(app => app.ConventionId === this.conventions[index].id);
    // return x.length > 0;
    return false;
  }

  toggleDetails(index: number): void
  {
    this.isDetailedView[index] = !this.isDetailedView[index];
  }

  star(index: number): void
  {
    // this.conventionsService.star(this.conventions[index]._id).then(res => {
    //   const i = this.starredConventions.findIndex(el => el === this.conventions[index]._id);
    //   console.log(i);
    //   if(i === -1){
    //     this.starredConventions.push(this.conventions[index]._id);
    //   }
    //   else{
    //     this.starredConventions.splice(i, 1);
    //   }
    // })
  }

  isStarred(index: number): boolean{
    return this.starredConventions && this.starredConventions.includes(this.conventions[index].id);
  }

}
