import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';
import { Observable } from 'rxjs';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  // keyword$: Observable;
  name = '';

  searchList: any;
  handle = null;
  constructor(
    // private activatedRoute: ActivatedRoute,
    private router: Router,
    public contactService: ContactService,
  ) {
    this.handle = this.contactService.onSearchReview.subscribe(val => {
      this.testServiceApi(val);
    });
  }

  ngOnDestroy(): void {
    if (this.handle !== null)  {
      this.handle.unsubscribe();
    }
  }

  // tslint:disable-next-line: typedef
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

  ngOnInit(): void {
  }

  getIDqr(value) {
    console.log(value);
  }

  testServiceApi(name1): void {
    const url = 'https://reviewiuh-api.azurewebsites.net/api/Topic/name';
    this.contactService.reqUrl(url, {
      name: name1
    }).subscribe(res => {
      console.log('Test thử nghiệm request services: ', res);
      this.searchList = res['items'];
      console.log('Test thử nghiệm searchList: ', this.searchList);
    });
  }
}
