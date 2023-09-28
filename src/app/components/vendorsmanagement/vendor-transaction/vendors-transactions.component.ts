import { Component, OnInit } from '@angular/core';
import { vendortransactionDB } from '../../../shared/tables/vendor-transaction-list';

@Component({
  selector: 'app-vendors-transactions',
  templateUrl: './vendors-transactions.component.html',
  styleUrls: ['./vendors-transactions.component.scss']
})
export class VendorsTransactionComponent implements OnInit {
  public vendors = [];
  
  public rowsOnPage = 5;
  public filterQuery = '';
  public sortBy = '';
  public adduserflag = false;
  public edituserflag = false;

  constructor() {
    this.vendors = vendortransactionDB.data;
  }

  public settings = {
    actions: {
      position: 'right'
    },
    columns: {
      vendor: {
        title: 'Vendor',
        type: 'html',
      },
      products: {
        title: 'Products'
      },
      store_name: {
        title: 'Store Name'
      },
      date: {
        title: 'Date'
      },
      balance: {
        title: 'Wallet Balance',
      },
      revenue: {
        title: 'Revenue',
      }
    },
  };

  ngOnInit() {
  }

  addtransactions(){
    this.adduserflag = true;
    this.edituserflag = false;
  }

  edituser(data){
    this.adduserflag = false;
    this.edituserflag = true;
  }

  Closebtn(){
    this.adduserflag = false;
    this.edituserflag = false;
  }

}
