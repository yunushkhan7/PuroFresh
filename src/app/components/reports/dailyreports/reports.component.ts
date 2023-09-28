import { Component, OnInit } from '@angular/core';
import * as chartData from '../../../shared/data/chart';
import { reportDB } from 'src/app/shared/tables/report';
import { DatePipe } from '@angular/common';
import { ReportService } from '../../services/reports.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public report = [];
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public typeofsale = "offline";
  public selectedMoments = [new Date(), new Date()];
  public selectendDate: any;
  public fulldate: any;
  public sendData:  any;
  public StartDate: string;
  public EndDate: string;
  public online: any = [];
  public offline: any = [];
  public data2: any;
  public order: any = [];
  public totalcost: any;
  public onlinamount: any;
  public offlineamount: any;
  public totalsalesamount: any;
  public editData: any = [];

  constructor(private datePipe: DatePipe,private reportService:ReportService) {
    this.report = reportDB.report;
  }

  // lineChart
  public salesChartData = chartData.salesChartData;
  public salesChartLabels = chartData.salesChartLabels;
  public salesChartOptions = chartData.salesChartOptions;
  public salesChartColors = chartData.salesChartColors;
  public salesChartLegend = chartData.salesChartLegend;
  public salesChartType = chartData.salesChartType;

  public areaChart1 = chartData.areaChart1;
  public columnChart1 = chartData.columnChart1;
  public lineChart = chartData.lineChart;

  public chart5 = chartData.chart6

  public settings = {
    actions: {
      position: 'right'
    },
    columns: {
      name: {
        title: 'Name',
      },
      id: {
        title: 'Transfer Id',
        type: 'html'
      },
      date: {
        title: 'Date'
      },
      total: {
        title: 'Total'
      },
    },
  };

  ngOnInit() {
    const createdDate = new Date();
    const latest_date = this.datePipe.transform(createdDate, 'dd-MM-yyyy');
    this.getdata(latest_date,latest_date)
    //console.log(latest_date)
    //this.selected.startDate = Date();
    //this.selected.endDate = Date();
  }

  public getdata(sd,ed){
    this.reportService.getAllsales(sd,ed).subscribe(data => {
      console.log(data);
      this.data2 = data;
      this.totalsalesamount = this.data2.allSalesTotalAmt;
      this.online  = this.data2.onlineReport;
      this.offline = this.data2.offlineReport;
      // for(let data of this.data2){
      //   if(data.saleType == "Online"){
      //     this.online = data;
      //   }
      //   if(data.saleType == "Offline"){
      //     this.offline = data;
      //   }
      // }
      //console.log(this.online);
      //console.log(this.offline);
      this.typeofsale = "offline";
      this.totalcost = this.offline.tolalAmount;
      this.order = this.offline.reportist;
      this.offlineamount = this.offline.paymentDetailsoffline;
      this.onlinamount = this.online.paymentDetailsonline;
    })
  }

  public editposdata(data){
      this.editData = data.productDetails;
  }



  public onChange(data){
    console.log(data.target.value);
    this.order = [];
    if(data.target.value == "offline"){
      this.typeofsale = "offline";
      this.totalcost = this.offline.tolalAmount;
      this.order = this.offline.reportist;
    }
    if(data.target.value == "online"){
      this.typeofsale = "online";
      this.totalcost = this.online.tolalAmount;
      this.order = this.online.reportist;
    }
  }

  SelectDaterange(event) {
    const selectstartDate = event[0];
    if(event[1] != null) {
      this.selectendDate = event[1]
    } else  {
      this.selectendDate = selectstartDate
    }

    let startdate = selectstartDate.getDate();
    let startmonth = selectstartDate.getMonth() + 1; 
    const startyear = selectstartDate.getFullYear()

    if(startdate < 10) {
      startdate = "0" + startdate;
    }

    if(startmonth < 10) {
      startmonth = "0" + startmonth;
    }

    let enddate =  this.selectendDate.getDate();
    let endmonth =  this.selectendDate.getMonth() + 1; 
    const endyear =  this.selectendDate.getFullYear()

    if(enddate < 10) {
      enddate = "0" + enddate;
    }

    if(endmonth < 10) {
      endmonth = "0" + endmonth;
    }
    
    this.EndDate = enddate + '-' + endmonth + '-' + endyear;
    this.StartDate = startdate + '-' + startmonth + '-' + startyear;
      console.log(this.EndDate, this.StartDate)
    this.getdata(this.StartDate, this.EndDate);
  }

}
