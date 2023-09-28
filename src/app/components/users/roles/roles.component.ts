import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { RoleUserService } from '../../services/roleuser.service'
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})

export class RoleComponent implements OnInit {
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
    console.log("key");
    
    this.key = key;
    this.reverse = !this.reverse
  }

  public productids: any = [];
  roles: any = [];
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public addrole = false;
  public editrole = false;
  public userType = '';
  public data: any;
  roleName: "";
  roleInfo: "";
  //userType:"";
  type: any = []
  subModuleId: any = []
  public roleForm: FormGroup;
  submitted = false;
  newProductList: any;
  moduleName = "";
  dropdownEnabled = true;
  items: TreeviewItem[];
  items1: TreeviewItem[];
  items3: TreeviewItem[];
  values: number[];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 250,
  });
  emptyarray: boolean = false;


  public roleEditData: any = {
    'roleName': '',
    'roleInfo': '',
    'userType': this.userTypes,
    'subModuleId': [
      ''
    ]
  };

  public roleAddData: any = {
    'roleName': '',
    'userType': this.userTypes,
    'roleInfo': '',
    'subModuleId': [
      ''
    ]
  };

  newPermissions: any;

  constructor(public roleuserService: RoleUserService, private formBuilder: FormBuilder) {
    this.roleForm = this.formBuilder.group({
      roleName: ['', Validators.required],
      roleInfo: ['', Validators.required],
      userType: ['', Validators.required]
      // roleDisc:['', (Validators.required)],

    });
  }

  public settings = {
    columns: {
      avatar: {
        title: 'Avatar',
        type: 'html'
      },
      fName: {
        title: 'First Name',
      },
      lName: {
        title: 'Last Name'
      },
      email: {
        title: 'Email'
      },
      last_login: {
        title: 'Last Login'
      },
      role: {
        title: 'Role'
      },
    },
  };

  ngOnInit() {
    // this.items = this.getBooks();
    this.getAllRoles()
    this.products
    this.getAllUserModules()
    this.items = [];
    this.items1 = [];

  }

  getAllUserModules() {
    this.roleuserService.getAllUserModules()
      .subscribe(data => {
      })
  }

  get f() { return this.roleForm.controls; }

  public products() {
    this.roleuserService.getAllUserModules()
      .subscribe(data => {
        this.data = data;
        this.data.forEach(x => {
          const y = x;
          const childrenNodes = [];
          x.submoduleslist.forEach(q => {
            const r = q;
            const childNodes = new TreeviewItem({ text: r.subModuleName, value: r.subModuleId, checked: r.status });
            childrenNodes.push(childNodes);
            childNodes.checked = false;
          });
          const parentNode = new TreeviewItem({ text: y.moduleName, value: y.moduleId, checked: y.status, children: childrenNodes });
          parentNode.checked = false;
          parentNode.collapsed = true;
          this.items.push(parentNode);
        });
      });
  }

  getAllRoles() {
    this.roleuserService.getAllRoles()
      .subscribe(data => {
        this.roles = data;
      })
  }

  public AddRole(roleAddData) {
    this.submitted = true;
    if (this.roleForm.valid) {
      const RoleAddData = {
        'roleName': roleAddData.roleName,
        'roleInfo': roleAddData.roleInfo,
        'userType': this.userType,
        'subModuleId': this.newProductList
      };

      this.roleuserService.saveRole(RoleAddData)
        .subscribe(data => {
          this.closeRole();
          this.getAllRoles();
          swal.fire({
            title: 'Role Added!',
            text: 'Your file saved Successfully!',
            icon: 'success'
          });
          this.addrole = false;
        }, error => {
          swal.fire('Error!', 'error', 'warning');
        });
    }
  }

  public editRole(role) {
    const roleId = role.roleId
    this.editrole = true;
    this.roleEditData = role;
    this.items1 = [];
    this.roleuserService.getModulesByRoleId(roleId)
      .subscribe(data => {
        this.data = data;
        this.data.forEach(x => {
          const y = x;
          const childrenNodes = [];
          x.submoduleslist.forEach(q => {
            const r = q;
            const childNodes = new TreeviewItem({ text: r.subModuleName, value: r.subModuleId, checked: r.isChecked });
            childrenNodes.push(childNodes);
          });
          const parentNode = new TreeviewItem({ text: y.moduleName, value: y.moduleId, checked: y.status, children: childrenNodes });
          parentNode.collapsed = true;
          this.items1.push(parentNode);
        });
      });
  }

  public UpdateData(roleEditData) {
    this.submitted = true;
    if (this.roleForm.valid) {
      const RoleEditData = {
        'roleId': roleEditData.roleId,
        'roleName': roleEditData.roleName,
        'roleInfo': roleEditData.roleInfo,
        'userType': roleEditData.userType,
        "subModuleId": this.newProductList

      };
      this.roleuserService.updateRole(RoleEditData)
        .subscribe(success => {
          this.getAllRoles();
          swal.fire({
            title: 'Role Updated!',
            text: 'Your file Updated Successfully!',
            icon: 'success'
          });
        }, error => {
          swal.fire('Error!', 'error', 'warning');
        });
      this.editrole = false;
    }

  }


  public addroles() {
    this.items = [];
    this.products()
    this.addrole = true;
    this.roleAddData = {
      'roleName': '',
      'roleInfo': ''
    }
  }

  public deleteRole(roleId) {
    swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.value) {
        this.roleuserService.DeleteRoleById(roleId)
          .subscribe(success => {
            this.getAllRoles();
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

  public closeRole() {
    this.addrole = false;
    this.editrole = false;
    this.getAllRoles();
  }

  public onSelectedChange(products) {
    const productList = [];
    products.forEach(x => {
      const pid = x;
      productList.push(pid);
    });
    this.newProductList = productList;
    if (this.newProductList.length == 0) {
      this.emptyarray = true;
    }
  }

  onUserTypechange(user) {
    this.userType = user;
  }

}




