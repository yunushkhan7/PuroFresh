import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodayOrdersComponent } from './todayorders/todayorders.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TotalOrdersComponent } from './total_orders/total_orders.component';
import { TotalTransactionsComponent } from './total_transactions/total_transactions.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'todayorders',
        component: TodayOrdersComponent,
        data: {
          title: "Today's Orders",
          breadcrumb: "Today's Orders"
        }
      },
      {
        path: 'total_orders',
        component: TotalOrdersComponent,
        data: {
          title: "Orders",
          breadcrumb: "Orders"
        }
      },
      {
        path: 'total_transactions',
        component: TotalTransactionsComponent,
        data: {
          title: "Transactions",
          breadcrumb: "Transactions"
        }
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        data: {
          title: "Today's Transactions",
          breadcrumb: "Today's Transactions"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
