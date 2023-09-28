import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2'
import { CategoryService } from '../../../services/category.service';
import { FormGroup, Validators, FormBuilder, FormArray, } from '@angular/forms';
import { ThemeService } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { Observable, Observer } from 'rxjs';

enum CheckBoxType { newArrival, trending, isDiscount, NONE };

@Component({
  selector: 'app-digital-products',
  templateUrl: './digital-products.component.html',
  styleUrls: ['./digital-products.component.scss']
})
export class DigitalProductsComponent implements OnInit {

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


  categoryId = "";
  name = 'Dynamic Add Fields';
  public textbox = false;
  screenHeight: number;
  screenWidth: number;
  public data: any;
  public Allcategories: any;
  categoryName = "";
  public data2
  franchaseId = localStorage.getItem("franchaseId")
  FProductId = "";
  userType: any
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public editproductflag = false;
  public addproductflag = false;
  ProductAddForm: FormGroup;
  ProductUpdateForm: FormGroup;
  productstatus: any;
  products: any = ['All', 'New', 'Trending', 'Discount', 'Approved', 'Pending'];
  fProductId: any;
  ProductId = "";
  franchise: any = [];
  productQuantities: any = [];
  // franchaseId=localStorage.getItem("franchaseId");
  product: any = [];
  public editproduct = {
    "fProductId": "",
    "productName": "",
    "shortDescription": "",
    "productImage": "",
    "trending": false,
    "newArrival": false,
    "productDescription": "",
    "categoryId": "",
    "categoryName": "",
    "leadDays": 0,
    "isActive": false,
    "productType": "string",
    "isDiscount": false,
    "tax": 0,
    "threshold": 0,
    "isApproved": true,
    "franchaseId": "",
    "productQuantities": []
  }


  public addproduct =

    {

      "productId": "",
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
      "franchaseId": "",
      "productQuantities": []
    }

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

  // FromDate: Date;

  get values(): string[] {
    return this.barcodeproduct.code.split('\n');
  }
  
  constructor(public productService: ProductService, public categoryService: CategoryService, private formBuilder: FormBuilder, public datePipe: DatePipe) {
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
      prodMeasurementId: ['', Validators.required],
      typeofproduct: [''],
      orderNo: ['', Validators.required],


    })
    this.ProductUpdateForm = this.formBuilder.group({
      productName: [''],
      //  productImg: [null],
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
      prodMeasurementId: ['', Validators.required],
      typeofproduct: [''],
      orderNo: ['', Validators.required]
    })
  }







  ngOnInit() {



    this.invoiceForm = this.formBuilder.group({
      Rows: this.formBuilder.array([this.initRows()])
    });
    this.orderForm = new FormGroup({
      items: this.formBuilder.array([this.createFormItem()])
    });

    this.packedDate = new Date().toISOString().split('T')[0];
    //this.GetAllproducts();
    // const imageUrl = "http://34.93.120.109:4200/ProductImages/22042020130305.png";
    // this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
    //   this.base64Image =  base64data;
    //   console.log(this//e64Image, "base64 coming")
    // })
    this.getProductByFranchaseId()
    this.getFranchise()
    this.userType = localStorage.getItem("userType")




  }





  get formArr() {
    return this.invoiceForm.get("Rows") as FormArray;

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


  addItem() {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createFormItem());
  }

  deleteRow(index: number) {
    this.formArra.removeAt(index);
  }



  chekUserType() {


    if (this.userType == 'Purofresh') {

      return true;


    }
    else {
      return false
    }
  }







  getProductByFranchaseId() {
    this.productService.getProductByFranchaseId()
      .subscribe(data => {
        this.data = data;

        console.log('franchasedata', this.data)
      })
  }

  onChangeFran(data) {
    console.log('onchangefran', data)
    this.productService.getProductByFranchaseIdForAdmin(data).subscribe
      (data => {
        this.data = data
      })
    console.log('onchange', data)
    this.franchaseId = data;

  }







  getFranchise() {
    this.productService.getFranchise()
      .subscribe(data => {
        this.franchise = data
        console.log('digitalproduct', data)
      })
  }




  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    console.log(this.screenHeight, this.screenWidth);
  }

  getAllmeasurementTypes() {
    this.productService.getAllMeasurement()
      .subscribe(data => {
        this.measuremntTypes = data;
      })
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
    } else if (status == "Approved") {
      for (let data of this.data1) {
        this.productsArray.push(data);
      }
      this.data = this.productsArray;
    }
  }

  // current date

  // current date


  getAllcategories() {
    this.Allactivecategories = [];
    this.categoryService.getAllCatalogs()
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

  // selectCheckBoxtisApproved(event) {


  // check box ends

  public addnewProduct(data) {
    console.log('passingaddingdata', data)


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
    //   } else {}
    this.spinner = true;
    const dataproduct = {

      "productName": data.productName,
      "productImage": data.productImage[0].base64.split(',')[1],

      "categoryId": data.categoryId,
      "categoryName": data.categoryName,
      "productDescription": data.productDescription,
      "shortDescription": data.shortDescription,
      "isActive": data.isActive,
      "deliveryCharges": 0,
      "leadDays": 0,
      "tax": 0,
      "productType": data.productType,
      "newArrival": data.newArrival,
      "trending": data.trending,
      "orderNo": 0,
      "franchaseId": this.franchaseId,
      "isDiscount": data.isDiscount,
      "productQuantities": this.orderForm.value.items
    }
    console.log('dataproductconst', dataproduct)
    this.productService.saveproduct(dataproduct).subscribe(data => {
      //  if(data == true) {
      console.log('true', data)
      this.spinner = false;
      Swal.fire({
        title: 'Added',
        text: 'Product Added successfully',
        icon: 'success',
        confirmButtonColor: '#ff8084'
      })
      this.getProductByFranchaseId()
      this.addproductflag = false;

      this.addproduct =

      {

        "productId": "",

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

        "franchaseId": "",

        "productQuantities": []


      }
      //  }
    });


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

    //  this.editproduct.productImg = data.productImage;
    console.log('productiedtdata functions', this.editproduct)
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
      //"productImage":  editProductData.productImage[0].base64.split(',')[1],

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
      "franchaseId": this.franchaseId,
      "isDiscount": editProductData.isDiscount,
      "productQuantities": this.orderForm.value.items
    }
    console.log('productEditDataconst', productEditData);
    this.productService.UpdateAllProduct(productEditData)
      .subscribe(data => {

        console.log('updateproductdata', data)
        //  if( data == true) {
        Swal.fire({
          title: 'Updated',
          text: 'Product updated successfully!',
          icon: 'success',
          confirmButtonColor: '#ff8084'
        });

        this.getProductByFranchaseId();

        this.editproductflag = false;
        //  }
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



  deleteProduct(fProductId) {
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
        this.productService.DeleteProductById(fProductId)
          .subscribe(success => {
            this.getProductByFranchaseId();
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

      "productId": "",
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

      "franchaseId": "",

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
    this.getProductByFranchaseId();
    this.editproduct.productImage = '';
    this.addproduct =

    {

      "productId": "",
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

      "franchaseId": "",

      "productQuantities": []


    }


  }

  closeModal() {
    this.barcodeproduct.discountAmount = this.actualamount;
    this.barcodeproduct.productName = this.productName;
  }






  onChangecate(data) {
    console.log('category', data)
    this.categoryId = data
  }






  generateBarcode(productData) {
    this.getdate()
    this.actualamount = productData.discountAmount;
    this.productName = productData.productName;
    console.log(this.productName)
    this.value = '';
    this.barcode = 1;
    this.viewflag = true;
    this.barcodeproduct = productData;
    this.barcodeproduct.productName = productData.productName.slice(0, 34)

    console.log("Sliced_ProductName", this.barcodeproduct.productName)

    // this.onSearchChange(this.productName)
  }

  getdate() {

    var date = new Date();

    //var date = new Date().toISOString().split('T')[0];
    //var timecalc = new Date();

    var todaysDate = this.datePipe.transform(date, "dd-MM-yy")
    var currentTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })


    console.log(this.datePipe.transform(date, "dd-MM-yyyy"));
    this.packedDate = todaysDate + " " + currentTime;
    console.log(this.packedDate);

    // let currentdate = currentDate.getDate();
    // let currentmonth = currentDate.getMonth() + 1; 
    // const currentyear = currentDate.getFullYear()
    // if(currentdate < 10) {
    //   this.currentdate1 = currentdate.toString();
    //   this.currentdate1 = "0" + this.currentdate1;
    // } else {
    //   this.currentdate1 = currentdate.toString();
    // }

    // if(currentmonth < 10) {
    //   this.currentmonth1 = currentmonth.toString();
    //   this.currentmonth1 = "0" + this.currentmonth1;
    // } else {
    //   this.currentmonth1 = currentmonth.toString();
    // }
    // this.todayDate = this.currentdate1 + '/' + this.currentmonth1 + '/' + currentyear;

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










}
