import { Component, OnInit } from '@angular/core';
import { FormGroup,  Validators, FormBuilder }  from '@angular/forms';
// import { NotificationsService } from '../../services/notifications.service';
 import swal from 'sweetalert2';
import { FranchiseUserService } from '../../services/franchiseuser.service';
import { UploadService } from '../../services/upload.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class  UserComponent implements OnInit {

  franchise: any = [];
  public Addfran = false;
  public Editfran = false;
  franchaseName: "";
  constructor(private franchiseuserService: FranchiseUserService) {
   
  }

  ngOnInit(){
    this.getFranchise()
  }




  getFranchise(){
    this.franchiseuserService.getFranchise()
    .subscribe(data => {
      this.franchise = data
      console.log('fran', data)
    })
  }
 
  add(){
    this.Addfran = true;
    this.Editfran = false;
  

  }
 
   
edit(){
  this.Editfran = true;
  this.Addfran = false;
}

cancel(){
  this.Addfran = false;
  this.Editfran = false;
}

}
