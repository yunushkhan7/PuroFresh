import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UsersRoutingModule } from './users-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { ListInternalUserComponent } from './list-internal-user/list-internal-user.component';
import { RoleComponent } from './roles/roles.component';
import { CreateUserComponent } from './create-user/create-user.component';
import {ListReferralComponent} from './list-referral/list-referral.component'
// import {DataTableModule} from "angular-6-datatable";
import { FormsModule } from '@angular/forms';
import { TreeviewModule } from 'ngx-treeview';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import {CustomerService} from '../services/customer.service';
import {RoleUserService} from '../services/roleuser.service';
import { VendorService } from '../services/vendor.service';
// import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [CustomerComponent, CreateUserComponent, RoleComponent,ListInternalUserComponent,ListReferralComponent],
  imports: [
    CommonModule,
    NgbModule,
    // Ng2SmartTableModule,
    ReactiveFormsModule,
	  FormsModule,
	  // DataTableModule,
  	SharedModule,
    UsersRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    OrderModule,
    TreeviewModule.forRoot()
   
  ],
  providers: [CustomerService, RoleUserService, VendorService]
})
export class UsersModule { }
