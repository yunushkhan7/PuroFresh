import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorsRoutingModule } from './vendors-routing.module';
import { VendorsComponent } from './vendors/vendors.component';
import { VendorsOrderComponent } from './vendor-orders/vendor-orders';
import { CreateVendorsComponent } from './create-vendors/create-vendors.component';
import { VendorsTransactionComponent } from './vendor-transaction/vendors-transactions.component';
// import {DataTableModule} from "angular-6-datatable";
import { SharedModule } from '../../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TreeviewModule } from 'ngx-treeview';


@NgModule({
  declarations: [VendorsComponent, CreateVendorsComponent,VendorsTransactionComponent,VendorsOrderComponent],
  imports: [
    CommonModule,
    VendorsRoutingModule,
    ReactiveFormsModule,
  FormsModule,
	// DataTableModule,
  SharedModule,
  NgbModule,
    // Ng2SmartTableModule,
    TreeviewModule.forRoot()
  ]
})
export class VendorsModule { }
