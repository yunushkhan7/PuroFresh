import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()

export class ManifestService {

  constructor(private http: HttpClient) {}
 
  
  getActivedelvieryBoys(){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL +'DeliveryBoys/GetAllConfigActiveDeliveryBoys?UserType='+localStorage.getItem("userType")+'&FranchaseId='+localStorage.getItem("franchaseId"));
    }




    getAllslots() {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Slots/GetAllSlots', options);
    }

    // getAllslotsFranchiseId(franchaseId) {
    //   const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    //   const options = {headers: headers};
    //     return this.http.get(environment.baseURL + 'Slots/GetAllSlots?UserType=a'+'&FranchaseId=' + franchaseId, options);
    // }



    GetAllWareHouse() {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
      return this.http.get(environment.baseURL + 'WareHouse/GetAllWareHouse?FranchaseId='+localStorage.getItem("franchaseId"), options);
    }

  

    sendSlotData(slotsData) {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
      return this.http.post(environment.baseURL + 'Manifest/GetAllTodaysOrdersbyWareHouseId', slotsData, options);
    }

    getAllPinocdeOrders() {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
      return this.http.get(environment.baseURL + 'Order/GetAllTodaysOrdersPincode', options);
    }

    getAllOrdersBySlot(Pincode) {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
      return this.http.get(environment.baseURL + 'Order/GetAllAreasByPincode?Pincode=' + Pincode, options);
    }

    SelectOrders(orderData) {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
      return this.http.post(environment.baseURL + 'Order/ManifestDetails', orderData, options);
    }

    getmanifestDetails() {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
      return this.http.get(environment.baseURL + 'Manifest/GetAllManifestDetails?FranchaseId='+ localStorage.getItem("franchaseId"), options);
    }
    getmanifestDetailsByfranchaseId(franchaseId) {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
      return this.http.get(environment.baseURL + 'Manifest/GetAllManifestDetails?FranchaseId='+franchaseId, options);
    }
  
    getManifestStatus() {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
      return this.http.get(environment.baseURL + 'Manifest/GetAllManifestStatus', options);
    }
    



    





  
    CompeleteManifestById(manifestId) {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
      return this.http.get(environment.baseURL + 'Manifest/CompleteManifestById?Manifestid=' + manifestId, options);
    }

    DeleteManifestById(manifestId) {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
      return this.http.get(environment.baseURL + 'Manifest/DeleteManifestById?Manifestid=' + manifestId, options);
    }

    GenerateManifest(data){
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
      return this.http.post(environment.baseURL + 'Manifest/GenerateManifest', data, options);
    }

    deleteJobsById (deleteData) {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
      return this.http.post(environment.baseURL + 'Manifest/DeleteAllottedJobs', deleteData, options);
    }

    UpdateManifest(data){
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
      return this.http.post(environment.baseURL + 'Manifest/UpdateManifest', data, options);
    }

    getinvoiceData(manifestId) {
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
      return this.http.get(environment.baseURL + 'Manifest/GetManifestById?ManifestId=' + manifestId, options);
    }



    getFranchise(){
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
      const options = {headers: headers};
      return this.http.get(environment.baseURL + 'Franchase/GetAllFranchase?UserType=' + localStorage.getItem("userType") + '&FranchaseId=' + localStorage.getItem("franchaseId"), options);
    }







}
