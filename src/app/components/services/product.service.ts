import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()

export class ProductService {

  constructor(private http: HttpClient) {}

//   GetAllProducts(){
//     const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
//     const options = {headers: headers};
//     return this.http.get(environment.baseURL + 'Product/GetAllProducts' , options);
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







getFranchise(){
  const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
  const options = {headers: headers};
  return this.http.get(environment.baseURL + 'Franchase/GetAllFranchase?UserType=' + localStorage.getItem("userType") + '&FranchaseId=' + localStorage.getItem("franchaseId"), options);
}





  saveproduct(dataproduct) {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
       return this.http.post(environment.baseURL + 'Product/InsertFranchaseProduct', dataproduct, options);
     }



     UpdateAllProduct(productEditData): any {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
         return this.http.post(environment.baseURL + 'Product/UpdateFranchaseProducts', productEditData, options);
       }

     
  copyproduct(data): any {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
            return this.http.post(environment.baseURL + 'Product/CopyProduct', data, options);
    }

  DeleteProductById(fProductId) {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'Product/DeleteFranchaseProduct?FProductId=' + fProductId, options)
   }

  getAllProducts() {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'Product/GetAllFranchaseProducts?FranchaseId=' + localStorage.getItem("franchaseId")
    , options)
    }

  getAllthershold() {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'Product/GetAllThresholdProducts', options)
    }

  getAllMeasurement() {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'Product/GetProdMeasurements', options)
  }


  // SaveCatalog(CatalogData): Observable<any> {
  //   console.log(CatalogData);
  //   const headers = new HttpHeaders(
  //     { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')});
  //   const options = { headers: headers };
  //   return this.http.post(environment.baseURL + 'Catalog/SaveCatalog', CatalogData, options);
  //   // return this.http.post(environment.baseURL + 'Catalog/SaveCatalog', CatalogData, options);
  // }


}
