import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
// import { NotificationsService } from '../../services/notifications.service';
import swal from 'sweetalert2';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { AssignService } from '../../services/assign.service';


@Component({
selector: 'app-categories',
templateUrl: './categories.component.html',
styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
public Addfran = false;
public Editfran = false;
// public product: any = [];
franchase: any = [];
franchaseId:"";
franchaseName:"";
checked = false
public data: any;
emptyarray: boolean = false;
newPermissions: any;
newProductList: any;
moduleName="";
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


// treeview ends
constructor(private formBuilder: FormBuilder,private assignService: AssignService) {

}

ngOnInit(){
this.getFranchise()
this.getAllUserModules()
this.items = [];
this.items1 = [];
}



getAllUserModules(){
    this.assignService.getAllUserModules()
    .subscribe(res => {
        console.log('modules', res)
    })
}
 
 getFranchise(){
     this.assignService.getAllFranchase()
     .subscribe(data => {
         this.franchase = data
         console.log('fran', data)
     })
 }


 public products() {
    this.assignService.getAllUserModules()
        .subscribe( data => {
          this.data = data;
          console.log(this.data)
          this.data.forEach( x => {
            const y = x;
            console.log(y)
            const childrenNodes = [];
            x.submoduleslist.forEach( q => {
            const r = q;
            const childNodes = new TreeviewItem({text: r.subModuleName, value: r.subModuleId, checked: r.status});
            childrenNodes.push(childNodes);
            childNodes.checked = false;
          });
            const parentNode = new TreeviewItem({text: y.moduleName, value: y.moduleId, checked: y.status, children: childrenNodes});
            parentNode.checked = false;
            parentNode.collapsed = true;
            this.items.push(parentNode);
            console.log(this.items)
            }); 
        });
  }


getItems(parentChildObj) {
let itemsArray = [];

parentChildObj.forEach(set => {
itemsArray.push(new TreeviewItem(set))
});
return itemsArray;
}







add(){
this.Addfran = true;
this.Editfran = false;
}

edit(category){
this.Editfran = true;
this.Addfran = false;
}



cancel(){
this.Addfran = false;
this.Editfran = false

}







}