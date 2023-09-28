import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './components/products/products.module';
import { SalesModule } from './components/sales/sales.module';
import { CouponsModule } from './components/coupons/coupons.module';
import { PagesModule } from './components/pages/pages.module';
import { VendorsModule } from './components/vendorsmanagement/vendors.module';
import { UsersModule } from './components/users/users.module';
// import { SettingModule } from './components/setting/setting.module';;
import { ReportsModule } from './components/reports/reports.module';
import { ReportsModule1 } from './components/reports1/reports.module'
import { AuthModule } from './components/auth/auth.module';
import { from } from 'rxjs';
import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    DashboardModule,
    FormsModule,
    // ReactiveFormsModule,
    ReportsModule,
    ReportsModule1,
    AuthModule,
    SharedModule,
    ProductsModule,
    SalesModule,
    VendorsModule,
    CouponsModule,
    // PagesModule,
    UsersModule,
    // SettingModule,
    RouterModule.forRoot(routes, { useHash: true, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
