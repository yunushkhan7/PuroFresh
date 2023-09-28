import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DiscountComponent } from './discount/discount.component';
import { SharedModule } from '../../shared/shared.module';
import {DiscountRoutingModule} from './discount-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import { DiscountService } from '../services/discount.service';
// import { DiscountService} from '../services/discount.service'
@NgModule({
    declarations: [
        DiscountComponent,
        // DiscountService
      ],
    imports : [
        FormsModule,
        CommonModule,
        SharedModule,   
        ReactiveFormsModule,
        DiscountRoutingModule
    ],
    providers: [DiscountService]
})

export class DiscountModule { }
