import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleUserService } from '../../services/roleuser.service';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-internal-user.component.html',
  styleUrls: ['./list-internal-user.component.scss']
})
export class ListInternalUserComponent implements OnInit {

  public userTypes = [
    'Purofresh',
    'Franchaise'
  ];

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

  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public data: any;
  public showedituser = false;
  public showadduser = false;
  public userForm: FormGroup;
  public userForm1: FormGroup;
  disableTextbox1 = true;
  disabled = false;
  submitted = false;
  franchaseName: "";
  franchise: any = [];
  franchaseId: "";
  disableTextbox = true;
  roletypes: any;
  addinternaluser: any;
  Franchaise: boolean = false;

  public userAddData: any = {
    // 'userCode': '',
    'firstName': '',
    'lastName': '',
    'email': '',
    'mobile': '',
    'password': '',
    'roleName': '',
    'franchaseId': '',
    // 'franchaseName':''
  }

  public userEditData: any = {
    'userId': '',
    // 'userCode': '',
    'franchaseId': '',
    'firstName': '',
    // 'franchaseName':'',
    'lastName': '',
    'email': '',
    'mobile': '',
    'roleName': '',
    'roleId': '',
    'userType': '',
    'sendOrdeSMS': false
  };

  constructor(private roleuserService: RoleUserService, private formBuilder: FormBuilder, public datePipe: DatePipe) {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      roleName: ['', Validators.required],
      franchaseName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(8)]],
      userType: ['', Validators.required]
    });

    this.userForm1 = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      roleName: ['', Validators.required],
      franchaseName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    this.getFranchise()
    this.getAllUsers();
    this.roleuserService.getAllRoles().subscribe(data => {
      this.roletypes = data;
    });
  }

  get f() { return this.userForm.controls; }
  get s() { return this.userForm1.controls; }

  getAllUsers() {
    this.roleuserService.getAllUsers().subscribe(data => {
      this.data = data;
    })
  }


  getFranchise() {
    this.roleuserService.getFranchise().subscribe(data => {
      this.franchise = data
    })
  }


  getrolename(data) {
    this.roletypes.forEach(element => {
      if (element.roleId == data) {
        this.userAddData.roleName = element.roleName
        var x: string = element.userType;
        this.Franchaise = (x === "Franchaise") ? true : false;
      }
    });
  }

  AddUser(roleAddData) {
    this.submitted = true;
    if (this.userForm.valid) {
      const RoleAddData = {
        'roleId': roleAddData.roleId,
        'franchaseId': roleAddData.franchaseId,
        'roleName': this.userAddData.roleName,
        'firstName': roleAddData.firstName,
        'lastName': roleAddData.lastName,
        'email': roleAddData.email,
        'mobile': roleAddData.mobile,
        'password': roleAddData.password,
        'sendOrderSMS': roleAddData.sendOrderSMS
      };

      this.roleuserService.saveUser(RoleAddData).subscribe(data => {
        this.getAllUsers();
        swal.fire({
          title: 'User Added!',
          text: 'Your file saved Successfully!',
          icon: 'success'
        });
        this.showadduser = false;
      }, error => {
        swal.fire('Error!', 'error', 'warning');
      });
    }
  }

  editUser(user) {
    this.submitted = false;
    this.showedituser = true;
    this.userEditData = user;
    // console.log(user.roleId);
    // console.log(this.roletypes);
    this.getrolename(user.roleId)
    
  }

  public userUpdateData(userEditData) {
    this.submitted = true;
    if (this.userForm1.valid) {
      const UserEditData = {
        'userId': userEditData.userId,
        'roleId': userEditData.roleId,
        'franchaseId': userEditData.franchaseId,
        'roleName': userEditData.roleName,
        'firstName': userEditData.firstName,
        'lastName': userEditData.lastName,
        'email': userEditData.email,
        'mobile': userEditData.mobile,
        'password': userEditData.password,
        'sendOrderSMS': userEditData.sendOrderSMS
      };
      this.roleuserService.updateUser(UserEditData).subscribe(success => {
        this.getAllUsers();
        swal.fire({
          title: 'User Updated!',
          text: 'Your file Updated Successfully!',
          icon: 'success'
        });
        this.showedituser = false;
      }, error => {
        swal.fire('Error!', 'error', 'warning');
      });
    }
  }

  deleteUser(userId) {
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
        this.roleuserService.DeleteUserById(userId)
          .subscribe(success => {
            this.getAllUsers();
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

  adduser() {
    this.Franchaise = false;
    this.submitted = false;
    this.showadduser = true;
    this.userAddData = {
      'firstName': '',
      'lastName': '',
      'email': '',
      'mobile': '',
      'password': '',
      'roleId': '',
      'roleName': '',
      'franchaseId': '',
      'sendOrderSMS': false
    };
  }

  closeuser() {
    this.showedituser = false;
    this.showadduser = false;
    this.getAllUsers();
  }

  toggleDisable() {
    this.disableTextbox = !this.disableTextbox;
    this.disabled = !this.disabled;
  }

  // onUserTypechange(userType) {
  //   this.Franchaise = (userType === "Franchaise") ? true : false;
  // }

}
