import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationsService } from '../services/notifications.service';
import { RegistrationService } from '../services/registration.service';
import { UploadService } from '../services/upload.service';
import { categoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { MasterRoutingModule } from './master-routing.module';
import { MasterproductService } from '../services/masterproduct.service';
import { MasterCategoryService } from '../services/mastercategory.service';
// import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {DataTableModule} from "angular-6-datatable";
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
    declarations: [
        categoryComponent,
        ProductComponent

    ],
    imports: [
        FormsModule,
        CommonModule,
        AlifeFileToBase64Module,
        // Ng2SmartTableModule,
        // DataTableModule,
        NgbModule,
        SharedModule,
        ReactiveFormsModule,
        MasterRoutingModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        OrderModule

    ],
    providers: [MasterproductService, MasterCategoryService, NgbActiveModal,

    ]
})

export class MasterModule {

}
