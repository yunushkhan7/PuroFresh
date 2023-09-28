import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()

export class AuthService {

  constructor(private http: HttpClient) { }

  loggedIn(logindata): Observable<any> {
    return this.http.post(environment.baseURL + 'Login/ValidateUser', logindata);
  }

  getversionnum() {
    return this.http.get(environment.baseURL + 'Customer/GetWebVersion');
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('email');
    localStorage.removeItem('MobileNo');
    localStorage.removeItem('setupTime');
    localStorage.removeItem('token');
    localStorage.clear();
  }
}
