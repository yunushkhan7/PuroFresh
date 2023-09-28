import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CKEditorModule } from 'ngx-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {DataTableModule} from "angular-6-datatable";

import { ProductsRoutingModule } from './products-routing.module';
import { DigitalCategoryComponent } from './digital/digital-category/digital-category.component';
import { DigitalProductsComponent } from './digital/digital-products/digital-products.component';
import { DigitalAddComponent } from './digital/digital-add/digital-add.component';
import { ThresholdComponent } from './digital/threshold-products/threshold-products.component';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { SharedModule } from '../../shared/shared.module';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { PromotionService } from '../services/promotion.service';
import { NgxBarcodeModule } from 'ngx-barcode';

import 'hammerjs';
import 'mousetrap';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};



@NgModule({
  declarations: [DigitalCategoryComponent,
    DigitalProductsComponent,
    DigitalAddComponent,
    ThresholdComponent
  ],
  imports: [
    AlifeFileToBase64Module,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // NgxBarcodeModule, 
    CKEditorModule,
    ProductsRoutingModule,
    // Ng2SmartTableModule,
    // DataTableModule,
    NgbModule,
    DropzoneModule,
    SharedModule,
    GalleryModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    OrderModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    NgbActiveModal,
    CategoryService,
    ProductService,
    PromotionService
  ]
})
export class ProductsModule { }
