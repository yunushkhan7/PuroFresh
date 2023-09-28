import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //     // If the previous URL was blank, then the user is directly accessing this page
  //     if (this.router.url === '/') {
  //       this.router.navigate(['']); // Navigate away to some other page
  //       return false;
  //     }
  //     const url: string = state.url;
  //     return this.verifyLogin(url);
  //   }

    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.verifyLogin(url);
    }

  verifyLogin(url): boolean {
        if (!this.isLoggedIn()) {
		//	console.log("control");
            this.router.navigate(['/auth/login']);
            return false;
        } else if (this.isLoggedIn()) {
		//	console.log("control");
		//	 this.router.navigate(['/filesprocessed']);
            return true;
        }
    }

  public isLoggedIn(): boolean {
        let status = false;
        if ( localStorage.getItem('isLoggedIn') === 'true') {
          status = true;
        } else {
          status = false;
        }
        return status;
    }

}
