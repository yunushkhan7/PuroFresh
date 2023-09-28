import { Component, OnInit } from '@angular/core';
import {fadeInOutTranslate} from 'src/app/shared/service/animation';
import { UserService} from '../../components/services/user.service'
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import swal from 'sweetalert2'
import { DeliveryBoyService } from '../services/deliveryboy.service';

@Component({
  selector: 'app-deliveryboy',
  templateUrl: './deliveryboy.component.html',
  styleUrls: ['./deliveryboy.component.scss'],
  animations: [fadeInOutTranslate]
})

export class DeliveryBoyComponent implements OnInit {
  userType:any
  franchise: any = [];

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
  
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public addboyflag = false;
  public editboyflag = false;
  data: any;
  public boyForm: FormGroup;
  franchaseId=localStorage.getItem("franchaseId");

  public boyAddData: any = {
    'franchaseId':'',
    'name': '',
     'email': '',
     'mobile': '',
     'address': '',
     'licenseNo': '',
     'isActive': ''
   };
 
   public boyEditData: any = {
    'franchaseId':'',

     'deliveryBoyId': '',

     'name': '',
     'email': '',
     'mobile': '',
     'address': '',
     'licenseNo': '',
     'isActive': ''
   };
  deliverylist = false;
  vieweditManifestData: any;
  editmanifestId: any;
  deliveryboyId: any;
  paymentStatus: any;
  data1: any;
  statusarrayData: any = [];

  constructor(public deliveryboyService: DeliveryBoyService, private formBuilder: FormBuilder) {
    this.boyForm = this.formBuilder.group({
        name: ['', Validators.required],
        mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        address: ['', Validators.required],
        isActive: ['', Validators.required],
        licenseNo: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.GetAllBoys();
    this.getpayStatus();
    this.getFranchise()
    this.userType=localStorage.getItem("userType")

  }





  getFranchise(){
    this.deliveryboyService.getFranchise()
    .subscribe(data => {

      this.franchise = data
      console.log('getfranchaise', data)

      
    })
  }



  GetAllBoys() {
    this.deliveryboyService.getAlldelvieryBoys()
    .subscribe( data => {
      this.data = data;
    })
  }

  getpayStatus() {
    this.deliveryboyService.getpaymentStatus()
    .subscribe( data => {
      this.paymentStatus = data;
      const Addpaymentstatus = [{paymentCode: 'All', paymentStatusData: 'All'}]
      this.paymentStatus = this.paymentStatus.concat(Addpaymentstatus);
    })
  }

  SelectPayStatus(statuscode) {
    this.statusarrayData = [];
   for(let status of this.data1) {
     if( status.paymentCode == statuscode) {
      this.statusarrayData.push(status);
    } else if(statuscode == 'All') {
      this.statusarrayData.push(status)
    }
    this.data = this.statusarrayData;
     }
  }

  AddBoy(AddBoyData) {
    if (this.boyForm.valid){}

      const boy = {
        "franchaseId":this.franchaseId,
        "name":AddBoyData.name,
        "email":AddBoyData.email,
"mobile":AddBoyData.mobile,
"address":AddBoyData.address,
"licenseNo":AddBoyData.licenseNo,
"isActive":AddBoyData.isActive,
      }
      console.log('boy',boy)
    this.deliveryboyService.addupdateDeliveryBoy(boy)
         .subscribe( data => {
           this.GetAllBoys();
           this.boyAddData = {
           'franchaseId':'',
            'name': '',
            'email': '',
            'mobile': '',
            'address': '',
            'licenseNo': '',
            'isActive': ''
          };

         swal.fire({
           title: 'Added',
           text: 'Delivery boy saved successfully!',
           icon: 'success'
         });
         this.addboyflag = false;
           }, error => {
             swal.fire('Error!', 'error', 'warning');
           });
    }

  editBoyData(boy) {
    this.editboyflag = true;
    this.boyEditData = boy;
  }

  boyUpdateData(boyEditData) {
    if( this.boyForm.valid){}

const boy = {
  "franchaseId":this.franchaseId,
  "name":boyEditData.name,
  "email":boyEditData.email,
  "mobile":boyEditData.mobile,
  "address":boyEditData.address,
  "licenseNo":boyEditData.licenseNo,

}


console.log('boyedit', boy)



    this.deliveryboyService.addupdateDeliveryBoy(boy)
         .subscribe( data => {
           this.GetAllBoys();
         swal.fire({
           title: 'Updated',
           text: 'Delivery boy updated successfully!',
           icon: 'success'
         });
         this.editboyflag = false;
           }, error => {
             swal.fire('Error!', 'error', 'warning');
           });
    
  }

  deleteBoy(deliveryBoyId) {
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
        this.deliveryboyService.deleteDeliveryBoyById(deliveryBoyId)
        .subscribe(success => {
          this.GetAllBoys();
        swal.fire(
          'Deleted',
          'Delivery boy has been deleted.',
          'success');
        },  error => {
          swal.fire('Error!', 'error', 'warning');
       });
      }
    });
  }

  manifestData(deliveryBoyId) {
    this.filterQuery = ''
    this.deliveryboyId =  deliveryBoyId;
    this.data = [];
    this.deliverylist = true;
      console.log(deliveryBoyId)
      this.deliveryboyService.getdeliveryIdmanifest(deliveryBoyId)
      .subscribe( data => {
       this.data = data;
       this.data1 = data;
       console.log(this.data)
      })
  }

  editManifestData(viewmanifestData){
    this.editmanifestId = viewmanifestData.manifestId
      this.vieweditManifestData = viewmanifestData.paymentsreceived;
      console.log( this.vieweditManifestData)
  }

  submitpayment() {
    console.log(this.editmanifestId)
    swal.fire({
      title: 'Are you sure?',
      text: 'You want to submit',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deliveryboyService.getManifestData(this.editmanifestId)
        .subscribe(success => {
          this.manifestData(this.deliveryboyId);
        swal.fire(
          'Success',
          'Succesfully payment received',
          'success');
        },  error => {
          swal.fire('Error!', 'error', 'warning');
       });
      }
    });
  }

  adddeliveryboy() {
    this.addboyflag = true
  }

  closeboy() {
    this.filterQuery = ''
    this.GetAllBoys();
    this.deliverylist = false
    this.addboyflag = false;
    this.editboyflag = false;
    this.boyAddData = {
      'franchaseId':'',
      'name': '',
      'email': '',
      'mobile': '',
      'address': '',
      'licenseNo': '',
      'isActive': ''
    };
  
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
       this.deliveryboyService.getAlldelvieryBoysfranchiseId(data).subscribe
        (data => {
    this.data = data
       })
       console.log('onchange',data)
        this.franchaseId=data;
    
      } 

}

