import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateManifestComponent } from './generate-manifest/generate-manifest.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'generatemanifest',
        component: GenerateManifestComponent,
        data: {
          title: "GenerateManifest",
          breadcrumb: "GenerateManifest"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManifestManagementRoutingModule { }
