import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NotificationsService } from '../../services/notifications.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-push-notifications',
  templateUrl: './push-notifications.component.html',
  styleUrls: ['./push-notifications.component.scss']
})
export class PushNotificationsComponent implements OnInit {
  userType: any

  // adddiscounts = []
  submitted = false;
  addproduct = true
  editproduct = false
  notificationaddForm: FormGroup;
  notificationeditForm: FormGroup;
  spinner = false;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public data: any;
  franchaseId = localStorage.getItem("franchaseId");


  public addNotification: any = {

    'franchaseId': '',
    'header': '',
    'body': '',
    // 'time':'',

  }

  public editNotification: any = {
    'notificationsId': '',
    'header': '',
    'body': '',
    // 'time':'',
  }
  // private discountService: DiscountService
  constructor(private notificationsService: NotificationsService, private formBuilder: FormBuilder) {
    this.notificationaddForm = this.formBuilder.group({
      //  userCode: ['', Validators.required],
      header: ['', Validators.required],
      body: ['', Validators.required],
      date: [null, Validators.required]
      // time: ['', Validators.required],
    });

    // this.notificationeditForm = this.formBuilder.group({
    //   //  userCode: [''],
    //   header: ['', Validators.required],
    //   body: ['', Validators.required],
    //   // time: ['', Validators.required],
    // });
  }

  ngOnInit() {
    this.getAllNotificationsRanges()
    this.userType = localStorage.getItem("userType")
    this.getFranchise()

  }
  getFranchise() {
    this.notificationsService.getFranchise()
      .subscribe(data => {
        console.log('franchise', data)
      })
  }


  getAllNotificationsRanges() {
    this.notificationsService.getAllNotificationsRanges()
      .subscribe(data => {
        this.data = data;
        console.log("sample data", data)
      })
  }

  // date time //
  dateChanged(eventDate: string): Date | null {
    return !!eventDate ? new Date(eventDate) : null;
  }
  // date time//

  // button disabled 
  // isDisabled(addNotification) : boolean {
  //   return addNotification && addNotification.notificationaddForm === name;
  //  }
  // button disabled




  Addproduct() {
    //  this.submitted =  true;
    this.addproduct = true;
    this.editproduct = false;
    this.spinner = true;
    this.addNotification = {

      'header': '',
      'body': '',
      // 'time':'',

    }
  }

  close() {
    this.addproduct = false;
    this.editproduct = false;
    this.spinner = true;
    //  this.getAllDiscountRanges();

  }
  back() {
    this.addproduct = false;
    this.editproduct = false;
  }
  edit(notificationData) {
    this.editproduct = true;
    this.spinner = true;
    this.editNotification = notificationData;


  }


  delete(notificationData) {
    this.addNotification = notificationData

  }








  deleteNotification(notificationsId) {
    swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.notificationsService.deleteNotificationsRange(notificationsId)
          .subscribe(success => {
            this.getAllNotificationsRanges()
            swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success');
          }, error => {
            swal.fire('Error!', 'error', 'warning');
          });
      }
    });
  }


  //  AddDiscount(addDiscount){
  //    this.submitted = true;
  //    if (this.discountaddForm.valid){
  //      const AddDiscount = {
  //        'minAmount': addDiscount.minamount,
  //        'maxAmount': addDiscount.maxAmoumt,
  //        'isActive': addDiscount.isActive,
  //        'allowDiscount': addDiscount.discountId,

  //      }
  //    }


  //  }
  EditNotification(editdiscountrangedata) {
    this.submitted = true;
    if (this.notificationeditForm.valid) {
      const RoleAddData = {
        'notificationsId': editdiscountrangedata.discountId,
        'header': editdiscountrangedata.minAmount,
        'body': editdiscountrangedata.maxAmount,
        // 'time': editdiscountrangedata.allowDiscount,

      };
      this.notificationsService.updateNotificationsRange(editdiscountrangedata)
        .subscribe(data => {
          this.getAllNotificationsRanges()
          swal.fire({
            title: 'Range amount Updated',
            text: 'Your file Update Successfully!',
            icon: 'success'
          });
          this.editproduct = false;
        }, error => {
          swal.fire('Error!', 'error', 'warning');
        });
    }
  }



  AddNotification(notificationsrangedata) {
    this.submitted = true;
    if (this.notificationaddForm.valid) {
      const RoleAddData = {
        "franchaseId": this.franchaseId,

        'header': notificationsrangedata.header,
        'body': notificationsrangedata.body,
        // 'time': notificationsrangedata.time,

      };
      this.notificationsService.addNotificationsRange(RoleAddData)
        .subscribe(data => {
          this.getAllNotificationsRanges()
          swal.fire({
            title: 'Notification',
            text: 'Notification Pushed  Successfully!',
            icon: 'success'
          });
          this.addproduct = true;
        }, error => {
          swal.fire('Error!', 'error', 'warning');
        });
    }
  }



  // this.getAllDiscountRanges();



  chekUserType() {


    if (this.userType == 'Purofresh') {

      return true;


    }
    else {
      return false
    }
  }





}
