import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-threshold-products',
  templateUrl: './threshold-products.component.html',
  styleUrls: ['./threshold-products.component.scss']
})
export class ThresholdComponent implements OnInit {

  q: any
  searchText;
  page = 1
  pageno: any = 5;

  onPageChange(pageNumber) {
    console.log('efvents', pageNumber);
    this.q = pageNumber;
  }

  onChange(data) {
    this.pageno = data;
    this.onPageChange('')
  }

  key: string = '';
  reverse: boolean = false;

  sort(key) {
    console.log("key");

    this.key = key;
    this.reverse = !this.reverse
  }

  public data: any;
  public rowsOnPage = 10;
  public sortOrder = 'asc';
  public filterQuery = '';
  public sortBy = '';
  spinner: boolean = false;

  constructor(public productService: ProductService) {

  }

  ngOnInit() {
    this.GetAllproducts();
  }

  GetAllproducts() {
    this.spinner = true;
    this.productService.getAllthershold()
      .subscribe(data => {
        this.spinner = false;
        this.data = data;
        console.log(this.data)
      })
  }

}
