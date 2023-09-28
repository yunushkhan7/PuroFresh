import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsPageComponent } from './news-page/news-page.component';
import { ContentPageComponent } from './content-page/content-page.component';
import { DemoComponent } from 'src/app/shared/demo/demo.component';
import { DiscountComponent } from 'src/app/shared/discount/discount.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'news-page',
        component: NewsPageComponent,
        data: {
          title: "News",
          breadcrumb: "News"
        }
      },
      {
        path: 'content-page',
        component: ContentPageComponent,
        data: {
          title: "Content",
          breadcrumb: "Content"
        }
      },
      {
        path: 'demo', component: DemoComponent
      },
      {
        path: 'discount', component: DiscountComponent
      }
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
