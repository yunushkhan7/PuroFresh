import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './dailyreports/reports.component';
import { ExportReportComponent } from './export-report/export-report.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dailyreports',
        component: ReportsComponent,
        data: {
          title: "Daily Reports",
          breadcrumb: "dailyreports"
        }
      },
      {
        path: 'fileupload',
        component: FileUploadComponent,
      
      },
      {
        path: 'exportreport',
        component: ExportReportComponent,
      
      }
    
   
      
    ]
  }
  // {
  //   path: '',
  //   component: ReportsComponent,
  //   data: {
  //     title: "Reports",
  //     breadcrumb: "Reports"
  //   }
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
