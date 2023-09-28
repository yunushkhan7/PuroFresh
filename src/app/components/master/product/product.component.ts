import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl, NgForm } from '@angular/forms';
// import { NotificationsService } from '../../services/notifications.service';
import Swal from 'sweetalert2'

import { MasterproductService } from '../../services/masterproduct.service';
import { RegistrationService } from '../../services/registration.service';
import { DatePipe } from '@angular/common';
import { element } from 'protractor';
import { concatAll } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';

enum CheckBoxType { newArrival, trending, isDiscount, NONE };

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {



  q: any
  searchText;
  page = 1
  pageno: any = 5;

  onPageChange(pageNumber){
    console.log('efvents',pageNumber);
    this.q= pageNumber;
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

  //measurementId="";
  name = 'Dynamic Add Fields';
  values = [];
  public textbox = false;
  screenHeight: number;
  screenWidth: number;
  public data: any;
  public Allcategories: any;

  //franchaseId=localStorage.getItem("franchaseId")

  userType: any
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public editproductflag = false;
  public addproductflag = false;
  ProductAddForm: FormGroup;
  ProductUpdateForm: FormGroup;
  productstatus: any;
  products: any = ['All', 'New', 'Trending', 'Discount'];
  fProductId: any;
  ProductId = "";
  franchise: any = [];
  productQuantities: any = [];
  franchaseId = localStorage.getItem("franchaseId");
  product: any = [];
  public editproduct = {
    "ProductId ": "",

    "productName": "",
    "shortDescription": "",
    "productImage": "",

    "trending": false,
    "newArrival": false,
    "productDescription": "",
    "categoryId": "",
    "categoryName": "Food Products",
    "leadDays": 0,

    "isActive": '',
    "deliveryCharges": 0,
    "productType": "",
    "isDiscount": false,
    "tax": 0,
    "orderNo": 0,
    "threshold": 0,
    "isApproved": false,

    "productQuantities": []
  }

  public addproduct =
    {

      "productName": "",
      "shortDescription": "",
      "productImage": "",

      "trending": false,
      "newArrival": false,
      "productDescription": "",
      "categoryId": "",
      "categoryName": "Food Products",
      "leadDays": 0,

      "isActive": '',
      "deliveryCharges": 0,
      "productType": "",
      "isDiscount": false,
      "tax": 0,
      "orderNo": 0,
      "threshold": 0,
      "isApproved": false,
      "productQuantities": []
    }
  categoryName = "";
  measuremntTypes: any = [];
  checkIfOthersAreSelected = false;
  typeofproduct: any;
  check_box = CheckBoxType;
  currentlyChecked: any = false;
  productsArray: any = [];
  data1: any = [];

  size: any;
  width: number;
  height: number;
  convertimage: any;
  promoimg: any;
  imagemessage = false;
  promotionimage: any;
  imgdata: any;
  spinner = false;
  Allactivecategories: any = [];

  categories: any = [];
  base64Image: string;
  pricemessage: boolean = false;
  weightmessage: boolean = false;
  viewflag: boolean = false;
  barcodeproduct: any;
  invoiceData: any
  packedDate
  elementType = 'img';
  value = '';
  format = 'CODE128';
  lineColor = '#000000';
  barwidth = 1;
  barheight = 50;
  displayValue = false;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 20;
  background = '#ffffff';
  margin = 10;
  marginTop = 5;
  marginBottom = 5;
  marginLeft = 10;
  marginRight = 10;
  barcode = 1;
  barcodes = []
  actualamount: any;
  productName: any;
  todayDate

  prod: any = [];
  currentdate1: string;
  currentmonth1: string;
  printBarcodeBtnFlag = false

  public invoiceForm: FormGroup;
  items: FormArray
  orderForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private masterproductService: MasterproductService) {

    this.ProductAddForm = this.formBuilder.group({
      productName: [''],
      productImage: [null],
      threshold: ['', Validators.required],
      // quantity: ['', Validators.required],

      productDescription: ['', Validators.required],
      shortDescription: ['', Validators.required],
      category: ['', Validators.required],
      IsActive: ['', Validators.required],
      deliveryCharges: ['', Validators.required],
      leadDays: ['', Validators.required],
      productType: ['', Validators.required],
      tax: ['', Validators.required],
      //  leadTime: ['', Validators.required],
      // prodMeasurementId: ['', Validators.required],
      typeofproduct: [''],
      orderNo: ['', Validators.required],


    })
    this.ProductUpdateForm = this.formBuilder.group({
      productName: [''],
      productImg: [null],
      threshold: ['', Validators.required],
      quantity: ['', Validators.required],
      totalStock: [''],
      balance: [''],
      orderPlaced: [''],
      isDiscount: ['', Validators.required],

      actualAmount: ['', Validators.required],
      discountAmount: ['', Validators.required],
      netWeight: ['', Validators.required],
      grossWeight: ['', Validators.required],
      //productDescription: ['', Validators.required],
      // shortDescription: ['', Validators.required],
      categoryName: ['', Validators.required],
      IsActive: ['', Validators.required],
      deliveryCharges: ['', Validators.required],
      leadDays: ['', Validators.required],
      productType: ['', Validators.required],
      tax: ['', Validators.required],
      //    leadTime: ['', Validators.required],
      // prodMeasurementId: ['', Validators.required],
      typeofproduct: [''],
      orderNo: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.orderForm = new FormGroup({
      items: this.formBuilder.array([this.createFormItem()])
    });
    this.packedDate = new Date().toISOString().split('T')[0];
    this.GetAllProducts()
  }


  get formArr() {
    return this.invoiceForm.get("Rows") as FormArray;

  }


  GetAllProducts() {
    this.masterproductService.GetAllProducts()
      .subscribe(data => {
        this.prod = data
        console.log('getallproducts', data)
      })
  }

  // chekUserType(){

  //   console.log(typeof this.userType)
  //   console.log(this.userType)
  //   if(this.userType == 'Purofresh'){
  //     console.log(true)

  //     return true;


  //     }
  //     else
  //     {
  //       console.log(false)
  //     return false
  //   }
  //  }


  // removevalue(i){
  //   this.values.splice(i,1);
  // }


  // valuess(){
  //   this.values.push({value: ""});
  // }

  getAllmeasurementTypes() {
    this.masterproductService.getAllMeasurement()
      .subscribe(data => {
        this.measuremntTypes = data;
        console.log(data)
      })
  }

  onChange1(event) {
    this.imagemessage = false;
    console.log(event)
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
            this.addproduct.productImage = '';
            this.editproduct.productImage = '';
          }
        };

        this.promoimg.src = fr.result; // This is the data URL
      };
      fr.readAsDataURL(image);
    }
  }

  SelectStatus(status) {
    this.productsArray = [];
    if (status == 'New') {
      for (let data of this.data1) {
        if (data.newArrival == true) {
          this.productsArray.push(data);
          console.log(this.productsArray)
        }
      }
      this.data = this.productsArray;
    } else if (status == 'Trending') {
      for (let data of this.data1) {
        if (data.trending == true) {
          this.productsArray.push(data);
        }
      }
      this.data = this.productsArray;
    } else if (status == 'Discount') {
      for (let data of this.data1) {
        if (data.isDiscount == true) {
          this.productsArray.push(data);
        }
      }
      this.data = this.productsArray;
    } else {
      for (let data of this.data1) {
        this.productsArray.push(data);
      }
      this.data = this.productsArray;
    }
  }

  public getAllcategories(): any {
    this.Allactivecategories = [];
    this.masterproductService.getAllCatalogs()
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
    return this.Allactivecategories;
  }
  // check box
  selectCheckBoxnewarrival(event) {
    console.log(event.target.checked)
    if (event.target.checked) {
      this.addproduct.newArrival = true;
      this.addproduct.trending = false;
      this.editproduct.newArrival = true;
      this.editproduct.trending = false;
    } else {
      this.addproduct.newArrival = false
      this.addproduct.trending = false
      this.editproduct.newArrival = false
      this.editproduct.trending = false
    }
  }

  selectCheckBoxtrending(event) {
    console.log(event.target.checked)
    if (event.target.checked) {
      this.addproduct.newArrival = false
      this.addproduct.trending = true
      this.editproduct.newArrival = false
      this.editproduct.trending = true
    } else {
      this.addproduct.newArrival = false
      this.addproduct.trending = false
      this.editproduct.newArrival = false
      this.editproduct.trending = false
    }
  }

  selectCheckBoxtisApproved(event) {

    console.log('checked', event)

    console.log(event.target.checked)
    if (event.target.checked) {
      this.addproduct.newArrival = false
      this.addproduct.trending = false

      this.addproduct.isApproved = true
      this.editproduct.newArrival = false
      this.editproduct.trending = true
    } else {
      this.addproduct.newArrival = false
      this.addproduct.trending = false
      this.addproduct.isApproved = false

      this.editproduct.newArrival = false
      this.editproduct.trending = false
      this.addproduct.isApproved = false

    }
  }

  public addnewProduct(data) {
    // console.log(this.invoiceForm.value.Rows)
    console.log('passingaddingdata', data)


    //   this.categories=[]
    // this.categories=this.masterproductService.getAllCatalogs().subscribe(result=>
    //   {
    //         this.categories=result;
    //   }
    // );
    // console.log("categoreis",this.categories)
    // this.categories.array.forEach(element => {
    //   if(element.categoryId==data.categoryId)
    //   {
    //     data.categoryName=element.categoryName
    //     console.log("categorynamej",this.categoryName)
    //   }

    // });

    // for(let categoryname of this.Allcategories){
    //   if(data.category == categoryname.categoryId){
    //     this.categoryname = categoryname.categoryName;
    //   }
    // }
    // if( this.ProductAddForm.valid) {}
    //   if ( Number(data.discountAmount) > Number(data.actualAmount)) {
    //     this.pricemessage= true;
    //     setTimeout(() => {
    //       this.pricemessage = false;
    //     }, 5000)
    //   } else if (Number(data.netWeight) > Number(data.grossWeight)) {
    //     this.weightmessage= true;
    //     setTimeout(() => {
    //       this.weightmessage = false;
    //     }, 5000)

    //   } 


    //   else {}
    this.spinner = true;
    const datatosend = {



      "productName": data.productName,
      "shortDescription": data.shortDescription,
      "productImage": data.productImage[0].base64.split(',')[1],

      "trending": data.trending,
      "newArrival": data.newArrival,
      "productDescription": data.productDescription,
      "categoryId": data.categoryId,
      "categoryName": data.categoryName,
      "leadDays": 0,

      "isActive": data.isActive,
      "deliveryCharges": data.deliveryCharges,
      "productType": data.productType,
      "isDiscount": data.isDiscount,
      "tax": 0,
      "orderNo": 0,
      "threshold": data.threshold,
      "isApproved": data.isApproved,
      "productQuantities": this.orderForm.value.items
    }
    console.log('dataproductconst', datatosend)

    this.masterproductService.addMasterProducts(datatosend).subscribe
      (data => {
        // if(data==true){
        Swal.fire({
          title: 'Added',
          text: 'Product is saved successfully!',
          icon: 'success',
          confirmButtonColor: '#ff8084'
        });

        this.GetAllProducts()
        this.addproductflag = false;

        this.addproduct =
        {

          "productName": "",
          "shortDescription": "",
          "productImage": "",

          "trending": false,
          "newArrival": true,
          "productDescription": "",
          "categoryId": "",
          "categoryName": "Food Products",
          "leadDays": 0,

          "isActive": '',
          "deliveryCharges": 0,
          "productType": "",
          "isDiscount": true,
          "tax": 12,
          "orderNo": 4,
          "threshold": 0,
          "isApproved": true,
          "productQuantities": []
        }



        //}
      })


    // if(data.productQuantities.length==0){
    //   Swal.fire({
    //     title: 'Alert',
    //     text: 'Atleast one quantities is required!',
    //     icon: 'warning',
    //     confirmButtonColor: '#ff8084'
    //   });         



    // }


  }

  public editproductfunction(data) {
    this.getAllcategories();
    this.getAllmeasurementTypes();
    this.imagemessage = false;
    this.editproductflag = true;
    console.log(data)
    this.editproduct = data;
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

    console.log('productiedtdata functions', this.editproduct)
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

  addItem() {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createFormItem());
  }

  deleteRow(index: number) {
    this.formArra.removeAt(index);
  }

  selectCheckBox(targetType: CheckBoxType) {
    if (this.currentlyChecked === targetType) {
      this.currentlyChecked = CheckBoxType.NONE;
      return;
    }
    this.currentlyChecked = targetType;
    console.log(this.currentlyChecked)
  }

  updateProduct(editProductData) {
    console.log(this.orderForm.value.items)
    console.log('dataispassing', editProductData);
    console.log("productquantiredatea", editProductData.productQuantities)


    // console.log(Number(editProductData.netWeight));
    // console.log(Number(editProductData.grossWeight));
    // console.log(Number(editProductData.actualAmount));
    // console.log(Number(editProductData.discountAmount))
    // if ( (Number(editProductData.discountAmount) > Number(editProductData.actualAmount))) {
    //   this.pricemessage= true;
    //   setTimeout(() => {
    //     this.pricemessage = false;
    //   }, 5000)
    // } else if (Number(editProductData.netWeight) > Number(editProductData.grossWeight)) {
    //   this.weightmessage= true;
    //   setTimeout(() => {
    //     this.weightmessage = false;
    //   }, 5000)
    // } else {}
    // this.spinner = true;
    for (let categoryname of this.Allcategories) {
      if (editProductData.categoryId == categoryname.categoryId) {
        this.categoryName = categoryname.categoryName;
      }
    }
    if (editProductData.productImg != null) {
      editProductData.productImg = editProductData.productImg[0].base64.split(',')[1]
    }
    const update = {
      "productId": editProductData.productId,



      "productName": editProductData.productName,
      "shortDescription": editProductData.shortDescription,
      //  "productImage":  editProductData.productImage[0].base64.split(',')[1],

      "trending": editProductData.trending,
      "newArrival": editProductData.newArrival,
      "productDescription": editProductData.productDescription,
      "categoryId": editProductData.categoryId,
      "categoryName": editProductData.categoryName,
      "leadDays": 0,

      "isActive": editProductData.isActive,
      "deliveryCharges": editProductData.deliveryCharges,
      "productType": editProductData.productType,
      "isDiscount": editProductData.isDiscount,
      "tax": 0,
      "orderNo": 0,
      "threshold": editProductData.threshold,
      "isApproved": editProductData.isApproved,
      "productQuantities": this.orderForm.value.items
    }
    console.log('productEditDataconst', update);
    this.masterproductService.updateProducts(update)
      .subscribe(data => {
        //     if( data == true) {
        this.GetAllProducts();
        Swal.fire({
          title: 'Updated',
          text: 'Product updated successfully!',
          icon: 'success',
          confirmButtonColor: '#ff8084'
        });
        this.editproductflag = false;
        //}
      });

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



  deleteProduct(ProductsId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.value) {
        this.masterproductService.deleteProduct(ProductsId)
          .subscribe(success => {
            this.GetAllProducts();
            Swal.fire(
              'Deleted',
              'Product has been deleted.',
              'success');
          }, error => {
            Swal.fire('Error!', 'error', 'warning');
          });
      }
    });
  }

  public AddproductFlag() {
    this.getAllmeasurementTypes();
    this.getAllcategories();
    this.currentlyChecked = false;
    this.imagemessage = false;
    this.addproductflag = true;
    this.addproduct =
    {

      "productName": "",
      "shortDescription": "",
      "productImage": "",

      "trending": false,
      "newArrival": false,
      "productDescription": "",
      "categoryId": "",
      "categoryName": "",
      "leadDays": 0,

      "isActive": '',
      "deliveryCharges": 0,
      "productType": "",
      "isDiscount": false,
      "tax": 0,
      "orderNo": 0,
      "threshold": 0,
      "isApproved": false,
      "productQuantities": []
    }

    this.orderForm.reset()
    this.orderForm = new FormGroup({
      items: this.formBuilder.array([this.createFormItem()])
    });
  }

  public CloseProduct() {
    this.editproductflag = false;
    this.addproductflag = false;
    this.imagemessage = false;
    this.ProductUpdateForm.reset();
    this.GetAllProducts();
    this.editproduct.productImage = '';
    this.addproduct =
    {

      "productName": "",
      "shortDescription": "",
      "productImage": "",

      "trending": false,
      "newArrival": false,
      "productDescription": "",
      "categoryId": "",
      "categoryName": "",
      "leadDays": 0,

      "isActive": '',
      "deliveryCharges": 0,
      "productType": "",
      "isDiscount": false,
      "tax": 0,
      "orderNo": 0,
      "threshold": 0,
      "isApproved": false,
      "productQuantities": []
    }


  }

  closeModal() {
    this.barcodeproduct.discountAmount = this.actualamount;
    this.barcodeproduct.productName = this.productName;
  }




  onSearchChange(searchValue: string): void {
    if (searchValue.length > 35) {
      this.printBarcodeBtnFlag = true
    } else {
      this.printBarcodeBtnFlag = false
    }
  }

  printBarcode(barcodes) {
    this.barcodes = []
    for (var i = 1; i <= barcodes; i++) {
      this.barcodes.push(i)
    }
    console.log(this.barcodes)
    setTimeout(() => {
      this.captureScreen();
    }, 1000)

  }

  public captureScreen() {
    const printContent = document.getElementById("contentToConvert").innerHTML;
    const WindowPrt = window.open('', '', 'left=0,top=0,width=auto,height=100%,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent);
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

  addproductquantities(quantitylist) {
    this.editproduct.productQuantities.push({
      "quantity": 0,

      "netWeight": "",
      "grossWeight": "",
      "measurementId": "",
      "measurementName": "",
      "actualPrice": 0,
      "salePrice": 0

    })
    console.log()
  }




  addproductquantity(quantity) {
    this.addproduct.productQuantities.push({
      "quantity": 0,
      "netWeight": 0,
      "grossWeight": 0,
      "measurementId": "",
      "measurementName": "",
      "actualPrice": 0,
      "salePrice": 0
    })
    console.log(this.addproduct)
  }








  deleteList(data) {
    console.log('deleteeeeeee')
    this.editproduct.productQuantities.splice(data, 1);

  }


  deleteaddList(data) {
    console.log('deleteeeeeee')
    this.addproduct.productQuantities.splice(data, 1);

  }














}
