import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ngx-ckeditor';
import { CouponsRoutingModule } from './coupons-routing.module';
import { ListCouponComponent } from './list-coupon/list-coupon.component';
import { CreateCouponComponent } from './create-coupon/create-coupon.component';
import { SharedModule } from '../../shared/shared.module';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [ListCouponComponent, CreateCouponComponent],
  imports: [
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CommonModule,
    CouponsRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    CKEditorModule,
    SharedModule,
    AlifeFileToBase64Module,
     NgxPaginationModule,
    Ng2SearchPipeModule,
    OrderModule
  ],
  providers: [DatePipe]
})
export class CouponsModule { }
