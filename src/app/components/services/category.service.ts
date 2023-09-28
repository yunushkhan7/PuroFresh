import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()

export class CategoryService {

  constructor(private http: HttpClient) {}

  saveCategory(AddCategory) {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.post(environment.baseURL + 'Category/AddCategory', AddCategory, options);
  }

  getAllCatalogs() {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
      return this.http.get(environment.baseURL + 'Category/GetAllCategories', options);
  }

  DeleteCatagoryById(Categoryid): any {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
  return this.http.get(environment.baseURL + 'Category/DeleteCategory?Categoryid=' + Categoryid, options)
   }

}
