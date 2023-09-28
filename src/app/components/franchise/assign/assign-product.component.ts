import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
// import { NotificationsService } from '../../services/notifications.service';
import swal from 'sweetalert2';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { AssignService } from '../../services/assign.service';


@Component({
selector: 'app-assign-product',
templateUrl: './assign-product.component.html',
styleUrls: ['./assign-product.component.scss']
})
export class AssignProductComponent implements OnInit {
public Addfran = false;
public Editfran = false;
public categoryId: any = []
// public product: any = [];
franchaseproducts: any = [];
franchase: any = [];

franchaseId=localStorage.getItem("franchaseId")
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
productids:any=[]


// treeview ends
constructor(private formBuilder: FormBuilder,private assignService: AssignService) {

}

ngOnInit(){
//this.getFranchiseproducts()
//tis.getAllFranchase()
this.products()
// this.getAllUserModules()
this.getProductsCategory()
this.items = [];
this.items1 = [];
}

onchange(data){
    console.log('kdjfkdfjlkdjfkdjf',data)
    this.franchaseId=data;

}




getProductsCategory(){
    this.assignService.getProductsCategory()
    .subscribe(res => {
        console.log('productcheckbox', res)
    })
}

// getAllUserModules(){
//     this.assignService.getAllUserModules()
//     .subscribe(res => {
//         console.log('modules', res)
//     })
// }
 
 getFranchiseproducts(){
     this.assignService.getFranchaseProducts()
     .subscribe(data => {
         this.franchaseproducts = data
         console.log('franchaseproducts',this.franchaseproducts)
     })
 }
 getAllFranchase(){
    this.assignService.getAllFranchase()
    .subscribe(data => {
        this.franchase = data
        console.log('franchase',this.franchase)
    })
}


 public products() {
  this.assignService.getFranchaseProducts()
        .subscribe( data => {
          this.data = data;
          console.log(this.data)

          this.data.forEach( x => {
            const y = x;
            console.log(y)
            const childrenNodes = [];
            x.productsList.forEach( q => {
            const r = q;
            const childNodes = new TreeviewItem({text: r.productName , value: r.productId, checked: r.status});
            childrenNodes.push(childNodes);
            childNodes.checked = false;
          });
            const parentNode = new TreeviewItem({text: y.categoryName, value: y.categoryId, checked: y.status, children: childrenNodes});
            parentNode.checked = false;
            parentNode.collapsed = true;
            this.items.push(parentNode);
            console.log('itemdatafortest9ing',this.items)
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



public onSelectedChange(products) {
    const productList = [];
    products.forEach( x => {
          const pid = x;
          productList.push(pid);
      });
      this.newProductList = productList;
      if(this.newProductList.length == 0) {
      this.emptyarray = true;
      }
      console.log('cheked',this.newProductList)
  }



add(){
this.Addfran = true;
this.Editfran = false;
}

edit(category){
this.Editfran = true;
this.Addfran = false;
// this.Editfran = category
}



onsubmit(){
    const productdata = {
        'franchaseId': this.franchaseId,
       
        'productIds': this.newProductList 


        };
        console.log('productdata',productdata)
        this.assignService.assingProductstoFranchase(productdata)
        .subscribe( data => {
           this.getProductsCategory()

          if(data)
          {
          
           swal.fire({
            title: 'Products Added',
            text: 'Your products added Successfully!',
            icon: 'success'
            
          });
         

          }

         
     
        }, error => {
      swal.fire('Error!', 'error', 'warning');
    });

  

   

    
}



cancel(){
this.Addfran = false;
this.Editfran = false

}







}