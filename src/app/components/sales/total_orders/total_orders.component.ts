import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { OrderService } from '../../services/order.service';
import Swal from 'sweetalert2';
import { ManifestService } from '../../services/manifest.service';

@Component({
  selector: 'app-total_orders',
  templateUrl: './total_orders.component.html',
  styleUrls: ['./total_orders.component.scss']
})
export class TotalOrdersComponent implements OnInit {

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  public order: any;
  public temp = [];
  public showlist = false;
  public title : string;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  orderLocation: any
  orderstatus: any;
  getdata = {
    "startDate" : '',
    "endDate": '',
    "orderStatus": ''
  }
  selected: any;
  fulldate: any;
  sendData:  any;
  StartDate: string;
  EndDate: string;
  editOrderData: any;
  currentdate1: string;
  currentmonth1: string;
  selectendDate: any;
  orderno: any = 0;
  Deliveryno: any = 0;
  Progressno: any = 0;
  Confirmedno: any = 0;
  Intransitno: any = 0;
  Manifestno: any = 0;
  spinner = false;
  orderArrayData: any[];
  orderselectedlength: any[];
  clickitem: any;
  orderInvoiceId: any;
  orderConfirmstatus: any;
  extendDate: Date;
  enddate1: string;
  endmonth1: string;
  allsots: any;
  isfullfilledData: any = [];
  slotsarrayData: any= [];
  TotalordersData: any;
  checked: boolean = false;
  Cancelledno: any = 0;

  constructor(public orderService: OrderService, public manifestService: ManifestService) { }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.order = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  ngOnInit() {
      this.loadAllData();
      this.loadRDdata();
      this.loadFFdata();
      this.loadDDdata();
      this.loadCCdata();
      this.loadMGdata();
      this.loadOCdata();
      this.getslots();
      this.getAllstatus();
  }

  refreshData() {
    setTimeout(() => {
      this.loadAllData();
      this.loadRDdata();
      this.loadFFdata();
      this.loadDDdata();
      this.loadCCdata();
      this.loadMGdata();
      this.loadOCdata();
    }, 1000);
  }

  getAllstatus(){
    this.orderService.getorderstatus()
    .subscribe(data => {
      this.orderstatus = data;
    });
  }

  loadAllData () {
    this.spinner = true;
    const currentDate = new Date();
    let ms = new Date().getTime() + (1000 * 60 * 60 * 24)*7;
    let sevendaysDate = new Date(ms);
    console.log(sevendaysDate)
    let currentdate = currentDate.getDate();
    let currentmonth = currentDate.getMonth() + 1; 
    const currentyear = currentDate.getFullYear()
    if(currentdate < 10) {
      this.currentdate1 = currentdate.toString();
      this.currentdate1 = "0" + this.currentdate1;
    } else {
      this.currentdate1 = currentdate.toString();
    }

    if(currentmonth < 10) {
      this.currentmonth1 = currentmonth.toString();
      this.currentmonth1 = "0" + this.currentmonth1;
    } else {
      this.currentmonth1 = currentmonth.toString();
    }
    this.StartDate = this.currentdate1 + '-' + this.currentmonth1 + '-' + currentyear;

  let enddate =  sevendaysDate.getDate();
  let endmonth =  sevendaysDate.getMonth() + 1; 
  const endyear =  sevendaysDate.getFullYear()

  if(enddate < 10) {
    this.enddate1 = enddate.toString();
    this.enddate1 = "0" + this.enddate1;
  } else {
    this.enddate1 = enddate.toString();
  }

  if(endmonth < 10) {
    this.endmonth1 = endmonth.toString();
    this.endmonth1 = "0" + this.endmonth1;
  } else {
    this.endmonth1 = endmonth.toString();
  }
  
  this.EndDate = this.enddate1 + '-' + this.endmonth1 + '-' + endyear;
    this.title = "Orders";
    this.sendData = {
      "startDate": this.StartDate,
      "endDate": this.EndDate
      }
    this.orderService.GetTodaysData(this.sendData)
    .subscribe( data => {
      this.spinner = false;
      this.order = data;
      this.TotalordersData = data;
      this.orderno = this.order.length;
    });
  }

  loadCCdata() {
    this.order = [];
    this.sendData = {
      "startDate": this.StartDate,
      "endDate": this.EndDate,
      "statusCode": "CN"
    }
    this.orderService.GetTodaysData(this.sendData)
    .subscribe( data => {
      this.order = data;
      this.Confirmedno = this.order.length;
    });
    
  }

  loadFFdata() {
    this.sendData = {
      "startDate": this.StartDate,
      "endDate": this.EndDate,
      "statusCode": "FF"
    }
    this.orderService.GetTodaysData(this.sendData)
    .subscribe( data => {
      this.spinner = false;
      this.order = data;
      this.TotalordersData = data;
      this.Progressno = this.order.length;
    });
  }

  loadRDdata() {
    this.order = [];
    const currentDate = new Date();
    let currentdate = currentDate.getDate();
    let currentmonth = currentDate.getMonth() + 1; 
    const currentyear = currentDate.getFullYear()

    if(currentdate < 10) {
      this.currentdate1 = currentdate.toString();
      this.currentdate1 = "0" + this.currentdate1;
    } else {
      this.currentdate1 = currentdate.toString();
    }

    if(currentmonth < 10) {
      this.currentmonth1 = currentmonth.toString();
      this.currentmonth1 = "0" + this.currentmonth1;
    } else {
      this.currentmonth1 = currentmonth.toString();
    }
    this.fulldate = this.currentdate1 + '-' + this.currentmonth1 + '-' + currentyear;
    this.sendData = {
      "startDate": this.StartDate,
      "endDate": this.EndDate,
      "statusCode": "RD"
    }
    this.spinner = true;
    this.orderService.GetTodaysData(this.sendData)
    .subscribe( data => {
      this.spinner = false;
      this.order = data;
      this.Intransitno = this.order.length;
    });
  }

  loadMGdata() {
   this.order = [];
    const currentDate = new Date();
    let currentdate = currentDate.getDate();
    let currentmonth = currentDate.getMonth() + 1; 
    const currentyear = currentDate.getFullYear()

    if(currentdate < 10) {
      this.currentdate1 = currentdate.toString();
      this.currentdate1 = "0" + this.currentdate1;
    } else {
      this.currentdate1 = currentdate.toString();
    }

    if(currentmonth < 10) {
      this.currentmonth1 = currentmonth.toString();
      this.currentmonth1 = "0" + this.currentmonth1;
    } else {
      this.currentmonth1 = currentmonth.toString();
    }
    this.fulldate = this.currentdate1 + '-' + this.currentmonth1 + '-' + currentyear;
    this.sendData = {
      "startDate": this.StartDate,
      "endDate": this.EndDate,
      "statusCode": "MG"
    }
    this.orderService.GetTodaysData(this.sendData)
    .subscribe( data => {
      this.order = data;
      this.Manifestno = this.order.length;
    });
    
  }

  loadDDdata() {
    this.sendData = {
      "startDate": this.StartDate,
      "endDate": this.EndDate,
      "statusCode": "D"
    };
    this.orderService.GetTodaysData(this.sendData)
    .subscribe( data => {
      this.spinner = false;
      this.order = data;
      this.TotalordersData = data;
      this.Deliveryno = this.order.length;
    });
  }

  loadOCdata() {
    this.sendData = {
      "startDate": this.StartDate,
      "endDate": this.EndDate,
      "statusCode": "OC"
    };
    this.orderService.GetTodaysData(this.sendData)
    .subscribe( data => {
      this.order = data;
      this.TotalordersData = data;
      this.Cancelledno = this.order.length;
    });
    
  }

  getslots() {
    this.manifestService.getAllslots()
    .subscribe( data => {
      this.allsots = data;
    })
  }
  
  public ordersview(orderInvoiceId, status,data) {
    this.checked = false;
    console.log(data);
    this.orderLocation = data.customeraddress.location
    this.isfullfilledData = [];
    this.orderInvoiceId = orderInvoiceId
    this.orderService.getDataById(orderInvoiceId)
   .subscribe( data => {
     this.editOrderData = data;
     this.orderConfirmstatus = status;
     console.log(this.editOrderData.length);
     for(let filldata of this.editOrderData) {
        if (filldata.isFullFilled == true) {
          this.isfullfilledData.push(filldata);
        }
        const statusdata = this.isfullfilledData.length;
        console.log(statusdata)
     }
   })
 }

  public showlistfunction(data){
    this.clickitem = data;
    this.order = [];
    if(data == "1")
    {
      this.spinner = true;
      this.title = "Orders";
      const currentDate = new Date();
      let ms = new Date().getTime() + (1000 * 60 * 60 * 24)*7;
      let sevendaysDate = new Date(ms);
      console.log(sevendaysDate)
      let currentdate = currentDate.getDate();
      let currentmonth = currentDate.getMonth() + 1; 
      const currentyear = currentDate.getFullYear()
      if(currentdate < 10) {
        this.currentdate1 = currentdate.toString();
        this.currentdate1 = "0" + this.currentdate1;
      } else {
        this.currentdate1 = currentdate.toString();
      }
  
      if(currentmonth < 10) {
        this.currentmonth1 = currentmonth.toString();
        this.currentmonth1 = "0" + this.currentmonth1;
      } else {
        this.currentmonth1 = currentmonth.toString();
      }
      this.StartDate = this.currentdate1 + '-' + this.currentmonth1 + '-' + currentyear;

    let enddate =  sevendaysDate.getDate();
    let endmonth =  sevendaysDate.getMonth() + 1; 
    const endyear =  sevendaysDate.getFullYear()

    if(enddate < 10) {
      this.enddate1 = enddate.toString();
      this.enddate1 = "0" + this.enddate1;
    } else {
      this.enddate1 = enddate.toString();
    }

    if(endmonth < 10) {
      this.endmonth1 = endmonth.toString();
      this.endmonth1 = "0" + this.endmonth1;
    } else {
      this.endmonth1 = endmonth.toString();
    }
    
    this.EndDate = this.enddate1 + '-' + this.endmonth1 + '-' + endyear;
    this.sendData = {
      "startDate": this.StartDate,
      "endDate": this.EndDate
      }
      console.log(this.StartDate, this.EndDate);
      this.orderService.GetTodaysData(this.sendData)
      .subscribe( data => {
        this.spinner = false;
        this.order = data;
        this.TotalordersData = data;
        this.orderno = this.order.length;
      });
    } if(data == "2") {
      this.title = "Cofirmed Orders";
      this.sendData = {
        "startDate": this.StartDate,
        "endDate": this.EndDate,
        "statusCode": "CN"
      };
      this.spinner = true;
      this.orderService.GetTodaysData(this.sendData)
      .subscribe( data => {
        this.spinner = false;
        this.order = data;
        this.TotalordersData = data;
        this.Confirmedno = this.order.length;
      });
    }
    if(data == "3")
    {
      this.title = "Inprogress Orders";
      this.sendData = {
        "startDate": this.StartDate,
        "endDate": this.EndDate,
        "statusCode": "FF"
      }
      this.orderService.GetTodaysData(this.sendData)
      .subscribe( data => {
        this.spinner = false;
        this.order = data;
        this.TotalordersData = data;
        this.Progressno = this.order.length;
      });
  
    } if(data == "4") {
      this.title = "Ready For Manifest";
      this.sendData = {
        "startDate": this.StartDate,
        "endDate": this.EndDate,
        "statusCode": "RD"
      };
      this.spinner = true;
      this.orderService.GetTodaysData(this.sendData)
      .subscribe( data => {
        this.spinner = false;
        this.order = data;
        this.TotalordersData = data;
        this.Intransitno = this.order.length;
      });
    } if(data == "5") {
      this.title = "Job Assigned";
      this.sendData = {
        "startDate": this.StartDate,
        "endDate": this.EndDate,
        "statusCode": "MG"
      };
      this.spinner = true;
      this.orderService.GetTodaysData(this.sendData)
      .subscribe( data => {
        this.spinner = false;
        this.order = data;
        this.TotalordersData = data;
        this.Manifestno = this.order.length;
      });
    } if(data == "6") {
      this.title = "Orders Delivered";
      this.sendData = {
        "startDate": this.StartDate,
        "endDate": this.EndDate,
        "statusCode": "D"
      };
      this.spinner = true;
      this.orderService.GetTodaysData(this.sendData)
      .subscribe( data => {
        this.spinner = false;
        this.order = data;
        this.TotalordersData = data;
        this.Deliveryno = this.order.length;
      });
    } if(data == "7") {
      this.title = "Orders Cancelled";
      this.sendData = {
        "startDate": this.StartDate,
        "endDate": this.EndDate,
        "statusCode": "OC"
      };
      this.spinner = true;
      this.orderService.GetTodaysData(this.sendData)
      .subscribe( data => {
        this.spinner = false;
        this.order = data;
        this.TotalordersData = data;
        this.Cancelledno = this.order.length;
      });
    }
    this.showlist = true;
  }
  
  SelectDaterange(event) {
    this.getAllstatus();
    this.getslots();
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
    this.sendData = {
    "startDate": this.StartDate,
    "endDate": this.EndDate
    }
    this.spinner = true;
    this.orderService.GetTodaysData(this.sendData)
      .subscribe( data => {
        this.spinner = false;
        this.order = data;
        this.TotalordersData = data;
  });
  }

  changeCheck() {
    this.checked = true;
  }

  SelectedData(editOrderData) { 
    this.orderArrayData = [];
    this.orderselectedlength = [];
    for (let orderDetailId1 of editOrderData) {
      if(orderDetailId1.isFullFilled == true) {
        this.orderselectedlength.push(orderDetailId1)
        }
      }
      for (let orderDetailId of editOrderData) {
        const orderdetailsData = {
          "orderDetailId": orderDetailId.orderDetailId,
          "isFullFilled": orderDetailId.isFullFilled
        }
        this.orderArrayData.push(orderdetailsData);
      }
      console.log( this.orderArrayData.length, this.orderselectedlength.length);
        if( this.orderArrayData.length == this.orderselectedlength.length) {
            Swal.fire({
              title: 'Are you sure want to submit',
              text: "Once submit you can't edit Data",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor:  '#13c9ca',
              cancelButtonColor: '#ff8084',
              confirmButtonText: 'Yes',
            }).then((result) => {
              if (result.value) {      
              const fullfilldata = {
                "orderInvoiceId": this.orderInvoiceId,
                "orderProdList": this.orderArrayData
              }
            this.orderService.fullFillOrder(fullfilldata)
            .subscribe( data => {
              if(data == true) {
                if(this.clickitem == 1){
                  this.loadAllData();
                }
                 if(this.clickitem == 2) {
                this.loadCCdata();
                }
                 if(this.clickitem == 3) {
                this.loadFFdata();
                } 
                if(this.clickitem == 4) {
                  this.loadRDdata();
                } 
                if(this.clickitem == 5) {
                    this.loadMGdata();
                } if(this.clickitem == 6) {
                    this.loadDDdata();
                } if(this.clickitem == 7) {
                  this.loadOCdata();
              }
              }
            Swal.fire(
                  'Successfully',
                  'Data submitted successfully',
                  'success'
                  );
                });
              }
          });
        } else  {
          const fullfilldata = {
            "orderInvoiceId": this.orderInvoiceId,
            "orderProdList": this.orderArrayData
          }
          this.orderService.fullFillOrder(fullfilldata)
          .subscribe( data => {
            if(data == true) {
              if(this.clickitem == 1){
                this.loadAllData();
              }
               if(this.clickitem == 2) {
              this.loadCCdata();
              }
               if(this.clickitem == 3) {
              this.loadFFdata();
              } 
              if(this.clickitem == 4) {
                this.loadRDdata();
              } 
              if(this.clickitem == 5) {
                  this.loadMGdata();
              } if(this.clickitem == 6) {
                  this.loadDDdata();
              } if(this.clickitem == 7) {
                this.loadOCdata();
            }
            }
          });
        }
  }
    
  public SelectStatus(selectstatus) {
    this.getslots()
    if( this.StartDate != undefined && this.EndDate != undefined) {
    this.sendData = {
      "startDate": this.StartDate,
      "endDate": this.EndDate,
      "statusCode": selectstatus
    }
    console.log(this.EndDate, this.StartDate, this.sendData)
    } else {
      this.sendData = {
        "statusCode": selectstatus
      }
    }
    this.spinner = true;
      this.orderService.GetTodaysData(this.sendData)
      .subscribe( data => {
        this.spinner = false;
        this.order = data;
        this.TotalordersData = data;
      });
  }

  SelectSlot(slotId) {
    this.order  = [];
    this.slotsarrayData = [];
    for(let order of this.TotalordersData) {
        if(order.slotId == slotId) {
          this.slotsarrayData.push(order);
        }
        this.order = this.slotsarrayData;
    }
  }

  public hidelistfunction(){
    this.clickitem = ''
    this.loadAllData();
      this.loadRDdata();
      this.loadFFdata();
      this.loadDDdata();
      this.loadCCdata();
      this.loadMGdata();
      this.loadOCdata();
      this.selected = '';
    // this.sendData = {
    //   "startDate": this.StartDate,
    //   "endDate": this.EndDate
    //   }
    // this.orderService.GetTodaysData(this.sendData)
    // .subscribe( data => {
    //   this.order = data;
    //   this.orderno = this.order.length;
    // })
    this.showlist = false;
    this.title = "Orders";
  }

}
