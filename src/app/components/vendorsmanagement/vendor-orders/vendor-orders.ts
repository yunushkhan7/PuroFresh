import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../services/vendor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-orders',
  templateUrl: './vendor-orders.html',
  styleUrls: ['./vendor-orders.scss']
})

export class VendorsOrderComponent implements OnInit {

  public vendors = [];
  public showaddorder = false;
  public showeditorder = false;
  public btnsflag = false;
  orderdata2: any;
  data: any;
  totalAmount: any;
  public vendorOrderForm: FormGroup;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  flag: number;
  vendorPriority: any;
  vendorpriority: string;
  vendorsName: any;
  productsList = [];
  vendorId: any;
  vendorName: any;
  vendorArray = [];
  data1: any;
  selectedAll: any;
  product: any = {
    productId: '',
    quantity : '',
    VendorProdAmt: ''
  }
  PlaceOrderData = [];
  VendorID: any;
  vendorOrderData: any;
  VendorProductList: any;
  viewVendorOrderflag = false;
  vendorplaceOrder: any;
  spinner= false;

  constructor(public vendorService: VendorService, public fb: FormBuilder) {
    this.vendorOrderForm= this.fb.group({
      vendorId:  ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAllVendors();
    this.getVendorPriorities();
    this.getAllvendorOrders();
  }

  public getAllvendorOrders() {
    this.spinner = true;
    this.vendorService.getAllVendorOrders()
    .subscribe( data => {
      this.spinner = false;
      this.data = data;
      console.log(this.data)
    })
  }

  public getVendorPriorities() {
    this.vendorService.getVendorPriority()
    .subscribe( data => {
      this.vendorPriority = data;
    })
  }

  public selectvendorPriority(priorityName) {
      this.vendorpriority = priorityName;
      this.vendorArray = [];
      for(let vendor of this.vendorsName){
      if(vendor.vendorPriorityName == this.vendorpriority){
        this.vendorName = vendor.vendorName;
        if(this.vendorName == vendor.vendorName){
          this.vendorId = vendor.vendorId
        }
        const data123 = [
          {
            vendorId: this.vendorId,
            vendorName: this.vendorName
          }
        ]
        this.vendorArray.push(...data123);
      }
    }
    this.vendorId = '';
  }

  public getAllVendors() {
    this.vendorService.getAllVendors()
    .subscribe( data => {
      this.vendorsName = data;
    })
  }

  public Getproducts(vendorId) {
    this.filterQuery = '';
    this.spinner = true;
    if(this.vendorOrderForm.valid) {
      this.VendorID = vendorId;
    this.vendorService.getvendorProdcutsById(this.VendorID)
    .subscribe( data => {
      this.spinner = false;
      this.btnsflag = true;
      this.data1 = data;
      this.productsList = this.data1.products;
      for(let productdata of this.productsList){
        productdata.selected = false;
      }
    })
  }
  }

  selectAll() {
    for (var i = 0; i < this.productsList.length; i++) {
      this.productsList[i].selected = this.selectedAll;
    }
  }

  checkIfAllSelected(productId) {
    this.selectedAll = this.productsList.every(function(item:any) {
        return item.selected == true;
      })
  }

  public placeOrder(data) {
    console.log(data)
    this.spinner = true;
    this.flag = 0;
    this.PlaceOrderData = [];
    for (let selectedData of data) {
    if ( selectedData.selected == true) {
      if(selectedData.quantity != 0 && selectedData.quantity != undefined && selectedData.VendorProdAmt != undefined && selectedData.quantity != -1 && selectedData.VendorProdAmt != -1 && selectedData.VendorProdAmt != 0) {
        const productsSelected = [{
          productId: selectedData.productId,
          quantity: selectedData.quantity,
          VendorProdAmt: selectedData.VendorProdAmt
        }]
      this.PlaceOrderData.push(...productsSelected);
      } else {
        this.flag = 1;
      }
    }
  }
  this.vendorplaceOrder = {
      vendorId :  this.VendorID,
      vendProdList:  this.PlaceOrderData
  }
  console.log(this.vendorplaceOrder, this.PlaceOrderData)
  if(this.vendorplaceOrder.vendProdList.length != 0 && this.flag == 0){ 
  this.vendorService.orderVendorData(this.vendorplaceOrder)
      .subscribe(data => {
        this.spinner = false;
        this.getAllvendorOrders();
        this.Closebtn();
        Swal.fire({
          title: 'Success',
          text: 'Order placed successfully!',
          icon: 'success'
        });
        }, error => {
          this.spinner = false;
            Swal.fire('Error!', 'error', 'warning');
        });
      } else {
        if(this.flag == 0){
          this.spinner = false;
          Swal.fire({
            title: 'No items selected!',
            text: 'Please select atleast 1 item!',
            icon: 'warning'
          })
        }
        if(this.flag == 1){
          this.spinner = false;
          Swal.fire({
            title: 'Quantity or amount is missed',
            text: 'Entered Amount and Quantity is wrong',
            icon: 'warning'
          })
        }
        
      }
  }

  viewVendorOrder(vendorOrderData){
    if(vendorOrderData != null) {
      this.viewVendorOrderflag = true; 
    this.vendorOrderData = vendorOrderData;
    this.VendorProductList = this.vendorOrderData.venOrderslist
    }
  }

  vendorReceived(vendorId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to confirm',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:  '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
  }).then((result) => {
    if (result.value) {
      this.vendorService.vendorOrderRec(vendorId)
      .subscribe(success => {
        this.getAllvendorOrders();
      Swal.fire(
        'Successfully',
        'Order received successfully',
        'success');
      }, error => {
        Swal.fire('Error!', 'error', 'warning');
      });
        }
      });
  }

  open(){
    this.showaddorder = true;
  }

  editproduct(){
    this.showeditorder = true;
  }

  Closebtn(){
    this.filterQuery = '';
    this.showaddorder = false;
    this.showeditorder = false;
    this.btnsflag = false;
    this.vendorArray = [];
    this.vendorId = '';
  }


}
