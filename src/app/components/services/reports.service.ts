import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()

export class ReportService {

    constructor(private http: HttpClient) {}

    getAllsales(sd,ed) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Reports/GetSalesReport?startdate=' + sd +'&enddate='+ ed, options);
    }
    uploadFile(formdata){
        // fileName='637438190998421372.xlsx';
         const headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem("token")});
         const options = {headers: headers};
         return this.http.post(environment.baseURL + 'WareHouse/Upload?FranchaseId='+ localStorage.getItem("franchaseId") ,formdata,{responseType:'text'});
 
     }
     getalldata(){
        // fileName='637438190998421372.xlsx';
         const headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem("token")});
         const options = {headers: headers};
         return this.http.get(environment.baseURL + 'WareHouse/GetAllDeliveryCharges?FranchaseId='+ localStorage.getItem("franchaseId"),options);
 
     }
      getalldatabyFranchaseId(franchaseId){
        // fileName='637438190998421372.xlsx';
         const headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem("token")});
         const options = {headers: headers};
         return this.http.get(environment.baseURL + 'WareHouse/GetAllDeliveryCharges?FranchaseId='+franchaseId,options);
 
     }

     getallfullreport(){
        // fileName='637438190998421372.xlsx';
         const headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem("token")});
         const options = {headers: headers};
         return this.http.get(environment.baseURL + 'Reports/GetFullReport',options);
 
     }
   
}