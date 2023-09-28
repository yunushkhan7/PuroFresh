import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';






@Injectable({
    providedIn: 'root'
    })
    export class AssignService {
    
    
    constructor(private http: HttpClient) { }
    
    
  

 
getFranchaseProducts(){
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'MasterProducts/GetFranchaseProductByFranchaseId?FranchaseId='+ localStorage.getItem("franchaseId"), options);
    }
    getAllFranchase(){
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Franchase/GetAllFranchase?UserType=' + localStorage.getItem("userType") + '&FranchaseId=' + localStorage.getItem("franchaseId"), options);
    }
 
 

    getAllUserModules(): any {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'User/GetAllModules', options)
    }
   


getProductsCategory():  any {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'MasterProducts/GetFranchaseProductByFranchaseId?FranchaseId=' + localStorage.getItem("franchaseId"), options)
}



getProductsByFranchise():  any {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'MasterProducts/GetFranProdByFranchaseProductId', options)
}


getProductByFranchaseId(){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'MasterProducts/GetAllProductsByFranchaseId?FranchaseId='  + localStorage.getItem("franchaseId") , options)
}

assingProductstoFranchase(productdata){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.post(environment.baseURL + 'MasterProducts/CreateProductsForFrachase', productdata, options)
}


    }


