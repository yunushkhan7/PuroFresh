import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-digital-category',
  templateUrl: './digital-category.component.html',
  styleUrls: ['./digital-category.component.scss']
})
export class DigitalCategoryComponent implements OnInit {

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


  public closeResult: string;
  public digital_categories = []
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public data: any;
  public EditFlag = false;
  public AddFlag = false;
  categoryAddForm: FormGroup;
  categoryUpdateForm: FormGroup;
  activeCategory: any = ['All', 'Active', 'InActive'];
  spinner = false;

  public AddData: any = {
    'categoryName': '',
    'categoryImg': '',
    'isActive': '',
    'leadDays': '',
    'ordernum': ''
  }

  public categoryEditdata: any = {
    'categoryId': '',
    'categoryName': '',
    'categoryImg': '',
    'isActive': '',
    'leadDays': '',
    'ordernum': ''
  }

  size: any;
  width: number;
  height: number;
  convertimage: any;
  promoimg: any;
  imagemessage = false;
  promotionimage: any;
  imgdata: any;
  categoryArray: any[];
  data1: any;
  NocategoryName: boolean = true;

  constructor(private categoryService: CategoryService, public fb: FormBuilder) {
    this.categoryAddForm = this.fb.group({
      categoryName: ['', Validators.required],
      categoryImg: [null, Validators.required],
      IsActive: ['', Validators.required],
      leadDays: [''],
      ordernum: ['', Validators.required]
    });

    this.categoryUpdateForm = this.fb.group({
      categoryName: ['', Validators.required],
      categoryImage: [null],
      IsActive: ['', Validators.required],
      leadDays: [''],
      ordernum: ['', Validators.required]
    })
  }


  ngOnInit() {
    this.getcategorydata();
  }

  public getcategorydata() {
    this.spinner = true;
    this.categoryService.getAllCatalogs()
      .subscribe(data => {
        this.spinner = false;
        this.data = data;
        this.data1 = data;
        console.log(this.data)
      });
  }

  SelectStatus(status) {
    this.categoryArray = [];
    if (status == 'Active') {
      for (let data of this.data1) {
        if (data.isActive == true) {
          this.categoryArray.push(data);
        }
      }
      this.data = this.categoryArray;
    } else if (status == 'InActive') {
      for (let data of this.data1) {
        if (data.isActive == false) {
          this.categoryArray.push(data);
        }
      }
      this.data = this.categoryArray;
    } else {
      for (let data of this.data1) {
        this.categoryArray.push(data);
      }
      this.data = this.categoryArray;
    }
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
            this.AddData.categoryImg = '';
            this.categoryEditdata.categoryImage = ''
          }
        };

        this.promoimg.src = fr.result; // This is the data URL
      };
      fr.readAsDataURL(image);
    }
  }

  categorynameCheck(e) {
    this.NocategoryName = false;
    for (let data of this.data) {
      if (data.categoryName == e) {
        this.NocategoryName = true;
        this.AddData.leadDays = '';
        this.AddData.isActive = '';
        this.AddData.ordernum = '';
        this.AddData.leadDays = '';
      }
    }
  }

  public addcategory(categoryAdddata) {
    this.spinner = true;
    if (this.categoryAddForm.valid && this.NocategoryName == false) {
      var leadday = 0;
      if (categoryAdddata.leadDays != undefined && categoryAdddata.leadDays != '') {
        leadday = categoryAdddata.leadDays
      }
      var ordernumforsending = 0;
      if (categoryAdddata.ordernum != undefined && categoryAdddata.ordernum != '') {
        ordernumforsending = categoryAdddata.ordernum
      }
      const categoryAddData = {
        "categoryName": categoryAdddata.categoryName,
        "categoryImg": categoryAdddata.categoryImg[0].base64.split(',')[1],
        "IsActive": categoryAdddata.isActive,
        "leadDays": leadday,
        "orderNo": ordernumforsending,
      }
      console.log(categoryAddData)
      this.categoryService.saveCategory(categoryAddData)
        .subscribe(data => {
          this.spinner = false;
          if (data == true) {
            Swal.fire({
              title: 'Added',
              text: 'Category Saved Successfully!',
              icon: 'success',
              confirmButtonColor: '#ff8084'
            });
            this.getcategorydata()
            this.AddFlag = false;
          }
        });
    }
  }

  public edit(data) {
    this.EditFlag = true;
    this.imagemessage = false;
    // this.categoryEditdata.categoryImg ="";
    this.categoryEditdata.categoryName = data.categoryName;
    this.categoryEditdata.categoryId = data.categoryId;
    this.categoryEditdata.isActive = data.isActive;
    this.categoryEditdata.leadDays = data.leadDays;
    this.categoryEditdata.ordernum = data.orderNo;
    console.log(data)
  }

  UpdateCategory(categoryEditdata) {
    this.spinner = true;
    if (this.categoryUpdateForm.valid) {
      if (categoryEditdata.categoryImage != null) {
        categoryEditdata.categoryImage = categoryEditdata.categoryImage[0].base64.split(',')[1]
      }

      const categoryEditData = {
        "categoryId": this.categoryEditdata.categoryId,
        "categoryName": categoryEditdata.categoryName,
        "categoryImg": categoryEditdata.categoryImage,
        "IsActive": categoryEditdata.isActive,
        "leadDays": categoryEditdata.leadDays,
        "orderNo": categoryEditdata.ordernum
      }
      console.log(categoryEditData)
      this.categoryService.saveCategory(categoryEditData)
        .subscribe(data => {
          this.spinner = false;
          if (data == true) {
            Swal.fire({
              title: 'Updated',
              text: 'Category Updated Successfully!',
              icon: 'success',
              confirmButtonColor: '#ff8084'
            });
            this.getcategorydata();
            this.EditFlag = false;
          }
        })
    }
  }

  deleteCatagory(Categoryid) {
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
        this.categoryService.DeleteCatagoryById(Categoryid)
          .subscribe(success => {
            this.getcategorydata();
            Swal.fire(
              'Deleted',
              'Category has been deleted.',
              'success');
          }, error => {
            Swal.fire('Error!', 'error', 'warning');
          });
      }
    });
  }

  public addcategorybtn() {
    this.imagemessage = false;
    this.NocategoryName = false;
    this.AddFlag = true;
    this.AddData = {
      'categoryName': '',
      'categoryImg': '',
      'isActive': ''
    }
  }

  public close() {
    this.EditFlag = false;
    this.AddFlag = false;
    this.AddData = {
      'categoryName': '',
      'categoryImg': '',
      'isActive': ''
    }
  }

}
