import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { listContentDB } from 'src/app/shared/tables/list-content';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})
export class ContentPageComponent implements OnInit {
  public generalForm: FormGroup;
  public seoForm: FormGroup;
  public contentPageEditFlag = false;
  public data: any;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';

  constructor(private formBuilder: FormBuilder) {
    this.createGeneralForm();
    this.createSeoForm();
  }

  createGeneralForm() {
    this.generalForm = this.formBuilder.group({
      name: [''],
      desc: [''],
      status: ['']
    })
  }
  createSeoForm() {
    this.seoForm = this.formBuilder.group({
      title: [''],
      keyword: [''],
      meta_desc: ['']
    })
  }

  ngOnInit() {
    this.data = listContentDB.list_content;
    console.log(this.data);
  }

  EditContent(content){
    this.contentPageEditFlag = true;
  }

  close(){
    this.contentPageEditFlag = false;
  }

}
