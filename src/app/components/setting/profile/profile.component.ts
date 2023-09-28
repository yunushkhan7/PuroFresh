import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
name='';

userProfile

  constructor() { }

  ngOnInit() { }

  getProfileData(profileData){
    
    this.userProfile= profileData
    console.log('datahdhdhf', this.userProfile
    )
    this.name=this.userProfile.firstName
    console.log('name',this.name)

  }

get(){


  return this.name
}

}
