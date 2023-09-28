import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavService, Menu } from '../../service/nav.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {

    public menuItems: Menu[];
    // public menuItems: any=[];
    public url: any;
    public fileurl: any;


    // ngOnInit() {
    // setInterval(() => {
    // this.getmenuItems();

    // }, 100);
    // }

    constructor(private router: Router, public navServices: NavService) {

        this.navServices.getAll().subscribe(data => {
            this.menuItems = data;
            console.log('navigationdata', this.menuItems, data);

            this.router.events.subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    console.log("evnt", event)

                    this.menuItems.filter(items => {
                        // console.log('items',items)
                        if (items.path === event.url)
                            this.setNavActive(items)
                        if (!items.children) return false
                        items.children.filter(subItems => {
                            if (subItems.path === event.url)
                                this.setNavActive(subItems)
                            if (!subItems.children) return false
                            subItems.children.filter(subSubItems => {
                                if (subSubItems.path === event.url)
                                    this.setNavActive(subSubItems)
                            })
                        })
                    })
                }
            })
        })


    }




    // Active Nave state
    setNavActive(item) {
        // console.log("passingfunction",item)
        this.menuItems.filter(menuItem => {
            if (menuItem != item)
                menuItem.active = false
            if (menuItem.children && menuItem.children.includes(item))
                menuItem.active = true
            if (menuItem.children) {
                menuItem.children.filter(submenuItems => {
                    if (submenuItems.children && submenuItems.children.includes(item)) {
                        menuItem.active = true
                        submenuItems.active = true
                    }
                })
            }
        })
    }

    // public getmenuItems() {
    // this.menuItems = [];


    // this.navServices.getAll().subscribe(data => {
    // this.menuItems = data;

    // });
    // }

    // Click Toggle menu

    // constructor(private router: Router, public navServices: NavService) {

    // // this.navServices.getAll(data => {
    // // this.menuItems = data
    // // this.router.events.subscribe((event) => {
    // // if (event instanceof NavigationEnd) {
    // // menuItems.filter((items: { path: string; children: any[]; }) => {
    // // if (items.path === event.url)
    // // this.setNavActive(items)
    // // if (!items.children) return false
    // // items.children.filter(subItems => {
    // // if (subItems.path === event.url)
    // // this.setNavActive(subItems)
    // // if (!subItems.children) return false
    // // subItems.children.filter(subSubItems => {
    // // if (subSubItems.path === event.url)
    // // this.setNavActive(subSubItems)
    // // })
    // // })
    // // })
    // // }
    // // })
    // // })
    // }
    // ngOnit(){
    // setInterval(() => {
    // this.getmenuItems();
    // //this.fullName = JSON.parse(localStorage.getItem('employeeDetails')).fullName;
    // // this.UserFullName = this.fullName;
    // // this.cancelledOrderNo();
    // //this.getAllCustomerPendingOrders();
    // }, 1000);

    // }
    // public getmenuItems() {
    // this.menuItems = [];


    // this.navServices.getAll().subscribe(data => {
    // this.menuItems = data;
    // console.log('loadingdata',this.menuItems)
    // // this.spinner = false;
    // ////console.log(this.sideitems);
    // this.menuItems = this.menuItems.parentNodes;
    // //console.log(this.mitems)
    // });
    // }

    // // Active Nave state
    // setNavActive(item) {
    // this.menuItems.filter(menuItem => {
    // if (menuItem != item)
    // menuItem.active = false
    // if (menuItem.children && menuItem.children.includes(item))
    // menuItem.active = true
    // if (menuItem.children) {
    // menuItem.children.filter(submenuItems => {
    // if (submenuItems.children && submenuItems.children.includes(item)) {
    // menuItem.active = true
    // submenuItems.active = true
    // }
    // })
    // }
    // })
    // }

    toggletNavActive(item) {
        if (!item.active) {
            this.menuItems.forEach(a => {
                if (this.menuItems.includes(item))
                    a.active = false
                if (!a.children) return false
                a.children.forEach(b => {
                    if (a.children.includes(item)) {
                        b.active = false
                    }
                })
            });
        }
        item.active = !item.active
    }

    //Fileupload
    readUrl(event: any) {
        if (event.target.files.length === 0)
            return;
        //Image upload validation
        var mimeType = event.target.files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        // Image upload
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
            this.url = reader.result;
        }
    }

}