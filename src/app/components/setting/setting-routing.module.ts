import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { ReferralComponent } from './referral/referral.component'


const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: "Profile",
      breadcrumb: "Profile"
    }
  },
  {
    path: 'referral',
    component: ReferralComponent,
    data: {
      title: "Referral",
      breadcrumb: "Referral"
    }
  },
  {
    path: 'changepassword',
    component: ChangePasswordComponent,
    data: {
      title: "Referral",
      breadcrumb: "Referral"
    }
  },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
