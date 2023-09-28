import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()

export class NotificationsService {
 
    constructor(private http: HttpClient) {}

    getAllCatalogs() {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
          return this.http.get(environment.baseURL + 'Category/GetAllCategories', options);
      }
    
  




    getAllNotificationsRanges() {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Discount/GetAllNotifications', options);
    }
    addNotificationsRange(RoleAddData) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.post(environment.baseURL + 'Discount/AddNotifications', RoleAddData, options);
    }
    updateNotificationsRange(UpdateNotification) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.post(environment.baseURL + 'Discount/UpdateNotifications', UpdateNotification, options);
    }

    deleteNotificationsRange(notificationsId) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.delete(environment.baseURL + 'Discount/DeleteNotifications?notificationsId=' + notificationsId, options);
    }



    GetFranchaseProductListForApproval() {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Product/GetFranchaseProductListForApproval' , options);
    }
  
    getFranchise(){
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Franchase/GetAllFranchase?UserType=' + localStorage.getItem("userType") + '&FranchaseId=' + localStorage.getItem("franchaseId"), options);
      }


      getAllMeasurement() {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Product/GetProdMeasurements', options)
      }
    
      GetFranchaseProductListForApprovalfranchiseId(franchaseId) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Product/GetProductsApprovalListByFranchaseId?FranchaseId='+ franchaseId , options);
    }
  
    UpdateAllProduct(productEditData): any {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
           return this.http.post(environment.baseURL + 'Product/UpdateFranchaseProducts', productEditData, options);
         }
 
}