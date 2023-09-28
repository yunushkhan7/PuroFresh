import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()

export class CustomerService {

    constructor(private http: HttpClient) {}

    getAllCustomers() {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Customer/GetAllCustomers', options)
      }

    getCustomersDataById(customerId) {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Customer/GetAllCustomerHistory?CustomerId=' + customerId)
      }
  
    // getOderDetailsById(OrderMasterId) {
    //   const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    //   const options = {headers: headers};
    //     return this.http.get(environment.baseURL + 'Customer/GetOrderMasterDetails?OrderMasterId=' + OrderMasterId)
    //   }

    getCustomersDataById1(customerId) {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
      return this.http.get(environment.baseURL + 'Customer/GetSubOrdersByCustId?CustomerId=' + customerId, options)
    }

    deleteCusorder(inoviceId) {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
      return this.http.get(environment.baseURL + 'Order/CancelOrderByOrderInvoiceId?OrderInvoiceId=' + inoviceId, options) 
    }

    getOderDetailsById1(OrderMasterId) {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
      return this.http.get(environment.baseURL + 'Customer/GetOrdDetailByOrderInvoiceId?OrderInvoiceId=' + OrderMasterId, options)
    }

}