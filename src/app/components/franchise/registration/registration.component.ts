import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
// import { NotificationsService } from '../../services/notifications.service';
import swal from 'sweetalert2';
import { RegistrationService } from '../../services/registration.service';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { ThemeService } from 'ng2-charts';


@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

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

    registerForm: FormGroup;
    editForm: FormGroup;
    submitted = false;
    public stateList: any = [];
    pincodeAreasList: any = [];
    public districtList: any = [];
    selectedField: '';
    franchise: any = [];
    franchisedata: any = [];
    file
    public districtId: ''
    public progress: number;
    public areaList: any = [];
    editarealist: any = [];
    public searchareaList: any = [];
    public Addfran = false;
    public Editfran = false;
    public Addassign = false;
    public data: any[];
    public filterQuery = '';
    franchaseName: "";
    contactNo: "";
    areaName: "";
    pincode: "";
    address: "";
    email: "";
    stateName: ""
    addfranchise: any;
    public elementClicked: any = []
    public regForm: FormGroup
    public regForm2: FormGroup
    franchasedata
    items: any;
    franchaseId: any;

    // simpleItems = {
    //     text: 'Dry Fruits',
    //     value: 'p2',
    //     collapsed: true,
    //     children: [
    //         {
    //             text: 'Almond Moti - 500gms',
    //             value: 'c1'
    //         },

    //         {
    //             text: 'Almond Moti - 250gms',
    //             value: 'c1'
    //         },

    //         {
    //             text: 'Almond Sanora - 500gms',
    //             value: 'c1'
    //         },

    //         {
    //             text: 'Almond Sanora - 250gms',
    //             value: 'c1'
    //         },
    //         {
    //             text: 'Almond California - 250gms',
    //             value: 'c1'
    //         },


    //         {
    //             text: 'Almond California - 500gms',
    //             value: 'c1'
    //         }
    //     ]
    // };

    // simpleItems2 = {
    //     text: 'Food Products',
    //     value: 'p2',
    //     collapsed: true,
    //     children: [
    //         {
    //             text: 'Organic Whole Wheat Atta - 1kg',
    //             value: 'c1'
    //         },

    //         {
    //             text: 'Organic Whole Wheat Atta - 5kg',
    //             value: 'c1'
    //         },

    //         {
    //             text: 'Premium Whole Wheat Atta - 5kg',
    //             value: 'c1'
    //         },

    //         {
    //             text: 'Organic Brown Sugar - 500gms',
    //             value: 'c1'
    //         },
    //         {
    //             text: 'Organic Brown Sugar(Terragreen) - 1kg',
    //             value: 'c1'
    //         },

    //     ]
    // };

    // simpleItems3 = {
    //     text: 'Vegan Cosmetics',
    //     value: 'p2',
    //     collapsed: true,
    //     children: [
    //         {
    //             text: 'Aloe Aqua Facewash - 100ml',
    //             value: 'c1'
    //         },

    //         {
    //             text: 'Aloe Aqua Aloevera Gel - 50gms',
    //             value: 'c1'
    //         },

    //         {
    //             text: 'Face Glow Brightening Mask - 100gms',
    //             value: 'c1'
    //         },

    //         {
    //             text: 'Face Glow Exfoliating Wash - 100ml',
    //             value: 'c1'
    //         },
    //         {
    //             text: 'Perfect Look BB Cream - 30gms',
    //             value: 'c1'
    //         },

    //     ]
    // };

    // simpleItems4 = {
    //     text: 'Chicken',
    //     value: 'p2',
    //     collapsed: true,
    //     children: [
    //         {
    //             text: 'Chicken Boneless (Cubes) - 500gms',
    //             value: 'c1'
    //         },

    //         {
    //             text: 'Chicken Breast Boneless - 500gms',
    //             value: 'c1'
    //         },

    //         {
    //             text: 'Face Glow Brightening Mask - 100gms',
    //             value: 'c1'
    //         },

    //         {
    //             text: 'Chicken Drumstick(Skinless) - 500gms',
    //             value: 'c1'
    //         },
    //         {
    //             text: 'Chicken Biryani Cut(Skinless) - 500gms',
    //             value: 'c1'
    //         },
    //     ]
    // };

    public addfrnch: any = {
        'franchaseName': '',
        'contactNo': '',
        'address': '',
        'email': ''
    }
    editRegistration: any = {
        'franchaseId': '',
        'franchaseName': '',
        'contactNo': '',
        'address': '',
        'email': ''
    }

    constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService) {
        this.registerForm = this.formBuilder.group({
            franName: ['', Validators.required],
            franContact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
            franEmail: ['', [Validators.required, Validators.email]],
            franAddress: ['', Validators.required],
            franState: ['', Validators.required],
            franDistrict: ['', Validators.required],
            franStreet: ['', Validators.required],
        });
    }

    get f() { return this.registerForm.controls; }

    ngOnInit() {
        this.getAllStates()
        this.getFranchise()
        // this.items = this.getItems([this.simpleItems, this.simpleItems2]);
    }

    getItems(parentChildObj) {
        let itemsArray = [];
        parentChildObj.forEach(set => {
            itemsArray.push(new TreeviewItem(set))
        });
        return itemsArray;
    }

    add() {
        this.submitted = false;
        this.Addfran = true;
        this.Editfran = false;
        // this.addfranchise = {
        //     'franchaseName': this.franchaseName,
        //     'contactNo': this.contactNo,
        //     'address': this.address,
        //     'email': this.email,
        //     'stateName': this.stateName
        // }
        this.pincodeAreasList = [];
    }

    edit(registration) {
        this.submitted = false
        this.Editfran = true;
        this.Addfran = false;
        this.editRegistration = registration;
        this.pincodeAreasList = [];
        this.pincodeAreasList = this.editRegistration.areaList;
    }

    cancel() {
        // this.resetForm()
        this.registerForm.reset();
        this.Addfran = false;
        this.Editfran = false;
        this.Addassign = false;
        this.getFranchise()
    }

    pincodeListOnclick(areaName): void {
        const areaData = {
            areaName: '',
            pincode: ''
        }

        this.areaList.forEach(e => {
            if (e.areaName == areaName) {
                areaData.areaName = e.areaName
                areaData.pincode = e.pincode
            }
        });

        this.registrationService.checkpincodeisAvailable(areaData.pincode).subscribe(result => {
            this.franchasedata = result;
            if (result == null) {
                this.areaList.forEach(element => {
                    if (element.areaName == areaName) {
                        this.pincodeAreasList.push(element)
                    }
                });
            }
            else {
                swal.fire({
                    text: 'This Area Is Assgin To  ' + this.franchasedata.franchaseName +
                        ' do  you want to continue?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#13c9ca',
                    cancelButtonColor: '#ff8084',
                    confirmButtonText: 'Yes',
                }).then((result) => {
                    if (result.value) {
                        this.areaList.forEach(element => {
                            if (element.areaName == areaName) {
                                this.pincodeAreasList.push(element)
                                // this.editarealist.push(element)
                            }
                        });
                    }
                });
            }
        })
    }

    InsertFranchase(addfrnch) {
        this.submitted = true;
        console.log(this.registerForm.valid);

        if (this.registerForm.invalid) { return }
        const datatosend = {
            "franchaseName": addfrnch.franchaseName,
            "contactNo": addfrnch.contactNo,
            "address": addfrnch.address,
            "areaList": this.pincodeAreasList,
            "email": addfrnch.email,
            "stateName": addfrnch.stateName
        }

        this.registrationService.InsertFranchase(datatosend).subscribe((data: any) => {
            if (data.success) {
                swal.fire({
                    title: 'Added',
                    text: 'Your Franchise is Added',
                    icon: 'success'
                });
                this.getFranchise()
                this.Addfran = false;
                this.registerForm.reset();
                // this.resetForm();
            } else {
                swal.fire({
                    title: data.message,
                    // text: data.message,
                    icon: 'warning'
                });
            }
        })
    }

    getAllStates() {
        this.registrationService.getAllStates().subscribe(data => {
            this.stateList = data;
            console.log("sample data", data)
        })
    }

    public onStateChange(stateId) {
        this.registrationService.getAllDistrict(stateId).subscribe(response => {
            this.districtList = response
        })
    }

    public onDistrictChange(districtId) {
        this.districtId = districtId
    }

    searchArea(areaData) {
        if (this.districtId !== undefined) {
            this.registrationService.getAllAreaName(areaData, this.districtId).subscribe(data => {
                this.areaList = data;
            })
        } else {
            this.InsertFranchase('');
        }
    }

    deleteFran(franchaseId) {
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
                this.registrationService.getAllDelete(franchaseId).subscribe(success => {
                    this.getFranchise();
                    if (success) {
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

    getFranchise() {
        this.registrationService.getFranchise().subscribe(data => {
            this.franchisedata = data
        })
    }

    addassign() {
        this.Addassign = true;
        this.Editfran = false;
        this.Addfran = false;
    }


    updateRegistration(editRegistration) {
        const update = {
            "franchaseId": editRegistration.franchaseId,
            "franchaseName": editRegistration.franchaseName,
            "contactNo": editRegistration.contactNo,
            "address": editRegistration.address,
            "email": editRegistration.email,
            "stateName": editRegistration.stateName,
            "areaList": this.pincodeAreasList
        }
        this.registrationService.updateFranchise(update).subscribe(data1 => {
            if (data1) {
                swal.fire({
                    'title': 'updated',
                    'text': 'updated',
                    'icon': 'success'
                })
                this.Editfran = false;
                // this.editRegistration.franchaseId;
            }
        })

        // this.resetForm();
    }

    delete(data) {
        this.pincodeAreasList.forEach(element => {
            if (element == data) {
                this.pincodeAreasList.splice(element, 1)
            }
        });
    }

    // resetForm() {

    //     for (let control in this.registerForm.controls) {
    //         this.registerForm.controls[control].setErrors(null);
    //       }

    //     // this.registerForm.controls.franName.clearValidators();
    //     // this.registerForm.controls.franName.updateValueAndValidity();

    //     // this.registerForm.controls.franContact.clearValidators();
    //     // this.registerForm.controls.franContact.updateValueAndValidity();

    //     // this.registerForm.controls.franEmail.clearValidators();
    //     // this.registerForm.controls.franEmail.updateValueAndValidity();

    //     // this.registerForm.controls.franAddress.clearValidators();
    //     // this.registerForm.controls.franAddress.updateValueAndValidity();

    //     // this.registerForm.controls.franState.clearValidators();
    //     // this.registerForm.controls.franState.updateValueAndValidity();

    //     // this.registerForm.controls.franDistrict.clearValidators();
    //     // this.registerForm.controls.franDistrict.updateValueAndValidity();

    //     // this.registerForm.controls.franStreet.clearValidators();
    //     // this.registerForm.controls.franStreet.updateValueAndValidity();








    // }
}