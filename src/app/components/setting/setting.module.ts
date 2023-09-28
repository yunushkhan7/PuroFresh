import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ngx-ckeditor';
import { SettingRoutingModule } from './setting-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ReferralComponent } from './referral/referral.component'
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [ProfileComponent, ReferralComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    SettingRoutingModule,
    SharedModule,
    CKEditorModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    OrderModule

  ]
})
export class SettingModule { }
