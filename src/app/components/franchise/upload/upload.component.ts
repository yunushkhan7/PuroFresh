import { Component, OnInit } from '@angular/core';
import { FormGroup,  Validators, FormBuilder }  from '@angular/forms';
// import { NotificationsService } from '../../services/notifications.service';
 import swal from 'sweetalert2';
import { UploadService } from '../../services/upload.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public stateList:any = [];
public districtList: any = [];
file
public districtId: ''
public progress: number;


 
  constructor(private formBuilder: FormBuilder,private uploadService: UploadService) {
   
  }

  ngOnInit(){
    this.getAllStates() 

  }

  getAllStates() {
    this.uploadService.getAllStates()
    .subscribe( data => {
      this.stateList = data;
      console.log("sample data",data)
    })
  }


  public  onStateChange(stateId){
    console.log('statid', stateId)
    this.uploadService.getAllDistrict(stateId)
    .subscribe(response => {
      this.districtList = response
      console.log('districtList', this.districtList)
    })

      }
   
  

      public onDistrictChange(districtId){
        console.log('districtId', districtId)
        this.districtId = districtId
      }

 
      public uploadFile = (files) => {
        if (files.length === 0) {
        return;
        }
        let fileToUpload = <File>files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        this.file = formData
     console.log('uploaded')
    


        }
        
        
        onSubmit(){

this.uploadService.uploadAreaPincode(this.districtId,this.file)
.subscribe(text => {
  console.log('result', text)
if(text=="Successfully Uploaded"){
  swal.fire({
    title: 'File Upload',
    text: 'Your file uploaded Successfully!',
    icon: 'success'
  });
}
 
})  


        }



}
