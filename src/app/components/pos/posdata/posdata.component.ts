import { Component, OnInit} from '@angular/core';
import { POSService } from '../../services/pos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-posdata',
  templateUrl: './posdata.component.html',
  styleUrls: ['./posdata.component.scss']
})
export class POSDataComponent implements OnInit {

  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  sortOrder = 'asc'
  data: any;
  spinner = false;
  editData: any;

  constructor(public posService: POSService){} 

  ngOnInit() {
  this.getposdata();
  }

  getposdata() {
    this.posService.getposdata()
    .subscribe( data => {
      this.data = data;
      //console.log(this.data)
    })
  }

  editposdata(data) {
    this.editData = data.productslist;
  }

  
}