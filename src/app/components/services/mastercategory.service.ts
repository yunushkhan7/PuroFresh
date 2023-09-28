import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';






@Injectable({
    providedIn: 'root'
    })
    export class MasterCategoryService {
    
    
    constructor(private http: HttpClient) { }
    
    getMasterCategory(){
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'MasterProducts/GetAllCategories', options);
    }
  



    addMasterCategory(datatosend){
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.post(environment.baseURL + 'MasterProducts/CreateMasterCategory',datatosend, options);
    }
  
    
 


 
    updateMasterCategory(update){
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.post(environment.baseURL + 'MasterProducts/UpdateMasterCategory', update,options);
    }
  

uploadImage(formdata){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.post(environment.baseURL + 'MasterProducts/UploadImage?Filetype=Category', formdata,{responseType:'text'});
} 



deleteCategory(masterCategoriesId){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'MasterProducts/DeleteMasterCategory?CategoryId=' + masterCategoriesId, options);
} 







    }


