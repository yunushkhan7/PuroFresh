import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './dailyreports/reports.component';
import { ReportsComponent1 } from './fullpayment/reports.component'
import { ReportsComponent2 } from './paymentreport/reports.component'


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'partnetshipcomp',
        component: ReportsComponent,
        data: {
          title: "Partnership Details",
          breadcrumb: "partnetship"
        }
      },
      {
        path: 'partnetshipfullcomp',
        component: ReportsComponent1,
        data: {
          title: "Partnership Full Details",
          breadcrumb: "partnetshipDetails"
        }
      },
      {
        path: 'partnetshipreportcomp',
        component: ReportsComponent2,
        data: {
          title: "Partnership Report",
          breadcrumb: "partnetshipReport"
        }
      }
    ]
  }
  // {
  //   path: '',
  //   component: ReportsComponent,
  //   data: {
  //     title: "Reports",
  //     breadcrumb: "Reports"
  //   }
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
