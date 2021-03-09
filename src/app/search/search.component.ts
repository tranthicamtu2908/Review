import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  monList: any;
  khoaList: any ;

  constructor(
    private router: Router,
    public contactService: ContactService,
  ) {
    // tslint:disable-next-line: variable-name
    this.contactService.getContact_khoa().subscribe(data_khoa => {
      this.khoaList = data_khoa['items'];
    });
    // tslint:disable-next-line: variable-name
    this.contactService.getContact_mon().subscribe(data_mon => {
      this.monList = data_mon['items'];
    });
  }

  // Cấu trúc y hệt onCLickMon
  onClickReview(evt) {
    console.log(evt);
    // lấy được id
    this.contactService.onlyID = evt.numberCode;
    const url = '/review';
    const queryParams = {
      object: evt.numberCode
    };
    this.router.navigate([url], {queryParams: queryParams});
  }


  ngOnInit(): void{
      console.log('Load Page');
  }

}
