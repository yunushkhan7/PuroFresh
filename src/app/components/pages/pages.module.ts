import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ngx-ckeditor';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import {DataTableModule} from "angular-6-datatable";
import { SharedModule } from '../../shared/shared.module';


import { PagesRoutingModule } from './pages-routing.module';
import { NewsPageComponent } from './news-page/news-page.component';
import { ContentPageComponent } from './content-page/content-page.component';

@NgModule({
  declarations: [NewsPageComponent, ContentPageComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    CKEditorModule,
    // NgxDatatableModule,
    // DataTableModule,
    SharedModule
  ]
})
export class PagesModule { }
