import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()

export class PromotionService {

  constructor(private http: HttpClient) {}

  savePromotion(AddCategory) {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.post(environment.baseURL + 'Promotion/AddPromotion', AddCategory, options);
  }

  getAllPromotions() {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
      return this.http.get(environment.baseURL + 'Promotion/GetAllPromotion', options);
  }

  DeletePromotionById(PromotionId): any {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
  return this.http.get(environment.baseURL + 'Promotion/DeletePromotion?PromotionId=' + PromotionId, options)
   }

}
