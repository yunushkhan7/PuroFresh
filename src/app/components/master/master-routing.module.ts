import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { categoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: 'pushnotification',
      //   component: 
      // }

{
  path: 'category',
  component: categoryComponent
},
{
  path:'product',
  component: ProductComponent
}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
