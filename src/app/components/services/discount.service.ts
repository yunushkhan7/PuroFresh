import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()

export class DiscountService {
    delete(discount: any) {
      throw new Error('Method not implemented.');
    }

    constructor(private http: HttpClient) {}

 

    getAllDiscountRanges() {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Discount/GetAllDiscountRange?UserType='+ localStorage.getItem("userType") + '&FranchaseId=' + localStorage.getItem("franchaseId"), options);
    }



    getAllDiscountRangesfranchiseId(franchaseId) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Discount/GetAllDiscountRange?UserType=a'+'&FranchaseId=' + franchaseId, options);
    }



    addDiscountRange(RoleAddData) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.post(environment.baseURL + 'Discount/AddDiscountRange', RoleAddData, options);
    }
    updateDiscountRange(updateDiscount) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.post(environment.baseURL + 'Discount/UpdateDiscountRange', updateDiscount, options);
    }

    deleteDiscountRange(discountId) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.delete(environment.baseURL + 'Discount/DeleteDiscount?DiscountId=' + discountId, options);
    }



    getFranchise(){
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Franchase/GetAllFranchase?UserType=' + localStorage.getItem("userType") + '&FranchaseId=' + localStorage.getItem("franchaseId"), options);
      }
    
}