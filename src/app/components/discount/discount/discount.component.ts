import { Component, OnInit } from '@angular/core';
import { FormGroup,  Validators, FormBuilder, FormControl }  from '@angular/forms';
 import { DiscountService } from '../../services/discount.service';
 import swal from 'sweetalert2';


@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  userType:any
  franchise: any = [];
  // adddiscounts = []
  submitted = false;
  addproduct = false
  editproduct = false
  discountaddForm : FormGroup;
  discounteditForm : FormGroup;
  spinner = false;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public data: any;
  franchaseId=localStorage.getItem("franchaseId");

  public addDiscount: any = {
    'franchaseId':'',
    'allowDiscount': 0,
    'minAmount':0,
    'maxAmount':0,
     'isActive': false,

  }

  public editDiscount: any = {
    'discountId':'',
    'franchaseId':'',
    'allowDiscount': 0,
    'minAmount':0,
    'maxAmount':0,
    'isActive': false,
  }
  // private discountService: DiscountService
  constructor(private discountService: DiscountService,private formBuilder: FormBuilder) {


    this.discountaddForm= this.formBuilder.group({
    minAmount: [0, [Validators.required]],
    maxAmount: [0, Validators.required],
    isActive: [false, Validators.required],
    allowDiscount: [0, Validators.required]
  });

  this.discounteditForm = this.formBuilder.group({
    minAmount: [0, Validators.required],
    maxAmount: [0, Validators.required],
    isActive: [false, Validators.required],
    allowDiscount: [0, Validators.required]
  });
  }

  ngOnInit() {
    this.getallDiscountRanges();
this.getFranchise()
    this.userType=localStorage.getItem("userType")

  }
  getallDiscountRanges() {
    this.discountService.getAllDiscountRanges()
    .subscribe( data => {
      this.data = data;
      console.log("sample data",data)
    })
  }

getFranchise(){
  this.discountService.getFranchise()
  .subscribe(data => {
    this.franchise = data

    console.log('getfranchisediscount', data)
  })
}
 


 Addproduct(){
this.addproduct = true;
this.editproduct = false;
this.spinner = true;
this.addDiscount = {
  'franchaseId':'',
    'minAmount':0,
    'maxAmount':0,
    'allowDiscount': 0,
     'isActive': false,

}
 }

 close(){
   this.addproduct = false;
   this.editproduct = false;
   this.spinner = true;
  //  this.getAllDiscountRanges();

 }
 back(){
   this.addproduct = false;
   this.editproduct = false;
 }
 edit(discountData){
   this.editproduct = true;
   this.spinner = true;
   this.editDiscount=discountData;
  //  this.editDiscount.isActive = discountData.isActive

 }


 delete(discountData){
   this.addDiscount=discountData

 }








 AddDiscount(discountrangedata){
  this.submitted = true;
  //if ( this.discountaddForm.valid) {}
    const RoleAddData = {
      "franchaseId":this.franchaseId,
      'minAmount' : discountrangedata.minAmount,
      'maxAmount': discountrangedata.maxAmount,
      'allowDiscount': discountrangedata.allowDiscount,
      'isActive' : discountrangedata.isActive,
    
      };
      console.log('add', RoleAddData)
    this.discountService.addDiscountRange(RoleAddData)
       .subscribe( data => {
         this.getallDiscountRanges()
         if(data == true)
       swal.fire({
         title: 'Range amount Added',
         text: 'Your file saved Successfully!',
         icon: 'success'
       });
       this.addproduct = false;
         }, error => {
           swal.fire('Error!', 'error', 'warning');
         });
     
 }





EditDiscount(editdiscountrangedata){
  this.submitted = true;
  if ( this.discounteditForm.valid) {
    const RoleEditData = {
      "franchaseId":this.franchaseId,
      'discountId':editdiscountrangedata.discountId,
      'minAmount' : editdiscountrangedata.minAmount,
      'maxAmount': editdiscountrangedata.maxAmount,
      'allowDiscount': editdiscountrangedata.allowDiscount,
      'isActive' : editdiscountrangedata.isActive,
    
      };

      console.log('edit', RoleEditData)
    this.discountService.updateDiscountRange(editdiscountrangedata)
       .subscribe( data => {
         this.getallDiscountRanges()
       swal.fire({
         title: 'Range amount Updated',
         text: 'Your file Update Successfully!',
         icon: 'success'
       });
       this.editproduct = false;
         }, error => {
           swal.fire('Error!', 'error', 'warning');
         });
     }
 }


deleteDiscount(discountId)  {
  swal.fire({
    title: 'Are you sure?',
    text: 'You want to delete',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      this.discountService.deleteDiscountRange(discountId) 
      .subscribe(success => {
        this. getallDiscountRanges()
      swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success');
      },  error => {
        swal.fire('Error!', 'error', 'warning');
     });
    }
  });
}


chekUserType(){

  
  if(this.userType == 'Purofresh'){

    return true;

    
    }
    else
    {
    return false
  }
 }



 onChangeFran(data){
  console.log('onchangefran',data)
     this.discountService.getAllDiscountRangesfranchiseId(data).subscribe
      (data => {
  this.data = data
     })
     console.log('onchange',data)
      this.franchaseId=data;
  
    } 

  

    onChangeGet(){
      this.discountService.getFranchise()
      .subscribe(data => {
        this.data = data
      })
    }

  



    onChangeAll(data){
     
console.log('data', data)
this.getallDiscountRanges 


    }


}
