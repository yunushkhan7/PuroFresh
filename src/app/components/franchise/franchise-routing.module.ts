import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignProductComponent } from './assign/assign-product.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './product/products.component';
import { RegistrationComponent} from './registration/registration.component';
import { UploadComponent } from './upload/upload.component';
import { UserComponent } from './user/user.component';
const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: 'pushnotification',
      //   component: 
      // }
{
  path: 'registration',
  component: RegistrationComponent
},
{
  path: 'upload',
  component: UploadComponent
},

{
  path: 'assignproduct',
  component: AssignProductComponent
},

{
  path: 'user',
  component: UserComponent
},

{
  path: 'products',
  component: ProductsComponent
},


{
  path: 'categories',
  component: CategoriesComponent
}


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranchiseRoutingModule { }
