import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()

export class PatnershipService {

    constructor(private http: HttpClient) {}

    getAlldetails() {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Partner/GetAllPartnerDetails', options);
    }

    getAlldetailsfortow(data1, data2) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Partner/GetPartnerPaymentDetailsByMonth?StartDate=' + data1 + '&EndDate=' + data2, options);
    }


    getAlldetailsforreport(data1, data2) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Partner/PartnerReport?StartDate=' + data1 + '&EndDate=' + data2, options);
    }

    geteachdetails(data,data1,data2) {
        console.log(data,data1,data2)
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Partner/GetPartnerPaymentDetails?PartnerDetailsId=' + data + '&StartDate=' + data1 + '&EndDate=' + data2, options);
    }


    geteachcustomerdetails(data,data1,data2) {
        console.log(data,data1,data2)
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Partner/GetPartnerCustomerDetailsForAdmin?PartnerDetailsId=' + data + '&StartDate=' + data1 + '&EndDate=' + data2, options);
    }

    senddatatotransaction(fullfillData) { 
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.post(environment.baseURL + 'Partner/MakePartnersPayment', fullfillData, options);
      }

    senddatatotransactionMonthly(fullfillData) { 
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.post(environment.baseURL + 'Partner/MonthlyPayment', fullfillData, options);
    }
   
}