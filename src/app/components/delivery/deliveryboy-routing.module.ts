import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryBoyComponent } from './deliveryboy.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'deliveryboy',
        component: DeliveryBoyComponent,
        data: {
          title: "Delivery's Boy List",
          breadcrumb: "Delivery's Boy List"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryBoyRoutingModule { }
