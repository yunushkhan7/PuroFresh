import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {
  public list_pages = [];
  public selected = [];
  public data: any;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public addnewsflag = false;
  public editnewsflag = false;
    submitted = false;
    public spinner = true;

  public newsAddData: any = {
    'image': '',
    'title': '',
    'body': '',
  };

  public newsEditData: any = {
    'newsId' : '',
    'image': '',
    'title': '',
    'body': '',
  };
  
  public newsUpdateData: any = {
      'newsId': '',
      'image': '',
      'title': '',
      'body': '',
      'createdBy': ''
  }
	
  public image1:any;

  constructor() {
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  ngOnInit() {
  }

  public EditNews(){
    this.editnewsflag = true;
  }

  public open(){
    this.addnewsflag = true;
  }

  public closeNews(){
    this.editnewsflag = false;
    this.addnewsflag = false;
  }

}
