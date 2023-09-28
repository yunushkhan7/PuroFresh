import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { OrderService } from '../../services/order.service';
import Swal from 'sweetalert2';
import { ManifestService } from '../../services/manifest.service';
import { element } from 'protractor';

@Component({
    selector: 'app-todayorders',
    templateUrl: './todayorders.component.html',
    styleUrls: ['./todayorders.component.scss']
})
export class TodayOrdersComponent implements OnInit {

    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
    public order: any = [];
    public temp = [];
    public showlist = false;
    public title: string;
    todayDate = new Date()
    spinner = false;

    public rowsOnPage = 5;
    public filterQuery = '';
    public sortBy = '';
    orderstatus: any
    fulldate: any;
    orderno: any = 0;

    getdata = {
        "startDate": '',
        "orderStatus": ''
    }
    sendData: any;
    franchaseId = localStorage.getItem("franchaseId");
    userType = localStorage.getItem("userType");
    editOrderData: any;
    currentdate1: string;
    currentmonth1: string;
    orderInvoiceId: any;
    orderDetailIds: any = [];
    Intransitno: any = 0;
    Progressno: any = 0;
    Confirmedno: any = 0;
    Deliveredno: any = 0;
    Manifestno: any = 0;
    IsmodelShow = false;
    data: any;
    clickitem: any;
    orderConfirmstatus: any;
    orderdatalength: any;
    orderArrayData: any = [];
    isFullFilledcount: any;
    isFullFilledcountcondition: any;
    orderselectedlength: any[];
    editorderdataforcondition: any = [];
    editorderflag: any;
    allsots: any;
    TodaysordersData: any;
    slotsarrayData: any = [];
    checked: boolean = false;
    Cancelledno: any = 0;
    orderLocation: any;

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
        this.getslots();
        this.loadTodayData();
        this.title = "Today's Dashboard";
        this.orderService.getorderstatus()
            .subscribe(data => {
                this.orderstatus = data;
                const orderstatusAdd = [{ statusCode: 'All', internalStatus: 'All' }]
                this.orderstatus = this.orderstatus.concat(orderstatusAdd);
            });
        this.loadRDData();
        this.loadFFData();
        this.loadDDData();
        this.loadCCData();
        this.loadMGData();
        this.loadOCData()
    }

    refreshData() {
        setTimeout(() => {
            this.loadRDData();
            this.loadFFData();
            this.loadTodayData();
            this.loadDDData();
            this.loadCCData();
            this.loadMGData();
            this.loadOCData();
        }, 1000);
    }

    loadTodayData() {
        this.title = "Today's Dashboard"
        this.spinner = true;
        const currentDate = new Date();
        let currentdate = currentDate.getDate();
        let currentmonth = currentDate.getMonth() + 1;
        const currentyear = currentDate.getFullYear()


        if (currentdate < 10) {
            this.currentdate1 = currentdate.toString();
            this.currentdate1 = "0" + this.currentdate1;
        } else {
            this.currentdate1 = currentdate.toString();
        }

        if (currentmonth < 10) {
            this.currentmonth1 = currentmonth.toString();
            this.currentmonth1 = "0" + this.currentmonth1;
        } else {
            this.currentmonth1 = currentmonth.toString();
        }
        this.fulldate = this.currentdate1 + '-' + this.currentmonth1 + '-' + currentyear;

        if (this.userType != "Purofresh") {
            this.sendData = {

                "startDate": this.fulldate,
                // "userType":'Purofresh',
                "franchaseId": this.franchaseId
            }
        }
        else {
            this.sendData = {
                "startDate": this.fulldate,
                "userType": 'Purofresh'
            }
        }
        console.log('passing request', this.sendData)
        this.orderService.GetTodaysData(this.sendData)
            .subscribe(data => {
                this.spinner = false;
                this.order = data;
                this.TodaysordersData = data;
                console.log(this.order)
                this.orderno = this.order.length;
            })
    }

    loadCCData() {
        this.order = [];
        const currentDate = new Date();
        let currentdate = currentDate.getDate();
        let currentmonth = currentDate.getMonth() + 1;
        const currentyear = currentDate.getFullYear()

        if (currentdate < 10) {
            this.currentdate1 = currentdate.toString();
            this.currentdate1 = "0" + this.currentdate1;
        } else {
            this.currentdate1 = currentdate.toString();
        }

        if (currentmonth < 10) {
            this.currentmonth1 = currentmonth.toString();
            this.currentmonth1 = "0" + this.currentmonth1;
        } else {
            this.currentmonth1 = currentmonth.toString();
        }
        this.fulldate = this.currentdate1 + '-' + this.currentmonth1 + '-' + currentyear;
        if (this.userType != 'Purofresh') {
            this.sendData = {
                "startDate": this.fulldate,
                "statusCode": "CN",
                "franchaseId": this.franchaseId
            }
        }
        else {
            this.sendData = {
                "startDate": this.fulldate,
                "statusCode": "CN",
                "userType": 'Purofresh'
            }

        }
        this.orderService.GetTodaysData(this.sendData)
            .subscribe(data => {
                this.order = data;
                this.Confirmedno = this.order.length;
            });

    }

    loadFFData() {
        const currentDate = new Date();
        let currentdate = currentDate.getDate();
        let currentmonth = currentDate.getMonth() + 1;
        const currentyear = currentDate.getFullYear()

        if (currentdate < 10) {
            this.currentdate1 = currentdate.toString();
            this.currentdate1 = "0" + this.currentdate1;
        } else {
            this.currentdate1 = currentdate.toString();
        }

        if (currentmonth < 10) {
            this.currentmonth1 = currentmonth.toString();
            this.currentmonth1 = "0" + this.currentmonth1;
        } else {
            this.currentmonth1 = currentmonth.toString();
        }
        this.fulldate = this.currentdate1 + '-' + this.currentmonth1 + '-' + currentyear;
        if (this.userType != 'Purofresh') {
            this.sendData = {
                "startDate": this.fulldate,
                "statusCode": "FF",
                "franchaseId": this.franchaseId
            }
        }
        else {
            this.sendData = {
                "startDate": this.fulldate,
                "statusCode": "FF",
                "userType": 'Purofresh'
            }

        }



        this.orderService.GetTodaysData(this.sendData)
            .subscribe(data => {
                this.order = data;
                this.Progressno = this.order.length;
            });

    }

    loadRDData() {
        this.order = [];
        const currentDate = new Date();
        let currentdate = currentDate.getDate();
        let currentmonth = currentDate.getMonth() + 1;
        const currentyear = currentDate.getFullYear()

        if (currentdate < 10) {
            this.currentdate1 = currentdate.toString();
            this.currentdate1 = "0" + this.currentdate1;
        } else {
            this.currentdate1 = currentdate.toString();
        }

        if (currentmonth < 10) {
            this.currentmonth1 = currentmonth.toString();
            this.currentmonth1 = "0" + this.currentmonth1;
        } else {
            this.currentmonth1 = currentmonth.toString();
        }
        this.fulldate = this.currentdate1 + '-' + this.currentmonth1 + '-' + currentyear;
        if (this.userType != 'Purofresh') {
            this.sendData = {
                "startDate": this.fulldate,
                "statusCode": "RD",
                "franchaseId": this.franchaseId
            }
        }
        else {
            this.sendData = {
                "startDate": this.fulldate,
                "statusCode": "RD",
                "userType": 'Purofresh'
            }

        }
        this.spinner = true;
        this.orderService.GetTodaysData(this.sendData)
            .subscribe(data => {
                this.spinner = false;
                this.order = data;
                this.Intransitno = this.order.length;
            });
    }

    loadMGData() {
        this.order = [];
        const currentDate = new Date();
        let currentdate = currentDate.getDate();
        let currentmonth = currentDate.getMonth() + 1;
        const currentyear = currentDate.getFullYear()

        if (currentdate < 10) {
            this.currentdate1 = currentdate.toString();
            this.currentdate1 = "0" + this.currentdate1;
        } else {
            this.currentdate1 = currentdate.toString();
        }

        if (currentmonth < 10) {
            this.currentmonth1 = currentmonth.toString();
            this.currentmonth1 = "0" + this.currentmonth1;
        } else {
            this.currentmonth1 = currentmonth.toString();
        }
        this.fulldate = this.currentdate1 + '-' + this.currentmonth1 + '-' + currentyear;
        if (this.userType != 'Purofresh') {
            this.sendData = {
                "startDate": this.fulldate,
                "statusCode": "MG",
                "franchaseId": this.franchaseId
            }
        }
        else {
            this.sendData = {
                "startDate": this.fulldate,
                "statusCode": "MG",
                "userType": 'Purofresh'
            }

        }
        this.orderService.GetTodaysData(this.sendData)
            .subscribe(data => {
                this.order = data;
                this.Manifestno = this.order.length;
            });

    }

    loadDDData() {
        const currentDate = new Date();
        let currentdate = currentDate.getDate();
        let currentmonth = currentDate.getMonth() + 1;
        const currentyear = currentDate.getFullYear()

        if (currentdate < 10) {
            this.currentdate1 = currentdate.toString();
            this.currentdate1 = "0" + this.currentdate1;
        } else {
            this.currentdate1 = currentdate.toString();
        }

        if (currentmonth < 10) {
            this.currentmonth1 = currentmonth.toString();
            this.currentmonth1 = "0" + this.currentmonth1;
        } else {
            this.currentmonth1 = currentmonth.toString();
        }
        this.fulldate = this.currentdate1 + '-' + this.currentmonth1 + '-' + currentyear;
        if (this.userType != 'Purofresh') {
            this.sendData = {
                "startDate": this.fulldate,
                "statusCode": "D",
                "franchaseId": this.franchaseId
            }
        }
        else {
            this.sendData = {
                "startDate": this.fulldate,
                "statusCode": "D",
                "userType": 'Purofresh'
            }
        }
        this.orderService.GetTodaysData(this.sendData)
            .subscribe(data => {
                this.order = data;
                this.Deliveredno = this.order.length;
            });

    }

    loadOCData() {
        const currentDate = new Date();
        let currentdate = currentDate.getDate();
        let currentmonth = currentDate.getMonth() + 1;
        const currentyear = currentDate.getFullYear()

        if (currentdate < 10) {
            this.currentdate1 = currentdate.toString();
            this.currentdate1 = "0" + this.currentdate1;
        } else {
            this.currentdate1 = currentdate.toString();
        }

        if (currentmonth < 10) {
            this.currentmonth1 = currentmonth.toString();
            this.currentmonth1 = "0" + this.currentmonth1;
        } else {
            this.currentmonth1 = currentmonth.toString();
        }
        this.fulldate = this.currentdate1 + '-' + this.currentmonth1 + '-' + currentyear;
        if (this.userType != 'Purofresh') {
            this.sendData = {
                "startDate": this.fulldate,
                "statusCode": "OC",
                "franchaseId": this.franchaseId
            }
        }
        else {
            this.sendData = {
                "startDate": this.fulldate,
                "statusCode": "OC",
                "userType": 'Purofresh'
            }

        }
        this.orderService.GetTodaysData(this.sendData)
            .subscribe(data => {
                this.order = data;
                this.Cancelledno = this.order.length;

            });

    }

    getslots() {
        this.manifestService.getAllslots()
            .subscribe(data => {
                this.allsots = data;
            })
    }

    public showlistfunction(data) {
        this.title = "Today's Dashboard";
        this.order = [];
        this.clickitem = data;
        console.log(this.clickitem)
        if (this.clickitem == 1) {
            this.title = "Today's Orders";
            if (this.userType != "Purofresh") {
                this.sendData = {
                    "startDate": this.fulldate,
                    "franchaseId": this.franchaseId
                }
            }
            else {
                this.sendData = {
                    "startDate": this.fulldate,
                    "userType": 'Purofresh'
                }

            }
            this.spinner = true;
            this.orderService.GetTodaysData(this.sendData)
                .subscribe(data => {
                    this.spinner = false;
                    this.order = data;
                    this.TodaysordersData = data;
                });
        } if (this.clickitem == 2) {
            this.title = "Cofirmed Orders";
            if (this.userType != 'Purofresh') {
                this.sendData = {
                    "startDate": this.fulldate,
                    "statusCode": "CN",
                    "franchaseId": this.franchaseId

                }
            }
            else {
                this.sendData = {
                    "startDate": this.fulldate,
                    "statusCode": "CN",
                    "userType": 'Purofresh'

                }
            }
            this.spinner = true;
            this.orderService.GetTodaysData(this.sendData)
                .subscribe(data => {
                    this.spinner = false;
                    this.order = data;
                    this.TodaysordersData = data;
                });
        } if (this.clickitem == 3) {
            if (this.userType != 'Purofresh') {
                this.title = "Inprogress Orders";
                this.sendData = {
                    "startDate": this.fulldate,
                    "statusCode": "FF",
                    "franchaseId": this.franchaseId
                }
            }
            else {
                this.sendData = {
                    "startDate": this.fulldate,
                    "statusCode": "FF",
                    "userType": 'Purofresh'
                }
            }
            this.spinner = true;
            this.orderService.GetTodaysData(this.sendData)
                .subscribe(data => {
                    this.spinner = false;
                    this.order = data;
                    this.TodaysordersData = data;
                });
        } if (this.clickitem == 4) {
            this.title = "Ready for Manifest";
            if (this.userType != 'Purofresh') {
                this.sendData = {
                    "startDate": this.fulldate,
                    "statusCode": "RD",
                    "franchaseId": this.franchaseId
                }
            }
            else {
                this.sendData = {
                    "startDate": this.fulldate,
                    "statusCode": "RD",
                    "userType": 'Purofresh'
                }

            }
            this.spinner = true;
            this.orderService.GetTodaysData(this.sendData)
                .subscribe(data => {
                    this.spinner = false;
                    this.order = data;
                    this.TodaysordersData = data;
                });
        } if (this.clickitem == 5) {
            if (this.userType != 'Purofresh') {
                this.title = "Job Assigned";
                this.sendData = {
                    "startDate": this.fulldate,
                    "statusCode": "MG",
                    "franchaseId": this.franchaseId
                }
            }
            else {
                this.sendData = {
                    "startDate": this.fulldate,
                    "statusCode": "MG",
                    "userType": 'Purofresh'
                }
            }
            this.spinner = true;
            this.orderService.GetTodaysData(this.sendData)
                .subscribe(data => {
                    this.spinner = false;
                    this.order = data;
                    this.TodaysordersData = data;
                    console.log(this.order)
                });
        } if (this.clickitem == 6) {
            this.title = "Delivered Orders";
            if (this.userType != 'Purofresh') {
                this.sendData = {
                    "startDate": this.fulldate,
                    "statusCode": "D",
                    "franchaseId": this.franchaseId
                }
            }
            else {
                this.sendData = {
                    "startDate": this.fulldate,
                    "statusCode": "D",
                    "userType": 'Purofresh'
                }

            }
            this.spinner = true;
            this.orderService.GetTodaysData(this.sendData)
                .subscribe(data => {
                    this.spinner = false;
                    this.order = data;
                    this.TodaysordersData = data;
                });
        } if (this.clickitem == 7) {
            if (this.userType != 'Purofresh') {
                this.title = "Cancelled Orders";
                this.sendData = {
                    "startDate": this.fulldate,
                    "statusCode": "OC",
                    "franchaseId": this.franchaseId
                }
            }
            else {
                this.sendData = {
                    "startDate": this.fulldate,
                    "statusCode": "OC",
                    "userType": this.userType
                }
            }
            this.spinner = true;
            this.orderService.GetTodaysData(this.sendData)
                .subscribe(data => {
                    this.spinner = false;
                    this.order = data;
                    this.TodaysordersData = data;
                });
        }
        this.showlist = true;
    }

    public SelectStatus(selectstatus) {
        this.getslots();
        if (selectstatus != 'All') {
            this.sendData = {
                "startDate": this.fulldate,
                "statusCode": selectstatus,
                "franchaseId": this.franchaseId
            }
            this.spinner = true;
            this.orderService.GetTodaysData(this.sendData)
                .subscribe(data => {
                    this.spinner = false;
                    this.order = data;
                    this.TodaysordersData = data;
                });
        } else {
            this.loadTodayData();
        }
    }

    Selectslot(slotId) {
        this.order = [];
        this.slotsarrayData = [];
        for (let order of this.TodaysordersData) {
            if (order.slotId == slotId) {
                this.slotsarrayData.push(order);
            }
            this.order = this.slotsarrayData;
        }
    }

    public ordersview(orderInvoiceId, status, data) {
        console.log(data)
        this.orderLocation = data.customeraddress.location
        this.checked = false
        this.orderDetailIds = [];
        this.orderInvoiceId = orderInvoiceId;
        this.spinner = true;
        console.log(orderInvoiceId);
        this.orderService.getDataById(orderInvoiceId)
            .subscribe(data => {
                this.spinner = false;
                this.editorderdataforcondition = data;
                this.editOrderData = data;
                console.log('productdetailsdata inpopup', this.editorderdataforcondition);
                this.orderConfirmstatus = status;
            })
    }

    changeCheck() {
        this.checked = true;
    }

    public hidelistfunction() {
        this.clickitem = '';
        this.order = [];
        // this.loadCCData();
        // this.loadFFData();
        this.loadRDData();
        // this.loadMGData();
        // this.loadDDData();
        // const sendData1 = {
        // "startDate": this.fulldate
        // }
        // this.orderService.GetTodaysData(sendData1)
        // .subscribe( data => {
        // this.order = data;
        // this.orderno = this.order.length;
        // })
        this.showlist = false;
        this.title = "Today's Dashboard";
    }

    SelectedData(editOrderData) {
        this.orderArrayData = [];
        this.orderselectedlength = [];
        console.log(editOrderData);
        console.log(this.editorderdataforcondition);
        for (let orderDetailId1 of editOrderData) {
            if (orderDetailId1.isFullFilled == true) {
            }
        }
        for (let orderDetailId of editOrderData) {
            const orderdetailsData = {
                "orderDetailId": orderDetailId.orderDetailId,
                "isFullFilled": orderDetailId.isFullFilled
            }
            this.orderArrayData.push(orderdetailsData);
        }
        console.log(this.orderArrayData.length, this.orderselectedlength.length);
        if (this.orderArrayData.length == this.orderselectedlength.length) {
            Swal.fire({
                title: 'Are you sure want to submit',
                text: "Once submit you can't edit Data",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: '#13c9ca',
                cancelButtonColor: '#ff8084',
                confirmButtonText: 'Yes',
            }).then((result) => {
                if (result.value) {
                    const fullfilldata = {
                        "orderInvoiceId": this.orderInvoiceId,
                        "orderProdList": this.orderArrayData
                    }
                    this.orderService.fullFillOrder(fullfilldata)
                        .subscribe(data => {
                            if (data == true) {
                                if (this.clickitem == 1) {
                                    this.loadTodayData();
                                }
                                if (this.clickitem == 2) {
                                    this.loadCCData();
                                }
                                if (this.clickitem == 3) {
                                    this.loadFFData();
                                }
                                if (this.clickitem == 4) {
                                    this.loadRDData();
                                }
                                if (this.clickitem == 5) {
                                    this.loadMGData();
                                } if (this.clickitem == 6) {
                                    this.loadDDData();
                                } if (this.clickitem == 7) {
                                    this.loadOCData();
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
        } else {
            const fullfilldata = {
                "orderInvoiceId": this.orderInvoiceId,
                "orderProdList": this.orderArrayData
            }
            this.orderService.fullFillOrder(fullfilldata)
                .subscribe(data => {
                    if (data == true) {
                        if (this.clickitem == 1) {
                            this.loadTodayData();
                        }
                        if (this.clickitem == 2) {
                            this.loadCCData();
                        }
                        if (this.clickitem == 3) {
                            this.loadFFData();
                        }
                        if (this.clickitem == 4) {
                            this.loadRDData();
                        }
                        if (this.clickitem == 5) {
                            this.loadMGData();
                        } if (this.clickitem == 6) {
                            this.loadDDData();
                        } if (this.clickitem == 7) {
                            this.loadOCData();
                        }
                    }
                });
        }
        // const fullfilldata = {
        // "orderInvoiceId": this.orderInvoiceId,
        // "orderProdList": this.orderArrayData
        // }
        // this.orderService.fullFillOrder(fullfilldata)
        // .subscribe( data => {
        // if(data == true){
        // if(this.clickitem == "1"){
        // this.loadTodayData();
        // } else if(this.clickitem == "2"){
        // this.loadCCData();
        // } else if(this.clickitem == "3"){
        // this.loadFFData();
        // } else if(this.clickitem == "4"){
        // this.loadRDData();
        // } else if(this.clickitem == "5"){
        // this.loadMGData();
        // } else {
        // this.loadDDData
        // }
        // }
        // });
    }
}

// delivered(orderInvoiceId) {
// Swal.fire({
// title: 'Are you sure?',
// text: 'You want to Delivered',
// icon: 'warning',
// showCancelButton: true,
// confirmButtonColor: '#3085d6',
// cancelButtonColor: '#d33',
// confirmButtonText: 'Yes'
// }).then((result) => {
// if (result.value) {
// this.orderService.deliveryConfirmed(orderInvoiceId)
// .subscribe(data => {
// if(data == true){
// if(this.clickitem == "1") {
// this.loadTodayData();
// }
// if(this.clickitem == "2") {
// this.loadRDData();
// }
// if(this.clickitem == "3") {
// this.loadFFData();
// }
// }
// Swal.fire(
// 'Delivered!',
// 'Your file has been delivered.',
// 'success');
// }, error => {
// Swal.fire('Error!', 'error', 'warning');
// });
// }
// });
// }