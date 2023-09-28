import { Component, OnInit } from '@angular/core';
import * as chartData from '../../../shared/data/chart';
import { reportDB } from 'src/app/shared/tables/report';
import { DatePipe } from '@angular/common';
import { PatnershipService } from '../../services/partnership.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent1 implements OnInit {
  public report = [];
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public typeofsale = "Month";
  public date = new Date(); 
  public selectedMoments = [new Date(this.date.getFullYear(), this.date.getMonth(), 1), new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0)];
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
  public startdate: any;
  public enddate: any;
  public id: any;

  constructor(private datePipe: DatePipe,private partneshipService:PatnershipService) {
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
  public innertabledata : any = [];
  public dataformodal : any;

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
    var dateforsending = new Date();
    this.startdate =  new Date(this.date.getFullYear(), this.date.getMonth(), 1)
    this.enddate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0)
    this.StartDate = this.datePipe.transform(this.startdate, 'MM-dd-yyyy');
    this.EndDate = this.datePipe.transform(this.enddate, 'MM-dd-yyyy');
    //console.log(this.StartDate)
    //console.log(this.EndDate)
    this.getdata(this.StartDate,this.EndDate)
    //console.log(latest_date)
    //this.selected.startDate = Date();
    //this.selected.endDate = Date();
  }

  public getdata(sd,ed){
    this.partneshipService.getAlldetailsfortow(sd,ed).subscribe(data => {
      console.log(data);
      var datafortable;
      datafortable = data;
      this.totalsalesamount = datafortable.totalAmount
      this.data2 = datafortable.paymentAmtDetails;
      for(let dataforpaid of this.data2){
        dataforpaid.flag = dataforpaid.isPaymentPaid
      }
    })
  }

  public editposdata(data){
      const createdDate = new Date();
      const latest_date = this.datePipe.transform(createdDate, 'MM-01-yyyy');
      const latest_date1 = this.datePipe.transform(createdDate, 'MM-30-yyyy');
      this.getmonthvicedata(data.partnerDetailsId,latest_date,latest_date1);
      this.typeofsale = "Month";
      this.StartDate = latest_date;
      this.EndDate = latest_date1;
      this.id = data.partnerDetailsId;
  }

  public getmonthvicedata(id,st,ed){
    this.partneshipService.geteachdetails(id,st,ed).subscribe(data => {
      console.log(data);
      this.dataformodal = data;
      this.innertabledata = this.dataformodal.transactions;
    })
  }

  public getcustomervicedata(id,st,ed){
    this.partneshipService.geteachcustomerdetails(id,st,ed).subscribe(data => {
      console.log(data);
      this.dataformodal = data;
      this.innertabledata = data;
    })
  }



  public onChange(data){
    console.log(data.target.value);
    this.order = [];
    if(data.target.value == "Month"){
      this.typeofsale = "Month";
      this.getmonthvicedata(this.id,this.StartDate,this.EndDate)
    }
    if(data.target.value == "Customer"){
      this.typeofsale = "Customer";
      this.getcustomervicedata(this.id,this.StartDate,this.EndDate)
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
    
    this.EndDate = endmonth + '-' +  enddate+ '-' + endyear;
    this.StartDate = startmonth + '-' +  startdate + '-' + startyear;
      console.log(this.EndDate, this.StartDate)
      this.getdata(this.StartDate,this.EndDate)
      // if(this.typeofsale == 'Month'){
      //   this.getmonthvicedata(this.id,this.StartDate,this.EndDate)
      // }
      // if(this.typeofsale == 'Customer'){
      //   this.getcustomervicedata(this.id,this.StartDate,this.EndDate)
      // }
  }

  submitthetransaction(){
    console.log(this.data2);
    var ids = [];
    for(let data4 of this.data2){
      if(data4.isPaymentPaid == true){
        const datafor =  {
          "partnerDetailsId": data4.partnerData.partnerDetailsId,
         }
        ids.push(datafor)
      }
    }
    const datatosend = ids
    console.log(datatosend)
     this.partneshipService.senddatatotransactionMonthly(datatosend).subscribe(data => {
       console.log(data);
       this.getdata(this.StartDate,this.EndDate)
     })
  }

  checkboxfunction(e){
    //console.log(e.target.checked)
    if(e.target.checked){
      for(let data4 of this.data2){
        data4.isPaymentPaid = true;
      }
    }else{
      for(let data4 of this.data2){
        data4.isPaymentPaid = false;
      }
    }
  }

}
