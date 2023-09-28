import { Component,Output, OnInit,EventEmitter  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReportService } from '../../services/reports.service'
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExportExcelService } from '../../services/fileupload.service';
// const ExportExcelService = require('../../services/fileupload.service');
import { ThrowStmt } from '@angular/compiler';
// import { title } from 'process';
import swal from 'sweetalert2';



@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})


export class FileUploadComponent implements OnInit {
  // showMsg: boolean = false;
  fileName = 'ExcelSheet.xlsx';
  table = false;
  public progress: number;
  public message: string;
  public data1:any
  dataForExcel = [];
  pincodeDeliveryCharges:any;


    @Output() public onUploadFinished = new EventEmitter();

  uploadForm: FormGroup;  
  constructor(private reportService:ReportService,private formBuilder: FormBuilder) {
    // this.report = reportDB.report;
    this.reportService.getalldata().subscribe(result=>{
      console.log('resultforexcel',result);
      this.pincodeDeliveryCharges=result;
    })
  }

 

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
   
  }

 









  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

 

  public uploadFile = (files) => {
    if (files.length === 0) {
    return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    const headers = new HttpHeaders({'Content-Type': 'application/json','responseType':'text'});
    this.reportService.uploadFile(formData)
    .subscribe(res => {
    if(res=="Successfully Uploaded"){

      // this.showMsg = true;
      swal.fire({
        title: 'File Upload',
        text: 'Your file uploaded Successfully!',
        icon: 'success'
      });
      
    console.log(res);
    }
    
    });
    
    
    }



    exportToExcel() {

      this.pincodeDeliveryCharges.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row))
      })
      
      let reportData = {
      title: 'PincodeCharges',
      data: this.dataForExcel,
      headers: Object.keys(this.pincodeDeliveryCharges[0])
      }
      
      new ExportExcelService().exportExcel(reportData);
      }
      }



