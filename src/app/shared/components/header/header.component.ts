import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService } from '../../service/nav.service';
import {AuthService} from '../../../components/auth/guards/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public right_sidebar: boolean = false;
  public open: boolean = false;
  public openNav: boolean = false;
  public isOpenMobile : boolean;

  @Output() rightSidebarEvent = new EventEmitter<boolean>();
  userData: any;
  firstName: any;
  lastName: any;

  constructor(public navServices: NavService, public authService: AuthService, private router: Router) { }

  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  }
  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }


  ngOnInit() { 
    this.firstName = JSON.parse(localStorage.getItem('userDetails')).firstName
    this.lastName = JSON.parse(localStorage.getItem('userDetails')).lastName;
   }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
