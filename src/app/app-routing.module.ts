import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { content } from './shared/routes/content-routes';
import { ContentLayoutComponent } from './shared/layout/content-layout/content-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import {AuthGuard} from './components/auth/guards/auth.guard';
import {AuthService} from './components/auth/guards/auth.service';
import { DemoComponent } from './shared/demo/demo.component';
import { DiscountComponent } from './shared/discount/discount.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: content,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'shared/demo',
    component: DemoComponent
  },
  {
    path: 'shared/discount',
    component: DiscountComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService]
})
export class AppRoutingModule { }
