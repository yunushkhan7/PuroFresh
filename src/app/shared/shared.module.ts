import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { NavService } from './service/nav.service';
import { DataFilterPipe } from './service/data-filter.pipe';
import { WINDOW_PROVIDERS } from './service/windows.service';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {ArraySortPipe} from './pipes/sort.pipe'
import {ManualFilterPipe} from './pipes/filter.pipe';
import { DemoComponent } from './demo/demo.component';
import { DiscountComponent } from './discount/discount.component'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ToggleFullscreenDirective,
    ArraySortPipe,
    FeatherIconsComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ContentLayoutComponent,
    BreadcrumbComponent,
    DataFilterPipe,
    ManualFilterPipe,
    RightSidebarComponent,
    SpinnerComponent,
    DemoComponent,
    DiscountComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    RouterModule
  ],
  providers: [NavService, WINDOW_PROVIDERS],
  exports: [FeatherIconsComponent,ManualFilterPipe, ToggleFullscreenDirective,DataFilterPipe,SpinnerComponent, ArraySortPipe]
})
export class SharedModule { }
