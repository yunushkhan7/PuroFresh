import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

constructor(private http: HttpClient) {}

  // Get all users
  getAllEmployees() {
  return this.http.get(environment.baseURL + 'Employee/GetAllEmployess', { headers:new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem("token"))});
  }

  addEmployee(employees): Observable<any> {
	  console.log(employees)
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
   const options = {headers: headers};
    return this.http.post(environment.baseURL + 'Employee/SaveEmployee', employees, options);
  }

  // Get employee By id
  getEmployeeByIdUpdate(employees: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
   const options = {headers: headers};
    return this.http.post(environment.baseURL + 'Employee/SaveEmployee', employees, options);
  }

  deleteEmployeeById(employeeId): Observable<any>{
	  //console.log(data);
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
    const options = {headers: headers};
    return this.http.post(environment.baseURL + 'Employee/DeleteEmployee',employeeId,options);
  }

  Updatepassword(userpassword: any): Observable<any> {
    console.log(userpassword);
    return this.http.post(environment.baseURL + 'Employee/ChanagePassword', userpassword, { headers:new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem("token"))});
  }

  getUserDetails(empid): Observable<any> {
    return this.http.get(environment.baseURL + 'Employee/GetEmployeeById?empid=' + empid, { headers:new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem("token"))});
  }
}

