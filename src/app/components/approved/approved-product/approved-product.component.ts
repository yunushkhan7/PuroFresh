import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { NotificationsService } from '../../services/notifications.service';
import swal from 'sweetalert2';
import { Observable, Observer } from 'rxjs';

enum CheckBoxType { newArrival, trending, isApproved, NONE };
@Component({
  selector: 'app-approved-product',
  templateUrl: './approved-product.component.html',
  styleUrls: ['./approved-product.component.scss']
})
export class ApprovedProductComponent implements OnInit {

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
    console.log("key");
    
    this.key = key;
    this.reverse = !this.reverse
  }


  public app: any = [];
  // adddiscounts = []
  public Allcategories: any;
  base64Image: string;
  promoimg: any;
  imagemessage = false;
  currentlyChecked: any = false;
  measuremntTypes: any = [];

  size: any;
  width: number;
  screenHeight: number;
  screenWidth: number;
  Allactivecategories = [];
  submitted = false;
  userType: any
  addproduct = true
  height: number;
  check_box = CheckBoxType;
  productsdata
  productdata
  editProduct = false
  notificationaddForm: FormGroup;
  notificationeditForm: FormGroup;
  spinner = false;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public data: any;
  categoryName = "";
  productName = "";
  approved = false
  franchaseId = localStorage.getItem("franchaseId")
  approval: any = []
  franchise: any = []
  public invoiceForm: FormGroup;
  items: FormArray
  orderForm: FormGroup;

  public editproduct = {
    "fProductId": "",
    "productName": "",
    "shortDescription": "",
    "productImage": "",
    "trending": false,
    "newArrival": false,
    "productDescription": "",
    "categoryId": "",
    "isApproved": true,
    "categoryName": "",
    "leadDays": 0,
    "isActive": false,
    "productType": "string",
    "isDiscount": false,
    "tax": 0,
    "threshold": 0,
    "franchaseId": "",
    "productQuantities": []





  }






  constructor(private notificationsService: NotificationsService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    // this.getAllNotificationsRanges()
    this.GetFranchaseProductListForApproval()
    this.userType = localStorage.getItem("userType")
    this.getFranchise()
    this.getAllcategories()
    this.getAllmeasurementTypes()
    this.invoiceForm = this.formBuilder.group({
      Rows: this.formBuilder.array([this.initRows()])
    });
    this.orderForm = new FormGroup({
      items: this.formBuilder.array([this.createFormItem()])
    });

  }

  GetFranchaseProductListForApproval() {

    this.notificationsService.GetFranchaseProductListForApproval()
      .subscribe(data => {

        this.productdata = data
        this.approval = this.productdata.productsList

        console.log('aprroval', this.approval)
      })
  }





  getFranchise() {
    this.notificationsService.getFranchise()
      .subscribe(data => {

        this.franchise = data
        console.log('getfranchaise', data)


      })
  }



  onChangeFran(data) {
    console.log('onchangefran', data)
    this.notificationsService.GetFranchaseProductListForApprovalfranchiseId(data).subscribe
      (data => {
        this.productsdata = data
        this.approval = this.productsdata.productsList
      })
    console.log('onchange', data)
    this.franchaseId = data;

  }
  getAllmeasurementTypes() {
    this.notificationsService.getAllMeasurement()
      .subscribe(data => {
        this.measuremntTypes = data;
        console.log('measurementapproved', data)
      })
  }





  chekUserType() {


    if (this.userType == 'Purofresh') {

      return true;


    }
    else {
      return false
    }
  }







  getAllcategories() {
    this.Allactivecategories = [];
    this.notificationsService.getAllCatalogs()
      .subscribe(data => {
        this.Allcategories = data;
        for (let activeCategory of this.Allcategories) {
          if (activeCategory.isActive == true) {
            this.Allactivecategories.push(activeCategory);
          }
          this.Allactivecategories = this.Allactivecategories;
        }
        console.log(this.Allcategories, data)
      })
  }






  modal() {
    this.approved = true;
  }


  edit(data) {
    this.addproduct = false;
    this.editProduct = true;
    this.editproduct = data
    const i = this.orderForm.value.items.length;
    for (let j = i - 1; j >= 0; j--) {
      const add = this.orderForm.get('items') as FormArray;
      add.removeAt(j)
    }
    for (let item of this.editproduct.productQuantities) {
      console.log(item);
      this.items = this.orderForm.get('items') as FormArray;
      console.log(this.items);

      this.items.push(this.editFormItem(
        item.quantity,
        item.grossWeight,
        item.netWeight,
        item.actualPrice,
        item.salePrice,
        item.prodMeasurementId,
        item.productQuantityId

      ))
    }
  }


  CloseProduct() {
    this.editProduct = false;
    this.addproduct = true;
  }






  initRows() {
    return this.formBuilder.group({
      quantity: [0],
      grossWeight: [""],
      netWeight: [""],
      actualPrice: [0],
      salePrice: [0],
      prodMeasurementId: [""]
    });
  }


  addNewRow() {
    this.formArr.push(this.initRows());
  }




  createFormItem() {
    return this.formBuilder.group({
      quantity: [],
      grossWeight: [],
      netWeight: [],
      actualPrice: [],
      salePrice: [],
      prodMeasurementId: [],
      productQuantityId: [""]
    })
  }

  editFormItem(a, b, c, d, e, f, g) {
    return this.formBuilder.group({
      quantity: [a],
      grossWeight: [b],
      netWeight: [c],
      actualPrice: [d],
      salePrice: [e],
      prodMeasurementId: [f],
      productQuantityId: [g]

    })
  }


  get formArra() {
    return this.orderForm.get('items') as FormArray;
  }
  get formArr() {
    return this.invoiceForm.get("Rows") as FormArray;

  }


  addItem() {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createFormItem());
  }


  updateProduct(editProductData) {
    console.log('updateproductdata', editProductData);


    //   console.log(Number(editProductData.netWeight));
    //   console.log(Number(editProductData.grossWeight));
    //   console.log(Number(editProductData.actualAmount));
    //   console.log(Number(editProductData.discountAmount))
    //   if ( (Number(editProductData.discountAmount) > Number(editProductData.actualAmount))) {
    //     this.pricemessage= true;
    //     setTimeout(() => {
    //       this.pricemessage = false;
    //     }, 5000)
    //   } else if (Number(editProductData.netWeight) > Number(editProductData.grossWeight)) {
    //     this.weightmessage= true;
    //     setTimeout(() => {
    //       this.weightmessage = false;
    //     }, 5000)
    //   } else {}
    //   // this.spinner = true;
    //   for(let categoryname of this.Allcategories){
    //     if(editProductData.categoryId == categoryname.categoryId){
    //       this.categoryName = categoryname.categoryName;
    //     }
    //   }
    // if (editProductData.productImg != null ) {
    //   editProductData.productImg = editProductData.productImg[0].base64.split(',')[1]
    // }
    const productEditData = {
      "fProductId": editProductData.fProductId,

      "productName": editProductData.productName,
      // "productImage":  editProductData.productImage[0].base64.split(',')[1],

      "isApproved": true,

      "categoryId": editProductData.categoryId,
      "categoryName": editProductData.categoryName,

      "productDescription": editProductData.productDescription,
      "shortDescription": editProductData.shortDescription,
      "isActive": editProductData.isActive,
      "deliveryCharges": editProductData.deliveryCharges,
      "leadDays": editProductData.leadDays,
      "tax": editProductData.tax,
      "productType": editProductData.productType,
      "newArrival": editProductData.newArrival,
      "trending": editProductData.trending,
      "orderNo": editProductData.orderNo,
      "franchaseId": editProductData.franchaseId,
      "isDiscount": editProductData.isDiscount,
      "productQuantities": this.orderForm.value.items
    }
    console.log('productEditDataconst', productEditData);
    this.notificationsService.UpdateAllProduct(productEditData)
      .subscribe(data => {

        console.log('updateproductdata', data)
        //  if( data == true) {
        swal.fire({
          title: 'Approved',
          text: 'Product Approved successfully!',
          icon: 'success',
          confirmButtonColor: '#ff8084'
        });

        this.GetFranchaseProductListForApproval();

        this.editProduct = false;

        this.addproduct = true;
        //  }
      });
  }


  // selectCheckBoxtrending(event) {
  //   console.log(event.target.checked)
  //   if( event.target.checked) {

  //     this.editproduct.newArrival = false
  //     this.editproduct.trending = true
  //   } else {

  //     this.editproduct.newArrival = false
  //     this.editproduct.trending = false
  //   }
  // }
  selectCheckBox(targetType: CheckBoxType) {
    if (this.currentlyChecked === targetType) {
      this.currentlyChecked = CheckBoxType.NONE;
      return;
    }
    this.currentlyChecked = targetType;
    console.log(this.currentlyChecked)
  }


  selectCheckBoxnewarrival(event) {
    console.log(event.target.checked)
    if (event.target.checked) {
      this.editproduct.newArrival = true;
      this.editproduct.trending = false;
      this.editproduct.newArrival = true;
      this.editproduct.trending = false;
    } else {
      this.editproduct.newArrival = false
      this.editproduct.trending = false
      this.editproduct.newArrival = false
      this.editproduct.trending = false
    }
  }

  selectCheckBoxtrending(event) {
    console.log(event.target.checked)
    if (event.target.checked) {
      this.editproduct.newArrival = false
      this.editproduct.trending = true
      this.editproduct.newArrival = false
    } else {
      this.editproduct.newArrival = false
      this.editproduct.trending = false
      this.editproduct.newArrival = false
    }
  }

  selectCheckBoxtisApproved(event) {

    console.log('checked', event)

    console.log(event.target.checked)
    if (event.target.checked) {
      this.editproduct.newArrival = false
      this.editproduct.trending = false

      this.editproduct.isApproved = true


    }
  }

  deleteRow(index: number) {
    this.formArra.removeAt(index);
  }



  image() {
    console.log('image')
    this.approved = true
  }


  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }


  getBase64Image(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }




  onChange1(event) {
    this.imagemessage = false;
    console.log('imagedeatattdaf', event)
    if (event.target.files.length != 0) {
      let image: any = event.target.files[0];
      this.size = image.size;
      let fr = new FileReader;
      fr.onload = () => {
        this.promoimg = new Image();

        this.promoimg.onload = () => {
          this.width = this.promoimg.width;
          this.height = this.promoimg.height;
          if (this.width >= 0 && this.height >= 0) {
            this.imagemessage = false;
          }
          else {
            this.imagemessage = true;
            this.editproduct.productImage = '';
          }
        };

        this.promoimg.src = fr.result; // This is the data URL
      };
      fr.readAsDataURL(image);
    }
  }






}
