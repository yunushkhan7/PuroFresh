import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListInternalUserComponent } from './list-internal-user/list-internal-user.component';
import {ListReferralComponent} from './list-referral/list-referral.component'
import { RoleComponent } from './roles/roles.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'customer',
        component: CustomerComponent,
        data: {
          title: "Customer List",
          breadcrumb: "Customer List"
        }
      },
      {
        path: 'list-internal-user',
        component: ListInternalUserComponent,
        data: {
          title: "Internal User List",
          breadcrumb: "Internal User List"
        }
      },
      {
        path: 'list-referral',
        component: ListReferralComponent,
        data: {
          title: "Referral List",
          breadcrumb: "Referral List"
        }
      },
	  {
        path: 'roles',
        component: RoleComponent,
        data: {
          title: "Roles",
          breadcrumb: "Roles"
        }
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
        data: {
          title: "Create User",
          breadcrumb: "Create User"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
