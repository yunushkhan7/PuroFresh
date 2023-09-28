import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PushNotificationsComponent } from './push-notifications/push-notifications.component';
import { SharedModule } from '../../shared/shared.module';
import {PushNotificationRoutingModule} from './notifications-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationsService } from '../services/notifications.service';

@NgModule({
    declarations: [
        PushNotificationsComponent
      ],
    imports : [
        FormsModule,
        CommonModule,
        SharedModule,   
        ReactiveFormsModule,
        PushNotificationRoutingModule
    ],
    providers: [NotificationsService]
})

export class PushNotificationsModule { }
