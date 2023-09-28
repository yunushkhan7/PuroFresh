import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './dailyreports/reports.component';
import { ReportsComponent1 } from './fullpayment/reports.component';
import { ReportsComponent2 } from './paymentreport/reports.component'
// import { Ng2SmartTableModule } from 'ng2-smart-table';
// import {DataTableModule} from "angular-6-datatable";
import { DatePipe } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { ChartistModule } from 'ng-chartist'
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PatnershipService } from '../services/partnership.service'
import { from } from 'rxjs';

@NgModule({
  declarations: [ReportsComponent,ReportsComponent1,ReportsComponent2],
  imports: [
    // DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OwlDateTimeModule,
     OwlNativeDateTimeModule,
    CommonModule,
    ChartsModule,
    Ng2GoogleChartsModule,
    NgxChartsModule,
    // ChartistModule,
    ReportsRoutingModule,
    // Ng2SmartTableModule
  ],
  providers: [PatnershipService, DatePipe]
})
export class ReportsModule1 { }
