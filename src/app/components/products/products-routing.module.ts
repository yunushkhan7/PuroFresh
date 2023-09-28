import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DigitalCategoryComponent } from './digital/digital-category/digital-category.component';
import { DigitalProductsComponent } from './digital/digital-products/digital-products.component';
import { DigitalAddComponent } from './digital/digital-add/digital-add.component';
import { ThresholdComponent } from './digital/threshold-products/threshold-products.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'digital/digital-category',
        component: DigitalCategoryComponent,
        data: {
          title: "Category",
          breadcrumb: "Category"
        }
      },
      {
        path: 'digital/digital-product-list',
        component: DigitalProductsComponent,
        data: {
          title: "Product List",
          breadcrumb: "Product List"
        }
      },
      {
        path: 'digital/digital-add-product',
        component: DigitalAddComponent,
        data: {
          title: "Add Products",
          breadcrumb: "Add Product"
        }
      },
      {
        path: 'digital/threshold-product',
        component: ThresholdComponent,
        data: {
          title: "Threshold Products",
          breadcrumb: "Threshold Product"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
