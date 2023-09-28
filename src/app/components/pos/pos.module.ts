import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DataTableModule } from "angular-6-datatable";
import { POSRoutingModule } from '../pos/pos-routing.module';
import { POSComponent } from './pointofsale/pointofsale.component';
import { POSDataComponent } from './posdata/posdata.component';
import { SharedModule } from '../../shared/shared.module';
import { POSService } from '../services/pos.service';
import {ProductService} from '../services/product.service'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [POSComponent, POSDataComponent],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // DataTableModule,
    POSRoutingModule,
    SharedModule,
  ],
  providers: [ POSService, ProductService ]
})

export class POSModule { }
