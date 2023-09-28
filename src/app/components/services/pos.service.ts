import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()

export class POSService {

  constructor(private http: HttpClient) {}

  getsearchbyprodcut(search) {
      return this.http.get(environment.baseURL + 'Product/GetAllProductsByString?ProductName=' + search);
  }

  getBarcode(barcode) {
    return this.http.get(environment.baseURL + 'Product/GetProductByBarCode?Barcode=' + barcode);
  }

  sendposData(productData) {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
       return this.http.post(environment.baseURL + 'Product/PointOfSales', productData, options);
  }

  getposdata() {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'Product/GetAllOfflineSales', options);
  }

  getpaymenttype(){
    return this.http.get(environment.baseURL + 'Payment/GetAllPaymentModes');
  }
  getdeliveryChargesbyPincode(value){
    return this.http.get(environment.baseURL + 'WareHouse/GetDeliveryChargesByPincode?Pincode='+value,{responseType:'text'});
  }


}
