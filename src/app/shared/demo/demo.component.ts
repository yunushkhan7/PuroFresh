import { Component, OnInit } from '@angular/core';
import { FormGroup,  Validators, FormBuilder }  from '@angular/forms';
// import { DiscountService } from '../../services/discount.service';


@Component({
  selector: 'app-discount',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

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
  date: string;
  month: string;
  public adddiscount: any = {
    'discountId': '',
    'minamount':'' ,
    'maxAmoumt':'',
    'status': '',

  }

  public editdiscount: any = {
    'discountId': '',
    'minamount': '',
    'maxAmoumt':'',
    'status': '',
  }
  
  // private discountService: DiscountService,
  constructor(private formBuilder: FormBuilder) {
    this.discountaddForm= this.formBuilder.group({
    //  userCode: ['', Validators.required],
    minamount: ['', Validators.required],
    maxAmoumt: ['', Validators.required],
    status: ['', Validators.required],
    discountId: ['', Validators.required]
  });

  this.discounteditForm = this.formBuilder.group({
    //  userCode: [''],
    minamount: ['', Validators.required],
    maxAmoumt: ['', Validators.required],
    status: ['', Validators.required],
    discountId: ['', Validators.required]
  });
  }

  ngOnInit() {
    // this.getAllDiscountRanges();
    var d=new Date();
    var year=d.getFullYear();
    var month=d.getMonth()+1;
    if (month<10){
    this.month="0" + month;
    };
    var day=d.getDate();
    this.date=year + "-" + month + "-" + day;
    
  }
  // getAllDiscountRanges() {
  //   this.discountService.getAllDiscountRanges()
  //   .subscribe( data => {
  //     this.data = data;
  //   })
  // }







 Addproduct(){
this.addproduct = true;
this.editproduct = false;
this.spinner = true;
this.adddiscount = {
  'minamount': '',
  'maxAmoumt': '',
  'status': '',
  'discountId': '',

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
 edit(){
   this.editproduct = true;
   this.spinner = true;

 }
 AddDiscount(adddiscount){
   this.submitted = true;
   if (this.discountaddForm.valid){
     const AddDiscount = {
       'minamount': adddiscount.minamount,
       'maxAmoumt': adddiscount.maxAmoumt,
       'status': adddiscount.status,
       'discountId': adddiscount.discountId,

     }
   }
  //  this.getAllDiscountRanges();

 }

 Editdiscount(editdiscount){
  this.submitted = true;
  if (this.discountaddForm.valid){
    const Editdiscount = {
      'minamount': editdiscount.minamount,
      'maxAmoumt': editdiscount.maxAmoumt,
      'status': editdiscount.status,
      'discountId': editdiscount.discountId,

    }
  }
  // this.getAllDiscountRanges();

}




}
