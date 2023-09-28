import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()

export class VendorService {

    constructor(private http: HttpClient) {}

    getAllVendors() {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Vendor/GetAllVendors', options);
    }

    getVendorTypes() {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Vendor/GetAllVendorTypes', options);
    }

    getproductList() {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'MasterData/GetProductsByCategory', options);
    }

    getvendorDataById(VendorId) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'MasterData/GetVendProductsByCategory?VendorId=' + VendorId, options);
    }

    getvendorProdcutsById(VendorId) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Vendor/GetProductsByvendorId?VendorId=' + VendorId, options);
    }

    getVendorPriority() {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Vendor/GetAllVendorPriority', options);
    }

    saveVendor(AddVendor) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.post(environment.baseURL + 'Vendor/AddUpdateVendor', AddVendor, options);
    }

    updateVendor(UpdateVendor) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.post(environment.baseURL + 'Vendor/AddUpdateVendor', UpdateVendor, options);
    }

    getAllVendorOrders() {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Vendor/GetAllVendorOrders', options);
    }
    
    orderVendorData(VendorOrderData) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.post(environment.baseURL + 'Vendor/AddVendorOrder', VendorOrderData, options);
    }

    DeleteVendorById(vendorId): any {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Vendor/DeleteVendor?VendorId=' + vendorId, options)
    }

    vendorOrderRec(vendorId) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Vendor/ItemReceivedByVendor?VendorOrderId=' + vendorId, options)
    }
   
}