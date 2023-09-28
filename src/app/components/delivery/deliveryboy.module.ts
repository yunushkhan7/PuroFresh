import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryBoyComponent } from './deliveryboy.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import {DeliveryBoyService} from '../services/deliveryboy.service';
import { DeliveryBoyRoutingModule } from './deliveryboy-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [DeliveryBoyComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
	  FormsModule,
  	SharedModule,
    DeliveryBoyRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    OrderModule
  ],
  providers: [DeliveryBoyService]
})
export class DeliveryBoyModule { }
