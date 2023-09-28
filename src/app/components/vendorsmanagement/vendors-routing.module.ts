import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorsComponent } from './vendors/vendors.component';
import { CreateVendorsComponent } from './create-vendors/create-vendors.component';
import { VendorsOrderComponent } from './vendor-orders/vendor-orders';
import { VendorsTransactionComponent } from './vendor-transaction/vendors-transactions.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'vendors',
        component: VendorsComponent,
        data: {
          title: "Vendors",
          breadcrumb: "Vendors"
        }
      },
      {
        path: 'vendor-transaction',
        component: VendorsTransactionComponent,
        data: {
          title: "Vendor Transactions List",
          breadcrumb: "Vendor Transactions List"
        }
      },
      {
        path: 'vendor-orders',
        component: VendorsOrderComponent,
        data: {
          title: "Vendor Orders List",
          breadcrumb: "Vendor Orders List"
        }
      },
      {
        path: 'create-vendors',
        component: CreateVendorsComponent,
        data: {
          title: "Create Vendor",
          breadcrumb: "Create Vendor"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VendorsRoutingModule { }
