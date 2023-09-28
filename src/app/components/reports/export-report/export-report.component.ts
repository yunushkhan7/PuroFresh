import { Component, OnInit } from '@angular/core';
import * as chartData from '../../../shared/data/chart';
import { reportDB } from 'src/app/shared/tables/report';
import { DatePipe } from '@angular/common';
import { ReportService } from '../../services/reports.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { ExportExcelService } from '../../services/fileupload.service';

@Component({
  selector: 'app-export-report',
  templateUrl: './export-report.component.html',
  styleUrls: ['./export-report.component.scss']
})
export class ExportReportComponent implements OnInit {
  fileName= 'ExcelSheet.xlsx';
  // public rowsOnPage = 10;
  // data: any;
  // public data: any;
  dataForExcel = [];
  exportdata:any;


  // userList = [

  //   {
    
  //   "id": 1,
    
  //   "name": "Leanne Graham",
    
  //   "username": "Bret",
    
  //   "email": "Sincere@april.biz"
    
  //   },
    
  //   {
    
  //   "id": 2,
    
  //   "name": "Ervin Howell",
    
  //   "username": "Antonette",
    
  //   "email": "Shanna@melissa.tv"
    
  //   },
    
  //   {
    
  //   "id": 3,
    
  //   "name": "Clementine Bauch",
    
  //   "username": "Samantha",
    
  //   "email": "Nathan@yesenia.net"
    
  //   },
    
  //   {
    
  //   "id": 4,
    
  //   "name": "Patricia Lebsack",
    
  //   "username": "Karianne",
    
  //   "email": "Julianne.OConner@kory.org"
    
  //   },
    
  //   {
    
  //   "id": 5,
    
  //   "name": "Chelsey Dietrich",
    
  //   "username": "Kamren",
    
  //   "email": "Lucio_Hettinger@annie.ca"
    
  //   }
    
  //   ]
  constructor(private http: HttpClient,private datePipe: DatePipe,private reportService:ReportService) {
this.reportService.getallfullreport().subscribe( data => {
this.exportdata = data
})

  }



 
  ngOnInit() {

  }

 


exportreport(){

  this.exportdata.forEach((row: any) => {
    this.dataForExcel.push(Object.values(row))
    })
    
    let reportData = {
    title: 'Contacts',
    data: this.dataForExcel,
    headers: Object.keys(this.exportdata[0])
    }
    
    new ExportExcelService().exportExcel(reportData);

}
 

}
