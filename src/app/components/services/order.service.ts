import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()

export class OrderService {

  constructor(private http: HttpClient) {}

  getorderstatus() {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'Order/GetAllOrderStatus', options);
  }

  GetTodaysData(getData) {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.post(environment.baseURL + 'Order/GetAllTodaysOrders', getData, options);
  }

  getDataById(orderInvoiceId) {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'Order/GetOrderProdByOrderInvoice?OrderInvoiceId=' + orderInvoiceId, options);
  }

  fullFillOrder(fullfillData) {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.post(environment.baseURL + 'Order/FullFillProducts', fullfillData, options);
  }

  // deliveryConfirmed(orderInvoiceId) {
  //   return this.http.get(environment.baseURL + 'Order/ConfirmDelivery?OrderInovoiceId=' + orderInvoiceId);
  // }
}
