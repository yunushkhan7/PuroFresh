import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { Ng2SmartTableModule } from 'ng2-smart-table';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import {DataTableModule} from "angular-6-datatable";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountToModule } from 'angular-count-to';

import { SalesRoutingModule } from './sales-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TodayOrdersComponent } from './todayorders/todayorders.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TotalOrdersComponent } from './total_orders/total_orders.component';
import { TotalTransactionsComponent } from './total_transactions/total_transactions.component';
import {OrderService} from '../services/order.service';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ManifestService } from '../services/manifest.service';

@NgModule({
  declarations: [
    TodayOrdersComponent, 
    TransactionsComponent,
    TotalOrdersComponent, 
    TotalTransactionsComponent
  ],
  imports: [
  //  NgxDaterangepickerMd.forRoot(),
    OwlDateTimeModule,
     OwlNativeDateTimeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SalesRoutingModule,
    // Ng2SmartTableModule,
    CountToModule,
	  // DataTableModule,
	  SharedModule,
    // NgxDatatableModule
  ],
  providers: [OrderService, ManifestService]
})
export class SalesModule { }
