import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';






@Injectable({
    providedIn: 'root'
    })
    export class MasterproductService {
    
    
    constructor(private http: HttpClient) { }
    


    
    
  
// getMasterProducts(){
//     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
//     const options = {headers: headers};
//     return this.http.get(environment.baseURL + 'MasterProducts/GetMasterProducts', options);
// }


GetAllProducts(){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'Product/GetAllProducts', options);
}

getAllMeasurement() {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'Product/GetProdMeasurements', options)
  }



getAllCatalogs() {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
      return this.http.get(environment.baseURL + 'Category/GetAllCategories', options);
  }

    
 

addMasterProducts(datatosend){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.post(environment.baseURL + 'Product/AddProduct',  datatosend,  options);
} 

 
getFranchise(){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'Franchase/GetAllFranchase?UserType=' + localStorage.getItem("userType") + '&FranchaseId=' + localStorage.getItem("franchaseId"), options);
}



// uploadImage(formdata){
//     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
//     const options = {headers: headers};
//     return this.http.post(environment.baseURL + 'MasterProducts/UploadImage', formdata,{responseType:'text'});
// } 


getProductByFranchaseId(){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'Product/GetAllFranchaseProducts?FranchaseId='  + localStorage.getItem("franchaseId")  , options)
}




getProductByFranchaseIdForAdmin(franchiseId){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'Product/GetAllFranchaseProducts?FranchaseId=' + franchiseId  , options)
}





updateProducts(update){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.post(environment.baseURL + 'Product/AddProduct',  update,  options);
} 


uploadImage(formdata){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.post(environment.baseURL + 'MasterProducts/UploadImage?Filetype=Product', formdata,{responseType:'text'});
} 


deleteProduct(ProductsId){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'Product/DeleteProduct?productId=' + ProductsId, options);
} 


// DeleteProductById(productId) {
//     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
//     const options = {headers: headers};
//     return this.http.get(environment.baseURL + 'Product/DeleteProduct?productId=' + productId, options)
//    }


    }


