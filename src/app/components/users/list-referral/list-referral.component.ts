import { Component, OnInit } from '@angular/core';
import {fadeInOutTranslate} from 'src/app/shared/service/animation';

@Component({
  selector: 'app-referral-user',
  templateUrl: './list-referral.component.html',
  styleUrls: ['./list-referral.component.scss'],
  animations: [fadeInOutTranslate]
})
export class ListReferralComponent implements OnInit {
  

  constructor() {
   
  }

 
  ngOnInit() {
  }

 

}

