import { Component, OnInit } from '@angular/core';
import { transactionsDB } from 'src/app/shared/tables/transactions';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  public transactions = []
  
   
  public rowsOnPage = 5;
  public filterQuery = '';
  public sortBy = '';
  public showlist = false;
  public title : string;

  constructor() {
    this.transactions = transactionsDB.data;
  }

  public settings = {
    actions: false,
    hideSubHeader: true,
    columns: {
      order_id: {
        title: 'Order Id', filter: false
      },
      transaction_id: {
        title: 'Transaction Id', filter: false
      },
      date: {
        title: 'Date', filter: false
      },
      pay_method: {
        title: 'Payment Method', filter: false,
        type: 'html',
      },
      delivery_status: {
        title: 'Delivery Status', filter: false
      },
      amount: {
        title: 'Amount', filter: false
      }
    },
  };

  ngOnInit() {
    this.title = "Today's Transaction Details";
  }

  public showlistfunction(data){
    if( data == "1"){
        this.title = "Today's Transactions";
    }
    if( data == "2"){
      this.title = "Transactions Completed";
    }
    if( data == "3"){
    this.title = "Transactions Inprogress";
    }
    if( data == "4"){
    this.title = "Transactions Stopped";
    }
    this.showlist = true;
  }

  public hidelistfunction(){
    this.showlist = false;
    this.title = "Today's Transaction Details";
  }

}
