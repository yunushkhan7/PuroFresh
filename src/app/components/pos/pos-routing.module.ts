import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { POSComponent } from './pointofsale/pointofsale.component';
import { POSDataComponent } from './posdata/posdata.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pointofsale',
        component: POSComponent,
        data: {
          title: "Pointofsale",
          breadcrumb: "Pointofsale"
        }
      }
    ]
  },{
    path: '',
    children: [
      {
        path: 'posdata',
        component: POSDataComponent,
        data: {
          title: "Pointofsale",
          breadcrumb: "Pointofsale"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class POSRoutingModule { }
