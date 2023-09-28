import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class DeliveryBoyService {



constructor(private http: HttpClient) {}


  getAlldelvieryBoys(){
    return this.http.get(environment.baseURL + 'DeliveryBoys/GetAllDeliveryBoys?UserType='+localStorage.getItem("userType")+'&FranchaseId='+localStorage.getItem("franchaseId") , { headers:new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem("token"))});
  }



  getAlldelvieryBoysfranchiseId(franchaseId){
    return this.http.get(environment.baseURL + 'DeliveryBoys/GetAllDeliveryBoys?UserType=a'+'&FranchaseId='+ franchaseId , { headers:new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem("token"))});
  }



  addupdateDeliveryBoy(boy): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
   const options = {headers: headers};
    return this.http.post(environment.baseURL + 'DeliveryBoys/AddDeliveryBoy', boy, options);
  }

  deleteDeliveryBoyById(DeliveryBoyId): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'DeliveryBoys/DeleteDeliveryBoy?DeliveryBoyId=' + DeliveryBoyId);
  }

  getdeliveryIdmanifest(DeliveryBoyId){
    return this.http.get(environment.baseURL + 'Manifest/GetPaymentDetailsByDeliveryById?DeliveryboyId=' + DeliveryBoyId, { headers:new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem("token"))});
  }

  getManifestData(manifestId){
    return this.http.get(environment.baseURL + 'Manifest/ManifestPaymentUpdate?ManifestId=' + manifestId, { headers:new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem("token"))});
  }

  getpaymentStatus() {
    return this.http.get(environment.baseURL + 'Payment/GetAllPaymentStatus', { headers:new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem("token"))});
  }




  // getProductByFranchaseIdForAdmin(franchiseId){
  //   const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
  //   const options = {headers: headers};
  //   return this.http.get(environment.baseURL + 'DeliveryBoys/GetAllDeliveryBoys?UserType='+localStorage.getItem("userType")+'&FranchaseId='+localStorage.getItem("franchaseId") + franchiseId  , options)
  // }





  getFranchise(){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'Franchase/GetAllFranchase?UserType=' + localStorage.getItem("userType") + '&FranchaseId=' + localStorage.getItem("franchaseId"), options);
  }



}

