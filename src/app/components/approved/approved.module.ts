import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { PushNotificationsComponent } from './push-notifications/push-notifications.component';
import { SharedModule } from '../../shared/shared.module';
// import {PushNotificationRoutingModule} from './notifications-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationsService } from '../services/notifications.service';
import { ApprovedProductComponent } from './approved-product/approved-product.component';
import { ApprovedProductRoutingModule } from './approved-routing.module';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
    declarations: [
        // PushNotificationsComponent
        ApprovedProductComponent
      ],
    imports : [
        AlifeFileToBase64Module,
        FormsModule,
        CommonModule,
        SharedModule,   
        ReactiveFormsModule,
        ApprovedProductRoutingModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        OrderModule
        // PushNotificationRoutingModule
    ],
    providers: [NotificationsService]
})

export class ApprovedProductModule { }
