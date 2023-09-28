import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()

export class FranchiseUserService {

  constructor(private http: HttpClient) {}


  getFranchise(){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.get(environment.baseURL + 'Franchase/GetAllFranchase', options);
}

 

}
