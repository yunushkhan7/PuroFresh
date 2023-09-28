import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()

export class RoleUserService {

    constructor(private http: HttpClient) {}

    getAllRoles() {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'User/GetAllRoles?UserType=' + localStorage.getItem("userType"), options);
    }

    saveRole(AddRole) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.post(environment.baseURL + 'User/CreateRole', AddRole, options);
    }

    updateRole(UpdateRole) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.post(environment.baseURL + 'User/UpdateRole', UpdateRole, options);
    }

    DeleteRoleById(RoleId): any {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'User/DeleteRoleById?RoleId=' + RoleId, options)
    }

    getAllUsers() {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'User/GetAllUsers?UserType=' + localStorage.getItem("userType") + '&FranchaseId=' + localStorage.getItem("franchaseId"), options);
    }

    saveUser(AddUser) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.post(environment.baseURL + 'User/AddUpdateUser', AddUser, options);
    }

    updateUser(UpdateUser) {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.post(environment.baseURL + 'User/AddUpdateUser', UpdateUser, options);
    }

    DeleteUserById(UserId): any {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'User/DeleteUser?UserId=' + UserId, options)
    }


    getAllUserModules(): any {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'User/GetAllModules', options)
    }


    
    getModulesByRoleId(roleId): any {
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'User/GetModulesByRoleId?RoleId='+roleId, options)
    }
   




    getFranchise(){
        const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("token")});
        const options = {headers: headers};
        return this.http.get(environment.baseURL + 'Franchase/GetAllFranchase?UserType=' + localStorage.getItem("userType") + '&FranchaseId=' + localStorage.getItem("franchaseId"), options);
    }
}