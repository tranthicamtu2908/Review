import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from './../contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  reviewHotList = [];
  reviewList: any;
  reviewNewList: any;
  isLoadFinished = false;
  idOfReview = null;

  constructor(
    private router: Router,
    public contactService: ContactService
  ) {
    this.contactService.getContact_reviewHot().subscribe((data_reviewHot: any) => {
      console.log(data_reviewHot);
      const array = [];
      data_reviewHot.items.forEach((item, index) => {
        if (index < 3)  {
          array.push(item);
        }
      });

      this.reviewHotList = array;


      console.log('1', this.reviewHotList);
    });

    this.contactService.getContact_reviewNew().subscribe(data_reviewNew => {
      this.reviewNewList = data_reviewNew['items'];
    });
  }

  direc(item): void {
    console.log(item);
    this.idOfReview = item.numberCode;
    this.contactService.onlyID = item.numberCode;
    this.contactService.idOfReview = item.id;
    this.router.navigate([`/review`]);

    const url = '/review';
    const queryParams = {
        object: item.numberCode,
        idOfReview: item.id
    };
    this.router.navigate([url], {queryParams: queryParams});
  }

  ngOnInit(): void {

  }

}
