import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {PromotionService} from '../../services/promotion.service'
import Swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list-coupon',
  templateUrl: './list-coupon.component.html',
  styleUrls: ['./list-coupon.component.scss']
})
export class ListCouponComponent implements OnInit {

  @ViewChild('myImage', {static: false}) myImage:ElementRef;
  
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


  public selected = [];
  public editcoupanflag = false;
  public addcoupanflag = false;
  CouponAddForm: FormGroup;
  CouponUpdateForm: FormGroup;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  data: any;
  public now: Date = new Date();
  public date1: any;

  size:any;
  width:number;
  height:number;
  convertimage: any;
  promoimg: any;
  imagemessage = false;
  promotionimage: any;
  spinner = false;

  public addCouponData = {
    'promotionImage':'',
    'promotionName':'',
    'promotionCount':'',
    'promotionCode': '',
    'promotionAmount': '',
    'promotionType':'',
    'promotionStartDate':'',
    'promotionEndDate':'',
    'promotionDesc':'',
    'promotionMinAmount': ''
  }

  public editCouponData = {
    'promotionId': '',
    'promotionImg':'',
    'promotionName':'',
    'promotionCount':'',
    'promotionCode': '',
    'promotionAmount': '',
    'promotionType':'',
    'promotionStartDate':'',
    'promotionEndDate':'',
    'promotionDesc':'',
    'promotionMinAmount': ''
  }
  
  constructor(public promotionService: PromotionService, public fb: FormBuilder) {
    this.CouponAddForm = this.fb.group({
      promotionName: ['', Validators.required],
      promotionImage: [null, Validators.required],
      promotionCount: ['', Validators.required],
      promotionCode: ['', Validators.required],
      promotionAmount: ['', Validators.required],
      promotionType: ['', Validators.required],
      promotionStartDate: ['', Validators.required],
      promotionEndDate: ['', Validators.required],
      promotionDesc: ['', Validators.required],
      promotionMinAmount: ['', Validators.required]    
    })
    this.CouponUpdateForm = this.fb.group({
      promotionName: ['', Validators.required],
      promotionImg: [null],
      promotionCount: ['', Validators.required],
      promotionCode: ['', Validators.required],
      promotionAmount: ['', Validators.required],
      promotionType: ['', Validators.required],
      promotionStartDate: ['', Validators.required],
      promotionEndDate: ['', Validators.required],
      promotionDesc: ['', Validators.required],
      promotionMinAmount: ['', Validators.required]
    });
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  ngOnInit() { 
    this.GetAllpromotions();
  }

  onchange1(data){
    console.log(data);
    this.date1 = data;
  }
  
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  GetAllpromotions() {
    this.promotionService.getAllPromotions()
    .subscribe( data => {
      this.data = data;
      console.log(this.data)
    })
  }

  onChange1(event) {
    this.imagemessage = false;
    console.log(event)
    if(event.target.files.length != 0){
      let image: any = event.target.files[0];
      this.size = image.size;
      let fr = new FileReader;
      fr.onload = () => { 
      this.promoimg = new Image();
      
      this.promoimg.onload = () => {
      this.width = this.promoimg.width;
      this.height = this.promoimg.height;
      console.log(this.height)
      if (this.width >= 0 && this.height >= 0) {
        this.imagemessage = false;
        }
        else {
        this.imagemessage = true;
        }
      };
      
      this.promoimg.src = fr.result; // This is the data URL
      };
      fr.readAsDataURL(image);
    }
  }

  AddPromotion(addCouponData) {
    this.spinner = true;
    if ( this.CouponAddForm.valid) {
    const AddCouponData = {
    'promotionImage': addCouponData.promotionImage[0].base64.split(',')[1],
    'promotionName': addCouponData.promotionName,
    'promotionCount': addCouponData.promotionCount,
    'promotionCode': addCouponData.promotionCode,
    'promotionAmount': addCouponData.promotionAmount,
    'promotionType':addCouponData.promotionType,
    'promotionStartDate':addCouponData.promotionStartDate,
    'promotionEndDate':addCouponData.promotionEndDate,
    'promotionDesc':addCouponData.promotionDesc,
    'promotionMinAmount': addCouponData.promotionMinAmount
    }

    console.log(AddCouponData)
    this.promotionService.savePromotion(AddCouponData)
    .subscribe( data => {
      this.spinner = false;
      if (data == true){
        Swal.fire({
          title: 'Added',
          text: 'Coupon added successfully!',
          icon: 'success',
          confirmButtonColor: '#ff8084'
        });
        this.GetAllpromotions();
        this.addcoupanflag = false;
      }
    });
    }
  }

  editcoupon(data){
    this.editcoupanflag = true;
    this.editCouponData = data;
    this.editCouponData.promotionId = data.promotionId;
  }

  UpdatePromotion(editCouponData) {
    this.spinner = true;
    if ( this.CouponUpdateForm.valid) {
      if (editCouponData.promotionImg != undefined && editCouponData.promotionImg != null && editCouponData.promotionImg != [] && editCouponData.promotionImg.length != 0) {
        editCouponData.promotionImg = editCouponData.promotionImg[0].base64.split(',')[1];
      } else if (editCouponData.promotionImg == undefined ) {
        editCouponData.promotionImg = null
      } else {
        editCouponData.promotionImg = null
      }
    const EditCouponData = {
      'promotionId': this.editCouponData.promotionId,
      'promotionImage': editCouponData.promotionImg ,
      'promotionName': editCouponData.promotionName,
      'promotionCount': editCouponData.promotionCount,
      'promotionCode': editCouponData.promotionCode,
      'promotionAmount': editCouponData.promotionAmount,
      'promotionType': editCouponData.promotionType,
      'promotionStartDate': editCouponData.promotionStartDate,
      'promotionEndDate': editCouponData.promotionEndDate,
      'promotionDesc': editCouponData.promotionDesc,
      'promotionMinAmount': editCouponData.promotionMinAmount,
    }
    console.log(EditCouponData);
    this.promotionService.savePromotion(EditCouponData)
    .subscribe( data => {
      this.spinner = false;
      if (data == true){
        Swal.fire({
          title: 'Updated',
          text: 'Coupon updated successfully!',
          icon: 'success',
          confirmButtonColor: '#ff8084'
        });
        this.GetAllpromotions();
        this.editcoupanflag = false;
        }
      })
    }
  }

  deletecoupon(promotionId){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:  '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
  }).then((result) => {
    if (result.value) {
      this.promotionService.DeletePromotionById(promotionId)
    .subscribe ( data => {
      this.GetAllpromotions();
      Swal.fire(
        'Deleted',
        'Coupon has been deleted.',
        'success');
      }, error => {
        Swal.fire('Error!', 'error', 'warning');
      });
        }
      });
  }

  open(){
    this.imagemessage = false;
    this.addcoupanflag = true;
    this.addCouponData = {
      'promotionImage':'',
      'promotionName':'',
      'promotionCount':'',
      'promotionCode': '',
      'promotionAmount': '',
      'promotionType':'',
      'promotionStartDate':'',
      'promotionEndDate':'',
      'promotionDesc':'',
      'promotionMinAmount': ''
    }
  }

  CloseCoupon(){
    this.imagemessage =  false;
    this.CouponUpdateForm.reset()
    this.GetAllpromotions();
    this.editcoupanflag = false;
    this.addcoupanflag = false;
    this.addCouponData = {
      'promotionImage':'',
      'promotionName':'',
      'promotionCount':'',
      'promotionCode': '',
      'promotionAmount': '',
      'promotionType':'',
      'promotionStartDate':'',
      'promotionEndDate':'',
      'promotionDesc':'',
      'promotionMinAmount': ''
    }
  }

}
