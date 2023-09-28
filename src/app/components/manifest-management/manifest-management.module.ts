import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DataTableModule } from "angular-6-datatable";
import { ManifestManagementRoutingModule } from '../manifest-management/manifest-management-routing.module';
import { GenerateManifestComponent } from './generate-manifest/generate-manifest.component';
import { SharedModule } from '../../shared/shared.module';
import { ManifestService } from '../services/manifest.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [GenerateManifestComponent],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // DataTableModule,
    ManifestManagementRoutingModule,
    SharedModule,
  ],
  providers: [ ManifestService]
})

export class ManifestManagementModule { }
