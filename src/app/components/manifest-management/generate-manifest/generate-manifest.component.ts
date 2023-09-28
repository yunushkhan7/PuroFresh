import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ManifestService } from '../../services/manifest.service';

@Component({
  selector: 'app-generate-manifest',
  templateUrl: './generate-manifest.component.html',
  styleUrls: ['./generate-manifest.component.scss']
})
export class GenerateManifestComponent implements OnInit {
  franchaseId=localStorage.getItem("franchaseId");
  public rowsOnPage = 10;

  franchise: any = [];
  public filterQuery = '';
  public sortBy = '';
  public orderinvoiceids : any = [];
  public deliveryboy: any;
  showOrderList = false;
  driverId: any;
  allsots: any;
  Pincodes: any;
  areas: any;
  addressId: any
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  public manifestForm: FormGroup;
  selectNodes = {
    'wareHouseId': '',
    'deliveryBoyId': '',
    'slotId': '',
    'pincode': ''
  }
  data: any;
  selectedAll: any;
  warehouses: any;
  showPincodeFalg = false;
  selectedpincode: any;
  addflag = false;
  manifestData: any;
  editflag = false;
  manifeststatus: any;
  editManifestData: any;
  slotsEnable = false;
  addjobflag = false;
  manifestId: any;
  public printdata = {
    date: ''
  }

  public id = {
    'franchaseId':'',
    'runsheetId': '',
    'manifestId': '',
    'deliveryBoyId' : ''
    };

  manifesteditData: any;
  editmanifestID: any;
  deletejobsarray: any = [];
  warehouseId: any;
  editslotId: any;
  completedData: any;
  selectedSlotswarehouse: any;
  fullmanifestData: any;
  manifestsArray: any = [];
  invoiceData: any;
  spinner = false;
  editmanifestData: any;
  driverupdatebtn: boolean = false;
  userType:any

  constructor(public userService: UserService, public manifestService: ManifestService, public fb: FormBuilder) {
    this.manifestForm = this.fb.group({
      deliveryBoyId:  ['', Validators.required],
      wareHouseId:  ['', Validators.required],
      slotId:  ['', Validators.required],
      pincode:  ['', Validators.required]
    })
  }

  ngOnInit() {
    this.GetAllBoys();
    this.GetAllslots();
    this.Getallwarehouses();
    this.Getmanifests();
    this.getAllManifeststatus();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'pincode',
      textField: 'pincode',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: false
    };

    this.userType=localStorage.getItem("userType")
this.getFranchise()
  }




getFranchise(){
  this.manifestService.getFranchise()
  .subscribe(data => {
    this.franchise = data
  })
}




  Getmanifests() {
    this.getAllManifeststatus();
    this.manifestService.getmanifestDetails()
    .subscribe( data => {
      this.manifestData = data;
      this.fullmanifestData = data;
      console.log('manifestdata',this.manifestData)
    });
  }

  getAllManifeststatus() {
    this.spinner = true;
    this.manifestService.getManifestStatus()
    .subscribe( data => {
      this.spinner = false;
      this.manifeststatus = data;
      const manifeststatusAdd = [{manifestStatusCode: 'All',manifestStatusData: 'All'}]
      this.manifeststatus = this.manifeststatus.concat(manifeststatusAdd);
    });
  }



  onChangeFran(data){
    console.log('onchangefran',data)
       this.manifestService.getmanifestDetailsByfranchaseId(data).subscribe
        (data => {
    this.data = data
       })
       console.log('onchange',data)
        this.franchaseId=data;
    
      } 





  ManifestStatusData(status) {
    this.manifestsArray = [];
    console.log(status);
    if(status == 'NS'){
    for(let data of this.fullmanifestData) {
        if( data.manifestStatusCode == 'NS'){
          this.manifestsArray.push(data);
        }
    }
    this.manifestData = this.manifestsArray;
  } else if(status == 'CP'){
    for(let data of this.fullmanifestData) {
        if( data.manifestStatusCode == 'CP'){
          this.manifestsArray.push(data);
        }
    }
    this.manifestData = this.manifestsArray;
  } else if(status == 'CA'){
    for(let data of this.fullmanifestData) {
        if( data.manifestStatusCode == 'CA'){
          this.manifestsArray.push(data);
        }
    }
    this.manifestData = this.manifestsArray;
  } else if(status == 'IP'){
    for(let data of this.fullmanifestData) {
      if( data.manifestStatusCode == 'IP'){
        this.manifestsArray.push(data);
      }
  }
  this.manifestData = this.manifestsArray;
  } else {
    for(let data of this.fullmanifestData) {
        this.manifestsArray.push(data);
      }
  this.manifestData = this.manifestsArray;
  }
  }

  GetAllBoys() {
    this.manifestService.getActivedelvieryBoys()
    .subscribe( data => {

      this.deliveryboy = data;
      console.log('deliveryboys',data)

    });
  }

  Getallwarehouses() {
    this.manifestService.GetAllWareHouse()
    .subscribe( data => {
      this.warehouses = data;
      console.log(this.warehouses, 'get warehouse are coming');
    });
  }

  GetAllslots() {
    this.manifestService.getAllslots()
    .subscribe( data => {
      this.allsots = data;
      console.log( this.allsots);
    });
  }

  enable() {
    this.slotsEnable = true;
  }

  sendData(data) {
    this.warehouseId = data.wareHouseId;
    this.Pincodes = '';
    this.showOrderList = false;
    this.driverId = data.deliveryBoyId;
    this.selectedSlotswarehouse = {
      "wareHouseId": data.wareHouseId,
      "slotId": data.slotId
    }
    console.log(this.selectedSlotswarehouse);
    this.manifestService.sendSlotData(this.selectedSlotswarehouse)
    .subscribe( data => {
      this.showPincodeFalg = true
      this.Pincodes = data;
      this.Getmanifests();
    });
  }

  onItemSelect(item: any) {
    this.showOrderList = false;
    this.selectedpincode = [item]
  }

  onSelectAll(items: any) {
    this.showOrderList = false;
    this.selectedpincode = items;
  }

  onDeSelect(items) {
    this.showOrderList = false;
    console.log(items)
    this.data = [];
    console.log(items)
    for(let multiselect of items){
    for(let pincode of this.Pincodes){
      if( pincode.pincode != multiselect.pincode){
        this.selectedpincode = pincode.pincode
     //   this.data.push(...pincode.orderInvoices)
        console.log(this.data)
      }
    }
  }
  }

  GenerateManifestAddflag() {
    this.filterQuery = '';
    this.Getallwarehouses();
    this.addflag = true;
  }

  GenerateManifest(selectedpincode) {
    this.selectedAll = false;
      this.data = [];
      this.showOrderList = true;
      console.log(this.selectedpincode)
      for(let multiselect of  selectedpincode){
      for(let pincode of this.Pincodes){
        if( pincode.pincode == multiselect){
          this.data.push(...pincode.orderInvoices)
          console.log(this.data)
        }
      }
    }
  }

  selectAll() {
    for (var i = 0; i < this.data.length; i++) {
      this.data[i].selected = this.selectedAll;
      if(this.selectedAll == true){
      }
    }
  }

  checkIfAllSelected(orders) {
    this.selectedAll = this.data.every(function(item:any) {
        return item.selected;
    });
  }

  sendmanifestdatas(data){
    this.spinner = true;
    console.log(data)
    this.orderinvoiceids = [];
    for(let eachdata of data){
      if(eachdata.selected == true){
        const orderinvoice = eachdata.orderInvoiceId;
        this.orderinvoiceids.push(orderinvoice);
      }
    }
    if(this.orderinvoiceids.length != 0){
    const slotId = data[0].slotId;
    const GenerateManifestdata = {
      "wareHouseId":  this.warehouseId,
      "deliveryBoyId" : this.driverId,
      "slotId" : slotId,
      "OrderInvoiceIds": this.orderinvoiceids
    }
    console.log(GenerateManifestdata)
    this.manifestService.GenerateManifest(GenerateManifestdata).subscribe( data => {
      if(data){
      this.spinner = false;
       this.showOrderList = false;
       this.showPincodeFalg = false;
       this.back();
       this.Getmanifests();
      Swal.fire(
        'Success!',
        'Manifest Generated Successfully',
        'success');
      }
    })
  } else {
    Swal.fire(
      'Warning!',
      'Atleast select one suborder to generate Manifest',
      'warning'
      );
    }
  }

  deleteManifest(manifestId) {
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
      this.manifestService.DeleteManifestById(manifestId)
      .subscribe(success => {
      this.Getmanifests();
      Swal.fire(
        'Deleted',
        'Manifest has been deleted.',
        'success');
      }, error => {
        Swal.fire('Error!', 'error', 'warning');
      });
        }
      });
  }

  completeManifest(manifestId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to complete',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:  '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
  }).then((result) => {
    if (result.value) {
      this.manifestService.CompeleteManifestById(manifestId)
      .subscribe(success => {
        console.log(success)
      this.Getmanifests();
      Swal.fire(
        'Completed',
        'Manifest has been Completed.',
        'success');
      }, error => {
        Swal.fire('Error!', 'error', 'warning');
      });
        }
      });
  }

  driverbtn(){
    this.driverupdatebtn = true;
  }

  updateDrvier(ids) {
      console.log(ids)
     const DrvierUpdate = {
      'deliveryBoyId': ids.deliveryBoyId,
      'manifestId': ids.manifestId
     }
     console.log(DrvierUpdate)
      this.manifestService.UpdateManifest(DrvierUpdate).subscribe( data => {
        if(data == true){
          this.driverupdatebtn = false;
         this.showOrderList = false;
         this.showPincodeFalg = false;
         this.back();
         this.Getmanifests();
        Swal.fire(
          'Success!',
          'Delivery boy changed Successfully',
          'success');
        }
      })
  }

  editJobs(manifestData) {
    this.filterQuery = '';
    this.orderinvoiceids = [];
    this.editflag = true;
    this.editmanifestData = manifestData;
    this.editmanifestID = manifestData.manifestId;
    this.editslotId = manifestData.slotId;
    this.warehouseId = manifestData.wareHouseId;
    this.editManifestData = manifestData.jobDetails;
    this.getdetailsByslotId();
  }

  deletejobs(orderInvoiceId) {
    this.deletejobsarray = [];
    const deleteJob = {
      "manifestId": this.editmanifestID,
      "orderInvoiceId": orderInvoiceId
    }
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
  console.log(deleteJob)
    this.manifestService.deleteJobsById(deleteJob)
      .subscribe(success => {
        this.selectedSlotswarehouse = {
          "wareHouseId": this.warehouseId,
          "slotId":  this.editslotId
        }
        console.log(this.selectedSlotswarehouse);
        this.manifestService.sendSlotData(this.selectedSlotswarehouse)
        .subscribe( data => {
          this.showPincodeFalg = true
          this.Pincodes = data;
          this.Getmanifests();
        });
        for(let jobs of this.editManifestData) {
          console.log(jobs, orderInvoiceId )
          if (jobs.orderInvoiceId != orderInvoiceId ) {
           this.deletejobsarray.push(jobs);
          }
        }
      this.editManifestData = this.deletejobsarray;
      Swal.fire(
        'Deleted',
        'Job has been deleted.',
        'success');
      }, error => {
        Swal.fire('Error!', 'error', 'warning');
      });
        }
      });
  }

  getdetailsByslotId() {
    this.Pincodes = '';
    const selectedSlots = {
      "wareHouseId": this.warehouseId,
      "slotId": this.editslotId
    }
    console.log(selectedSlots)
    this.manifestService.sendSlotData(selectedSlots)
    .subscribe( data => {
      this.addjobflag = true;
      this.Pincodes = data;
      console.log(this.Pincodes)
    })
  }

  sendjobsData(data){
    this.spinner = true;
    console.log(data)
    this.orderinvoiceids = [];
    for(let eachdata of data){
      if(eachdata.selected == true){
        const orderinvoice = eachdata.orderInvoiceId;
        this.orderinvoiceids.push(orderinvoice);
      }
    }
    if(this.orderinvoiceids.length != 0){
    const GenerateManifestdata = {
      'franchaseId':this.franchaseId,
      "manifestId":  this.editmanifestID,
      "OrderInvoiceIds": this.orderinvoiceids
    }
    console.log(GenerateManifestdata)
    this.manifestService.UpdateManifest(GenerateManifestdata).subscribe( data => {
      if(data){
        this.spinner = false;
       this.showOrderList = false;
       this.showPincodeFalg = false;
       this.back();
       this.Getmanifests();
      Swal.fire(
        'Success!',
        'Added jobs successfully to Rs-no:' +  this.editmanifestData.runSheetId,
        'success');
      }
    })
  } else {
    Swal.fire(
      'Warning!',
      'Atleast select one suborder to add jobs',
      'warning');
    }
  }

  viewcompletedmanifest(manifestcompData) {
    this.completedData = manifestcompData.jobDetails;
    console.log(this.completedData)
  }

  closeMyModal() {
    this.driverupdatebtn = false;
  }

  back() {
    this.driverupdatebtn = false;
    this.filterQuery = '';
    this.Getmanifests();
    this.slotsEnable = false;
    this.showOrderList = false;
    this.showPincodeFalg = false;
    this.addflag = false;
    this.editflag = false;
    this.addjobflag = false;
    this.selectNodes = {
      'wareHouseId': '',
      'deliveryBoyId': '',
      'slotId': '',
      'pincode': ''
    }
  }

  manifestdetails(manifest) {
    this.id.runsheetId= manifest.runSheetId;
    this.id.manifestId= manifest.manifestId;
    this.id.deliveryBoyId = manifest.deliveryBoyId;
  }

  downloadpdf(manifestId) {
    this.manifestId = manifestId;
      this.manifestService.getinvoiceData(manifestId)
      .subscribe(data => {
      this.invoiceData = data;
      console.log(this.invoiceData);
      for(let data of this.invoiceData){
        console.log(data);
        for(let data1 of data.deliveryPList) {
          data1.measurementName = data1.measurementName.slice(0,1);
          if(data1.productName.length >= 24) {
            data1.productName = data1.productName.slice(0,24)
          }else{
            const len = 24 - data1.productName.length;
            for(let i=0 ; i<len ;i++){
              data1.productName = data1.productName + '';
            }
          }
        }
      }
      this.captureScreen();
     });
  }

  public captureScreen() {
    this.manifestService.getinvoiceData(this.manifestId)
      .subscribe(data => {
      this.invoiceData = data;
      console.log(this.invoiceData);
      for(let data of this.invoiceData){
        console.log(data);
        for(let data1 of data.deliveryPList) {
          data1.measurementName = data1.measurementName.slice(0,1);
          if(data1.productName.length >= 24) {
            data1.productName = data1.productName.slice(0,24)
          }else{
            const len = 24 - data1.productName.length;
            for(let i=0 ; i<len ;i++){
              data1.productName = data1.productName + '';
            }
          }
        }
      }
      const printContent = document.getElementById("contentToConvert").innerHTML;
      const WindowPrt = window.open('', '', 'left=0,top=0,width=auto,height=100%,toolbar=0,scrollbars=0,status=0');
      WindowPrt.document.write(printContent);
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
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
}
