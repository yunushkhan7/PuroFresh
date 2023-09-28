import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationsService } from '../services/notifications.service';
import { UploadFileComponent } from './uploadfile/uploadfile.component';
import { UploadRoutingModule } from './upload-routing.module';


@NgModule({
    declarations: [
        UploadFileComponent
      ],
    imports : [
        FormsModule,
        CommonModule,
        SharedModule,   
        ReactiveFormsModule,
        UploadRoutingModule
    ],
    providers: []
})

export class UploadModule { }
