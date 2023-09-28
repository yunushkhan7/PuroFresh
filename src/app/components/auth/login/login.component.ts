import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../guards/auth.service';
import { UserService } from '../../services/user.service';
import swal from 'sweetalert2';
import { ProfileComponent } from '../../setting/profile/profile.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public menuList: any = [];
  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  loginUrl: string;
  submitted = false;
  data: any;

  public logindata = {
    email: '',
    password: '',
    mobileNo: '',
  };

  formObject = {
    email: '',
    mobileNo: '',
    password: ''
  };

  emailPattern = /^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|(\d+$)$/;
  userDetails: any;

  constructor(private formBuilder: FormBuilder, private router: Router, public authService: AuthService, public userService: UserService, public profileComponen: ProfileComponent) { }

  owlcarousel = [
    {
      title: "Welcome to purofresh",
      desc: "Healthy and Hygiene products | Pure & fresh all the time",
    }
  ]
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [this.formObject.email, [Validators.required, Validators.pattern(this.emailPattern)]],
      password: [this.formObject.password, [Validators.required, Validators.minLength(4)]]
    });
    this.returnUrl = '/dashboard/default';
    this.loginUrl = 'auth/login';
  }

  get f() { return this.loginForm.controls; }

  public SignInBtn(logindata) {
    this.submitted = true;
    if (this.loginForm.valid) {
      if (Number(logindata.email)) {
        this.logindata.mobileNo = this.logindata.email;
        this.logindata.email = null;
        this.logindata.password = this.logindata.password;
      } else {
        this.logindata.mobileNo = null;
        this.logindata.email = this.logindata.email;
        this.logindata.password = this.logindata.password;
      }
      this.authService.loggedIn(this.logindata)
        .subscribe(res => {
          this.data = res;
          console.log(this.data)  
          this.profileComponen.getProfileData(this.data)
          this.menuList = this.data.navigationList

          //   setInterval( () => {
          //   console.log(this.data, 'not timeout');
          // }, 30000)
          if (this.data != null) {
            localStorage.setItem('token', this.data.token);
            localStorage.setItem('userType', this.data.userType)
            localStorage.setItem('franchaseId', this.data.franchaseId)
            localStorage.setItem('menuList', JSON.stringify(this.menuList));

            localStorage.setItem('isLoggedIn', 'true');
            const hours = 24; // Reset when storage is more than 24hours
            const now: any = new Date().getTime();
            const setupTime: any = localStorage.getItem('setupTime');
            let empid = '';
            if (this.logindata.email !== '') {
              empid = this.logindata.email;
            } else {
              empid = this.logindata.mobileNo;
            }
            delete this.data.password;
            localStorage.setItem('userDetails', JSON.stringify(this.data));
            //  this.getUserDetails(empid);
            localStorage.setItem('email', this.logindata.email);
            localStorage.setItem('mobileNo', this.logindata.mobileNo);
            //  this.getUserDetails(empid);
            if (setupTime == null) {
              localStorage.setItem('setupTime', now);
            } else {
              if (now - setupTime > hours * 60 * 60 * 1000) {
                localStorage.clear();
                localStorage.setItem('setupTime', now);
                this.router.navigate([this.loginUrl]);
              }
            }
            this.router.navigate([this.returnUrl]);
          } else {
            this.message = 'Please check your E-mail Id or Mobile No and Password';
            // this.loginForm.reset();
          }
        }, error => {
          swal.fire('Error!', 'Something Went Wrong', 'warning');
          // swal.fire('Login Session Expired', 'Please login Again', 'warning');
        });
    }
  }

  public getUserDetails(userId): any {
    this.userService.getUserDetails(userId)
      .subscribe(data => {
        this.userDetails = data;
        console.log(this.userDetails)
        delete this.userDetails.password;
        localStorage.setItem('employeeDetails', JSON.stringify(this.userDetails));
      }, error => {
        swal.fire('Error!', 'Something_Went Wrong', 'warning');
      });
  }

}
