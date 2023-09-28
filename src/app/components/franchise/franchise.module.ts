import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationsService } from '../services/notifications.service';
import { FranchiseRoutingModule } from './franchise-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { UploadComponent } from './upload/upload.component';
import { RegistrationService } from '../services/registration.service';
import { UploadService } from '../services/upload.service';
import { AssignProductComponent } from './assign/assign-product.component';
import { TreeviewModule } from 'ngx-treeview';
import { AssignService } from '../services/assign.service';
import { UserComponent } from './user/user.component';
import { UserService } from '../services/user.service';
import { FranchiseUserService } from '../services/franchiseuser.service';
import { ProductsComponent } from './product/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
@NgModule({
    declarations: [
        RegistrationComponent,
        UploadComponent,
        AssignProductComponent,
        UserComponent,
        ProductsComponent,
        CategoriesComponent
    ],

    imports: [
        FormsModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        FranchiseRoutingModule,
        TreeviewModule.forRoot(),
        NgxPaginationModule,
        Ng2SearchPipeModule,
        OrderModule
    ],
    providers: [RegistrationService, UploadService, AssignService, FranchiseUserService]
})

export class FranchiseModule { }
