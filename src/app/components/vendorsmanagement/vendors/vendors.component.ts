import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import {fadeInOutTranslate} from '../../../shared/service/animation';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { VendorService } from '../../services/vendor.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-vendorsmanagement',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
  animations:[fadeInOutTranslate]
})
export class VendorsComponent implements OnInit {

  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public showdetails = false;
  public showedit = false;
  public showadd = false;
  public showOrderedit = false;
  public data: any;
  vendorForm: FormGroup;
  vendorPriority: any;
  vendorTypes: any;
  submitted= false;
  public productids: any = [];

  public addVendorData: any = {
    'vendorTypeName':'',
    'vendorName':'',
    'vendorPriorityName':'',
    'entityName':'',
    "address1": '',
    "address2": '',
    "landMark": '',
    "pincode": '',
    "mobile": '',
  }

  public editvendordData: any = {
    'vendorId':'',
    'vendorTypeName':'',
    'vendorName':'',
    'vendorPriorityName':'',
    'entityName':'',
    "address1": '',
    "address2": '',
    "landMark": '',
    "pincode": '',
    "mobile": '',
  }

  newProductList: any;
  dropdownEnabled = true;
    items: TreeviewItem[];
    items1: TreeviewItem[];
    items3: TreeviewItem[];
    values: number[];
    config = TreeviewConfig.create({
    hasAllCheckBox: true,
        hasCollapseExpand: true,
        decoupleChildFromParent: false,
        maxHeight: 250,
    });
  res: any;
  vendorEditData: any;
  spinner: boolean = false;
  emptyarray: boolean = false;

  constructor(public formBuilder: FormBuilder, public vendorService: VendorService) {
    this.vendorForm = this.formBuilder.group({
        vendorTypeName: ['', Validators.required],
        vendorName: ['', Validators.required],
        entityName: ['', Validators.required],
        vendorPriorityName: ['', Validators.required],
        mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        address1: ['', Validators.required],
        address2: ['', Validators.required],
        landMark: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  ngOnInit() {
    this.getAllVendors();
    this.getVendorTypes();
    this.getVendorPriorities();
   // this.products();
    this.items = [];
    this.items1 = [];
   // this.newProductList = [];
  }

  get f() { return this.vendorForm.controls; }

  public products() {
    this.spinner = true;
    this.vendorService.getproductList()
        .subscribe( res => {
          this.res = res;
          console.log(this.res)
          this.spinner = false;
          this.res.forEach( x => {
            const y = x;
            const childrenNodes = [];
            x.productList.forEach( q => {
            const r = q;
            const childNodes = new TreeviewItem({text: r.productName + ' - ' + r.netWeight + r.measurementName , value: r.productId, checked: r.status});
            childrenNodes.push(childNodes);
            childNodes.checked = false;
          });
            const parentNode = new TreeviewItem({text: y.categoryName, value: y.categoryId, checked: y.status, children: childrenNodes});
            parentNode.checked = false;
            parentNode.collapsed = true;
            this.items.push(parentNode);
            console.log(this.items)
            });
        });
  }

  public getAllVendors() {
      this.vendorService.getAllVendors()
      .subscribe( data => {
        this.data = data;
      })
  }

  public getVendorTypes() {
      this.vendorService.getVendorTypes()
      .subscribe( data => {
        this.vendorTypes = data;
      })
  }

  public getVendorPriorities() {
      this.vendorService.getVendorPriority()
      .subscribe( data => {
        this.vendorPriority = data;
      })
  }
  
  public AddVendor(addvendorData) {
    this.submitted = true;
    if(this.vendorForm.valid) {
      const AddVendordata = {
        'vendorTypeName': addvendorData.vendorTypeName,
        'vendorName': addvendorData.vendorName,
        'vendorPriorityName':  addvendorData.vendorPriorityName,
        'entityName': addvendorData.entityName,
        'mobile': addvendorData.mobile,
        'address1': addvendorData.address1,
        'address2': addvendorData.address2,
        'landMark': addvendorData.landMark,
        'pincode': addvendorData.pincode,
        'productsIds' : this.newProductList
      }
      this.vendorService.saveVendor(AddVendordata)
      .subscribe( data => {
        this.getAllVendors();
        this.addVendorData = {
          'vendorTypeName':'',
          'vendorName':'',
          'vendorPriorityName':'',
          'entityName':'',
          "address1": '',
          "address2": '',
          "landMark": '',
          "pincode": '',
          "mobile": '',
        }
        swal.fire({
        title: 'Added',
        text: 'Vendor saved successfully!',
        icon: 'success'
      });
      
      }, error => {
          swal.fire('Error!', 'error', 'warning');
      });
      this.showadd = false;
    }
  }

  public editVendor(data){
    this.spinner = true;
    this.showedit = true;
    this.showdetails = false;
    this.editvendordData = data;
    this.items1 = [];
       this.vendorService.getvendorDataById(data.vendorId)
       .subscribe( data => {
        this.spinner = false;
        this.vendorEditData = data;
        console.log(this.vendorEditData)
        this.vendorEditData.forEach( x => {
          const y = x;
          const childrenNodes = [];
          x.productList.forEach( q => {
          const r = q;
          const childNodes = new TreeviewItem({text: r.productName + ' - ' + r.netWeight + r.measurementName , value: r.productId, checked: r.isChecked});
          childrenNodes.push(childNodes);
        });
          const parentNode = new TreeviewItem({text: y.categoryName, value: y.categoryId, children: childrenNodes});
          parentNode.collapsed = true;
          this.items1.push(parentNode);
          });
       });
  }

  public onSelectedChange(products) {
    const productList = [];
    products.forEach( x => {
          const pid = x;
          productList.push(pid);
      });
      this.newProductList = productList;
      if(this.newProductList.length == 0) {
      this.emptyarray = true;
      }
  }
  
  public vendorUpdateData(vendorEditData) {
    this.submitted = true;
    if(this.emptyarray == false) {
    if(this.newProductList.length == 0){
      this.productids = [];
      for( let treeitem of this.vendorEditData){
           for(let productsids of treeitem.productList){
             if(productsids.isChecked == true){
               const proid = productsids.productId;
               this.productids.push(proid);
             }
           }
      }
      this.newProductList = this.productids;
    }
  }
	  if (this.vendorForm.valid) {   
      const VendorUpdateData = {
        'vendorId': vendorEditData.vendorId,
        'vendorName': vendorEditData.vendorName,
        'vendorTypeName' : vendorEditData.vendorTypeName,
        'vendorPriorityName': vendorEditData.vendorPriorityName,
        'entityName': vendorEditData.entityName,
        'mobile': vendorEditData.mobile,
        'address1': vendorEditData.address1,
        'address2': vendorEditData.address2,
        'landMark': vendorEditData.landMark,
        'pincode': vendorEditData.pincode,
        'productsIds' : this.newProductList
        };
      this.vendorService.updateVendor(VendorUpdateData)
      .subscribe ( success => {
        this.getAllVendors();
        swal.fire({
          title: 'Updated',
          text: 'Vendor updated successfully!',
          icon: 'success'
        });
        this.showedit = false;
      }, error => {
        swal.fire('Error!', 'error', 'warning');
      });
    }
  }

  public viewproduct(data){
    this.showdetails = true;
    this.showedit = false;
  }

  public addvendor(){
    this.products();
    this.vendorForm.markAsUntouched();
    this.showadd = true;
    this.showdetails = false;
  }

  public deleteVendor(vendorId) {
    swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.vendorService.DeleteVendorById(vendorId)
        .subscribe(success => {
          this.getAllVendors();
        swal.fire(
          'Deleted',
          'Vendor has been deleted.',
          'success');
        },  error => {
          swal.fire('Error!', 'error', 'warning');
       });
      }
    });
  }

  public editOrder(){
    this.showOrderedit = true;
  }
  
  close(){
    this.items = [];
    this.vendorForm.markAsUntouched();
    this.showdetails = false;
    this.showedit = false;
    this.showadd = false;
    this.getAllVendors();  
  }

  close1(){
    this.showOrderedit = false;
  }

 

}
