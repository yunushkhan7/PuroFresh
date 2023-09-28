import { Component, OnInit, HostListener, ViewChild, ElementRef, Inject } from '@angular/core';
import { POSService } from '../../services/pos.service';
import Swal from 'sweetalert2';
// import { isNumeric } from 'rxjs/util/isNumeric';
import { chart3 } from 'src/app/shared/data/chart';
import { createElementCssSelector } from '@angular/compiler';

@Component({
  selector: 'app-pointofsale',
  templateUrl: './pointofsale.component.html',
  styleUrls: ['./pointofsale.component.scss']
})
export class POSComponent implements OnInit {

  @ViewChild("myInput", {static: false}) private _inputElement: ElementRef;

  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  showcart = false;
  showcheckout = false;
  searchmsgflag = false;
  searchcontent: any;
  statusMessage: string;
  itemdetails: any;
  searchflag = 0;
  searchflagshow: boolean;
  selecteditems: any= [];
  deletearrayitem: any = [];
  totalamount: any = 0;
  sameproductflag: any = 0;
  items: any = [];
  productsList: any;
  invoiceData: any;
  spinner: boolean = false;
  elem;
  enabled: boolean = false;
  disablearrow = false;
  printdisplayflag = false;
  printagainflag = false;
  paymenttype = '';
  contact_num = '';
  contact_num_forprint = '';
  address = '';
  paymenttypename = '';
  paymentarray: any = [];
  data: any;
  productcode: any = [];
  showposfield = true;
  pincode='560032';
  deliveryCharges:any;

 
  constructor(public posService: POSService){} 

  ngOnInit() {
    this.productcode = [];
    this.elem = document.documentElement;
    this.fullScreen();
    this.getpaymenttypes();
    setTimeout(()=>{
      this._inputElement.nativeElement.focus();
    },0);
    this.deliveryCharges='560032'
    this.assingDeliveryCharges(this.deliveryCharges);

  }

  assingDeliveryCharges(value) {

    this.posService.getdeliveryChargesbyPincode(value).subscribe(charges=>{
      console.log('DeliveryCharges',charges)
      let pi=charges.toString();
      console.log("pppppppppppppppppp",pi)
      
      var pincodestring=charges

      this.deliveryCharges=pincodestring
    })



  }
  onKey(pincodedata){
    let p=pincodedata.target.value
    if(p.length==6)
    {
      this.assingDeliveryCharges(p)
    }
    else{
      this.deliveryCharges=0;
     // this.pincode='560032'
    }
    console.log("PIncodoe dDAta",pincodedata.target.value)
    

  }

  ngAfterViewInit() {
    // Otherwise Angular throws error: Expression has changed after it was checked.
    window.setTimeout(() => {
        this._inputElement.nativeElement.focus();
    });
}

  getpaymenttypes(){
    this.posService.getpaymenttype().subscribe(data =>{
      //console.log(data);
      this.paymentarray = data;
    })
  }
  
  fullScreen() {
    let elem = document.documentElement;
    let methodToBeInvoked = elem.requestFullscreen ||
      this.elem.webkitRequestFullScreen || elem['mozRequestFullscreen']
      ||
      elem['msRequestFullscreen'];
    if (methodToBeInvoked) methodToBeInvoked.call(elem);
  }

  FetchItemsBarcode(data){
    console.log(data)
    // setTimeout(()=>{
    //   this._inputElement.nativeElement.focus();
    // },0);
    if(data.length == 10){
      console.log(data)
      let new_obj = this.productcode.indexOf(data);
      console.log(new_obj)
      if(new_obj == -1){
        setTimeout(()=>{
          this._inputElement.nativeElement.focus();
        },0);
        this.productcode.push(data)
        this.posService.getBarcode(data)
        .subscribe(data => {
          this.selecteditem(data)
        })
      } else {
        this.showposfield = false;
        // setInterval(()=>{
        //   this.searchcontent = '';
        //   this.showposfield = true;
        //   this._inputElement.nativeElement.focus();
        // },100);
        for(let selectedItems of this.selecteditems) {
          if(selectedItems.code  === data) {
            this.incrementValue(selectedItems)
          }
        }
       
      }
    }
    
  }
 
  FetchItemDetailsSearch(itemcodeordesc: string): void {
    this.itemdetails = []
    this.spinner = true;
    this.searchflag = 1;
    if (itemcodeordesc.length > 0)
        this.searchcontent = itemcodeordesc;
    else {
        itemcodeordesc = undefined
        this.searchcontent = itemcodeordesc;
    }   
    console.log(this.searchcontent)    
    this.posService.getsearchbyprodcut(this.searchcontent)
      .subscribe( res => {
        this.spinner = false;
        this.itemdetails = res;
        console.log(this.itemdetails) 
        this.searchflagshow = false;
        if(this.itemdetails.length != 0){
          this.spinner = false;
          console.log(this.itemdetails)
          this.searchflagshow = true;
        }else{
          this.spinner = false;
          console.log(this.itemdetails)
          this.searchflagshow = false;
        }
      });
  }

  selecteditem(item) {
    console.log(item)
    if(item.quantity >= 1) {
      setTimeout(()=>{
        this._inputElement.nativeElement.focus();
      },0);
      item.counter = 1
      this.searchflagshow = false;
      this.searchcontent = '';
      this.sameproductflag = 0;
      if(this.selecteditems.length != 0){
        for(let data of this.selecteditems){
          if(data.productId == item.productId){
            this.sameproductflag = 1;
          }
        }
      }
      if(this.sameproductflag == 0){
        this.disablearrow = true;
        this.totalamount = this.totalamount + Number(item.discountAmount);
        item.subtotal = item.discountAmount;
     //   this.selecteditems.push(item);
        this.selecteditems.unshift(item)
      } else {
        Swal.fire(
          'Warning',
          'Product already exist',
          'warning');
      }
    }  else {
      Swal.fire(
        'Warning',
        'Out of stock',
        'warning'
      );
    }
  }

  incrementValue(item) {
    for(let data of this.selecteditems){
      if(data.productId == item.productId){
        console.log(data.counter, data.quantity)
        data.counter = Number(data.counter) + 1;
        data.subtotal = Number(data.subtotal);
        data.discountAmount = Number(data.discountAmount);
        data.subtotal = data.subtotal + data.discountAmount;
      }
    }
    this.totalamount = 0;
    for(let data of this.selecteditems){
      this.totalamount = this.totalamount + Number(data.subtotal);
    }
    //this.showposfield = false;
    
   var myVar =  setInterval(()=>{
         if(this.showposfield == false){
          this.searchcontent = '';
          this.showposfield = true;
          this._inputElement.nativeElement.focus();
          clearInterval(myVar);
         }
       },300);
  }
  
  decrementValue(item){ 
       console.log(item)
     for(let data of this.selecteditems){
       if(data.counter > 1) {
      if(data.productId == item.productId){
        data.counter = Number(data.counter) - 1;
        data.subtotal = Number(data.subtotal);
        data.discountAmount = Number(data.discountAmount);
        data.subtotal = data.subtotal - data.discountAmount;
      }
    }
    }
    this.totalamount = 0;
    for(let data of this.selecteditems){
      this.totalamount = this.totalamount + Number(data.subtotal);
    }
  }


  // decrementValue(item) {
  //    console.log(item)
  //    for(let data of this.selecteditems){
  //      if(data.counter > 1) {
  //     if(data.productId == item.productId){
  //       data.counter = Number(data.counter) - 1;
  //       data.subtotal = Number(data.subtotal);
  //       data.discountAmount = Number(data.discountAmount);
  //       data.subtotal = data.subtotal - data.discountAmount;
  //     }
  //   }
  //   }
  //   this.totalamount = 0;
  //   for(let data of this.selecteditems){
  //     this.totalamount = this.totalamount + Number(data.subtotal);
  //   }
  // }

  // incrementValue(item) {
  //     for(let data of this.selecteditems){
  //       if(data.productId == item.productId){
  //         console.log(data.counter, data.quantity)
  //         if( data.counter + 1 <= data.quantity) {
  //         data.counter = Number(data.counter) + 1;
  //         data.subtotal = Number(data.subtotal);
  //         data.discountAmount = Number(data.discountAmount);
  //         data.subtotal = data.subtotal + data.discountAmount;
  //       } else {
  //         Swal.fire(
  //           'Warning',
  //           'Out of stock',
  //           'warning'
  //         );
  //       }
  //       }
  //     }
  //     this.totalamount = 0;
  //     for(let data of this.selecteditems){
  //       this.totalamount = this.totalamount + Number(data.subtotal);
  //     }
  // }

  deleteitem(order) {
    //console.log(order);
    var deletearray = [];
    for(let data1 of this.productcode){
      if(order.code != data1){
        deletearray.push(data1)
      }
    }
    this.productcode = deletearray;
    console.log(this.productcode)
    this.deletearrayitem = []
    for(let data of this.selecteditems) {
      if( data.productId != order.productId) {
          this.deletearrayitem.push(data)
      }
    }
    this.selecteditems = this.deletearrayitem;
    this.totalamount = 0;
    for(let data of this.selecteditems){
      this.totalamount = this.totalamount + Number(data.subtotal);
    }
    if(this.selecteditems.length == 0) {
      this.productcode = [];
      this.disablearrow = false;
    }
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.searchflagshow = false;
    this.searchcontent = '';
  }

  // viewcart() {
  //   //console.log(this.paymenttype)    
  //    if(this.contact_num != ''){
  //      var phone = this.contact_num;
  //      if(isNumeric(phone) && phone.length == 10){
  //       this.contact_num_forprint = this.contact_num;
  //   if(this.paymenttype != ''){
  //     for(let data of this.paymentarray){
  //       if(this.paymenttype == data.paymentModeCode){
  //         this.paymenttypename = data.paymentModeName;
  //       }
  //     }
  //     this.spinner = true;
  //     setTimeout(() => {
  //     this.showcart = true;
  //     this.showcheckout = true;
  //     this.spinner = false;
  //     }, 1500);
  //   }else{
  //     Swal.fire(
  //       'Warning!',
  //       'Select the payment type',
  //       'warning'
  //       );
  //    }
  //   }else{
  //      Swal.fire(
  //        'Warning!',
  //        'Enter the valid phone number',
  //        'warning'
  //        );
  //    }
  //  }else{
  //   if(this.paymenttype != ''){
  //     this.contact_num_forprint = 'nil';
  //     //this.contact_num = 'nil';
  //     for(let data of this.paymentarray){
  //       if(this.paymenttype == data.paymentModeCode){
  //         this.paymenttypename = data.paymentModeName;
  //       }
  //     }
  //     this.spinner = true;
  //     setTimeout(() => {
  //     this.showcart = true;
  //     this.showcheckout = true;
  //     this.spinner = false;
  //     }, 1500);
  //   }else{
  //     Swal.fire(
  //       'Warning!',
  //       'Select the payment type',
  //       'warning'
  //       );
  //    }
  //    }
   
  // }

  backtoproducts() {
    this.showcart = false;
    this.showcheckout = false;
  } 

  close(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to close',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:  '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
  }).then((result) => {
    if (result.value) {
      this.totalamount = 0;
      this.showcart = false;
      this.showcheckout = false;
      this.selecteditems = [];
      this.paymenttype = '';
      this.disablearrow = false;
      this.contact_num = '';
      this.address = '';
      }
    });
  }

  close1(){
    this.totalamount = 0;
      this.showcart = false;
      this.showcheckout = false;
      this.selecteditems = [];
      this.paymenttype = '';
      this.disablearrow = false;
      this.contact_num = '';
      this.address = '';
  }

  checkout() {
    this.spinner = true;
    this.showcart = true;
    this.items = [];
    console.log(this.selecteditems)
    if(this.selecteditems.length != 0){
    for(let items of this.selecteditems) {
      this.productsList = {
        "productId": items.productId,
        "quantity": items.counter
      }
      this.items.push(this.productsList)
    }
    var phone1;
    if(this.contact_num_forprint == 'nil'){
      phone1 = '';
    }else{
      phone1 = this.contact_num;
    } 
    const productitems = {
      "mobileNo": phone1,
      "address": this.address,
      "paymentModeCode": this.paymenttype,
      "deliveryCharges":this.deliveryCharges,
      "prodDetails": this.items,
      }
    //console.log(productitems);
    this.posService.sendposData(productitems)
    .subscribe( data => {
      this.printagainflag = true;
      this.printdisplayflag = true;
      this.invoiceData = data;
      console.log(this.invoiceData);
        for(let data1 of this.invoiceData.deliveryPList) {
          data1.measurementName = data1.measurementName.slice(0,1);
          if(data1.productName.length >= 24) {
            data1.productName = data1.productName.slice(0,24)
          }else{
            const len = 24 - data1.productName.length;
            for(let i=0 ; i<len ;i++){
              data1.productName = data1.productName + '';
            }
          }
        }
        setTimeout(() => {
          this.spinner = false;
        }, 2000)
        setTimeout(()=> {
          this.spinner = false;
             this.captureScreen(); 
        }, 2000)
  
    })
  }else{
    this.spinner = false;
    Swal.fire(
      'Warning!',
      'No items is selected',
      'warning'
      );
    this.close1();
  }
  }

  againprint() {
    for(let data1 of this.invoiceData.deliveryPList) {
      data1.measurementName = data1.measurementName.slice(0,1);
      if(data1.productName.length >= 24) {
        data1.productName = data1.productName.slice(0,24)
      }else{
        const len = 24 - data1.productName.length;
        for(let i=0 ; i<len ;i++){
          data1.productName = data1.productName + '';
        }
      }
    }
    this.captureScreen(); 
  }

  public captureScreen() {
      const printContent = document.getElementById("contentToConvert").innerHTML;
      const WindowPrt = window.open('', '', 'left=0,top=0,width=auto,height=100%,toolbar=0,scrollbars=0,status=0');
      WindowPrt.document.write(printContent);
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
    }

    @HostListener('document:click', ['$event'])
    clickout(event) {
      if(this._inputElement.nativeElement.contains(event.target)) {
        this._inputElement.nativeElement.focus();
      } else {
       // this._inputElement.nativeElement.focus();
      }
    }

  }
