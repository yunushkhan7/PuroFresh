import { Component, OnInit } from '@angular/core';
import { fadeInOutTranslate } from 'src/app/shared/service/animation';
import { ReferralDB } from '../../../shared/tables/referral';

@Component({
  selector: 'app-referral-user',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss'],
  animations: [fadeInOutTranslate]
})
export class ReferralComponent implements OnInit {

  q: any
  searchText;
  page = 1
  pageno: any = 5;

  onPageChange(pageNumber) {
    console.log('efvents', pageNumber);
    this.q = pageNumber;
  }

  onChange(data) {
    this.pageno = data;
    this.onPageChange('')
  }

  key: string = '';
  reverse: boolean = false;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse
  }


  public referralPageEditFlag = false;
  public data: any;
  // public rowsOnPage = 10;
  // public filterQuery = '';
  // public sortBy = '';
  // public sortOrder = 'desc';

  constructor() { }


  ngOnInit() {
    this.data = ReferralDB.referral;
  }

  EditContent(data) {
    this.referralPageEditFlag = true;
  }

  close() {
    this.referralPageEditFlag = false;
  }



}

