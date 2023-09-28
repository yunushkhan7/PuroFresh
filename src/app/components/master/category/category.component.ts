import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,  Validators, FormBuilder }  from '@angular/forms';
// import { NotificationsService } from '../../services/notifications.service';
 import swal from 'sweetalert2';
import { MasterCategoryService } from '../../services/mastercategory.service';
import { UploadService } from '../../services/upload.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class  categoryComponent implements OnInit {

  addCatagory: FormGroup;
  submitted = false;

  public Addfran = false;
  public Editfran = false;
  categoriees: any = []
  categoryName:"";
  // categoryImage:"";
  file = "image.jpg";
  categoryImage = "";
  public data: any;
  public rowsOnPage = 5;
  public filterQuery = '';
  public sortBy = '';
  public progress: number;
  public message: string;
  showMsg: boolean = false;
  masterCategoriesId: any;


  public addCate: any = {
    'categoryImage': '',
    'categoryName': '',
  }



  public editcate: any = {
    
    'categoryImage': '',
    'categoryName': '',
  }

  
 
  constructor(private formBuilder: FormBuilder, private mastercategoryService: MasterCategoryService) {
   
    this.addCatagory = this.formBuilder.group({
    
      cateName: ['', Validators.required, ],
      cateImage: ['', Validators.required]
      
      
  });

  }

  ngOnInit(){
this.getMasterCategory()
// this.uploadImage()
  }


// uploadImage(){
//   this.mastercategoryService.uploadImage(FormData)
//   .subscribe(data => {
//     console
//   })
// }




  getMasterCategory(){
    this.mastercategoryService.getMasterCategory()
    .subscribe(data => {
      this. categoriees = data
      console.log('sample', data)
    })
  }

  get f() { return this.addCatagory.controls; }

  onSubmit(){


    this.submitted = true;

        // stop here if form is invalid
        if (this.addCatagory.invalid) {
            return;
        }


    const datatosend: any = {
       "categoryName":this.categoryName,
       "categoryImage": this.categoryImage
    }
    console.log('datatosend',datatosend)
    this.mastercategoryService.addMasterCategory(datatosend)
    .subscribe(data => {
      console.log('addcate', data)
      {
        swal.fire({
          title: 'Added',
          text: 'Your category  is Added',
          icon: 'success'
        });
        this.getMasterCategory()
        this.Addfran = false;
      }
    })
  }

  

  add(){
    this.Addfran = true;
    this.Editfran = false;
  }

  edit(category){
    this.Editfran = true;
    this.Addfran = false;
    this.editcate = category
  }
 
   

  cancel(){
    this.Addfran = false;
    this.Editfran = false
    
  }


delete(masterCategoriesId){
  swal.fire({
    title: 'Are you sure?',
    text: 'You want to delete',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#13c9ca',
    cancelButtonColor: '#ff8084',
    confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.value){
      this.mastercategoryService.deleteCategory(masterCategoriesId)
      .subscribe(success => {
      this.getMasterCategory();
      if(success){
      swal.fire(
      'Deleted',
      'Franchise has been deleted',
      'success'
      );
      }
      
      
      });
      }
      });
}
  

     

  updatecategory(editcate){

    const update: any = {
      "categoryImage":this.editcate.categoryImage,
      "categoryName":this.editcate.categoryName
    }
    
console.log('update',editcate)
this.mastercategoryService.updateMasterCategory(update)
.subscribe(data => {
  console.log('data',data)
  if(  data == true ){
    swal.fire({
      title: 'Updated',
      text: 'Category Updated Successfully!',
      icon: 'success',
      confirmButtonColor: '#ff8084'
    });
    // this.getMasterCategory();
    // this.updatecategory(update)
    this.Editfran = false;
  }
})
  }
     
        
  public uploadFile = (files) => {
    console.log('FileSSATA',files)
   
    
    if (files.length === 0) {
      return;
      }
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
     this.mastercategoryService.uploadImage(formData).
     subscribe(res=>{

      
       this.categoryImage=res
      //  swal.fire({
      //   title: 'File Upload',
      //   text: 'Your file uploaded Successfully!',
      //   icon: 'success'
      // });
      
       console.log('ImageNameResponse',this.categoryImage)
     
      
     })
     
   console.log('uploaded')
    
    }
   

   

}
