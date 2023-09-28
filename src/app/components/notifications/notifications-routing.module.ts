import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PushNotificationsComponent } from './push-notifications/push-notifications.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pushnotification',
        component: PushNotificationsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PushNotificationRoutingModule { }
