import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovedProductComponent } from './approved-product/approved-product.component';
// import { PushNotificationsComponent } from './push-notifications/push-notifications.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'approvedproduct',
        component: ApprovedProductComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  ApprovedProductRoutingModule { }
