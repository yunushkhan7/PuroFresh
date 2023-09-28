import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';






@Injectable({
    providedIn: 'root'
    })
    export class RegistrationService {
    
    
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

    InsertFranchase(datatosend) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.post(environment.baseURL + 'Franchase/InsertFranchase',  datatosend,   options);
    }


getAllPincode(districtId){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'MasterAddress/GetPincodesbyDistrictId?districtId=' + districtId, options);
}



getAllAreaName(areaName,districtId){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'MasterAddress/GetAreaByName?AreaName='+ areaName +'&DistrictId=' + districtId, options);
}

getFranchise(){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'Franchase/GetAllFranchase?UserType=' + localStorage.getItem("userType") + '&FranchaseId=' + localStorage.getItem("franchaseId"), options);
}



getAllDelete(franchaseId){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'Franchase/DeleteFranchase?FranchaseId=' + franchaseId, options );
}


updateFranchise(update){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.post(environment.baseURL + 'Franchase/UpdateFranchase',  update,  options );
}


checkpincodeisAvailable(pincode){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'Franchase/CheckPincodeisAvailable?Pincode='+pincode, options );
    }



    }


