import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadFileComponent } from './uploadfile/uploadfile.component';
const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: 'pushnotification',
      //   component: 
      // }

{
  path: 'uploadfile',
  component: UploadFileComponent
}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
