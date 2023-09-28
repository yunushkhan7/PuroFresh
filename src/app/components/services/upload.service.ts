import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';






@Injectable({
    providedIn: 'root'
    })
    export class UploadService {
    
    
    constructor(private http: HttpClient) { }

    getAllStates() {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'MasterAddress/GetAllStates', options);
    }

    
    getAllDistrict(stateId) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'MasterAddress/GetAllDistrictByStateId?StateId=' + stateId, options);
    }


    uploadAreaPincode(districtId,formData) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.post(environment.baseURL + 'MasterAddress/UploadAreaPincode?districtId=' + districtId,formData,{responseType:'text'});
    }


    }