import { Component, OnInit } from '@angular/core';
import {fadeInOutTranslate} from 'src/app/shared/service/animation';
import { CustomerService} from '../../services/customer.service';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  animations: [fadeInOutTranslate]
})
export class CustomerComponent implements OnInit {

  q: any
  searchText;
  page = 1
  pageno: any = 5;

  onPageChange(pageNumber) {
    console.log('efvents', pageNumber);
    this.q = pageNumber;
  }

  onChange(data) {
    this.pageno = data;
    this.onPageChange('')
  }

  key: string = '';
  reverse: boolean = false;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse
  }



  public showdetails = false;
  public showOrderedit = false;
  data: any;
  customerDetails: any;
  orderHistory: any;
  paymentHistory: any;
  orderDetails: any;
  customerAddress: any;
  viewflag = false;
  totalAmount: number;
  customerId: any;
  productsitem: any;
  spinner = false;

  constructor(public customerService: CustomerService) {}

  ngOnInit() {
    this.GetAllCustomers();
  }

  GetAllCustomers() {
    this.spinner = true;
    this.customerService.getAllCustomers()
    .subscribe( data => {
      this.spinner = false;
      this.data = data;
      console.log( this.data)
    })
  }

  viewcustomer(customerId){ 
    this.spinner = true;
    this.searchText = '';
    this.customerId = customerId;
    this.customerService.getCustomersDataById(customerId)
    .subscribe( data => {
      this.spinner = false;
      this.customerDetails = data;
      if(this.customerDetails.customer != null){
        this.showdetails = true;
        this.GetAllordersByCus(customerId);
        this.paymentHistory = this.customerDetails.payments;
        this.customerAddress = this.customerDetails.customer.addressess;
      } else {
        swal.fire('No data!', 'No orders', 'warning');
      }
    });
  }

  GetAllordersByCus(customerId) {
    this.searchText = '';
    this.spinner = true;
    this.customerId = customerId;
    this.customerService.getCustomersDataById1(customerId)
    .subscribe( data => {
      this.spinner = false;
      this.orderHistory = data;
    });
  }

  viewOrderData(orderInvoiceId) {
    // this.searchText = '';
   // this.spinner = true;
    this.orderDetails = []
    this.customerService.getOderDetailsById1(orderInvoiceId)
    .subscribe( data => {
    //  this.spinner = false;
      if ( data != null) {
        this.orderDetails = data;
        this.viewflag = true;
      // this.totalAmount = orderDetails.orderDetails.grandTotal + this.orderDetails.promotionAmount;
      }
    });
  }

  cancelledOrder(orderInvoiceId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Cancel the order',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:  '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
  }).then((result) => {
    if (result.value) {
      this.customerService.deleteCusorder(orderInvoiceId)
      .subscribe(success => {
        this.GetAllordersByCus(this.customerId);
      Swal.fire(
        'Cancelled',
        'Order has been Cancelled',
        'success');
      }, error => {
        Swal.fire('Error!', 'error', 'warning');
      });
        }
      });
  }

  close(){
    this.searchText = '';
    this.showdetails = false;
  }
  
  editOrder(){
    this.showOrderedit = true;
  }

  close1(){
    this.searchText = '';
    this.showOrderedit = false;
  }

}

