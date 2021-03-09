import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from './contact.service';
import { NgForm, FormBuilder, Validators, FormControl, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  reviewList: any;
  searchList: any;
  title = 'review';
  constructor(
    private router: Router,
    public contactService: ContactService
  ){}

  onKeyPress(event): void {
    if (event.keyCode === 13) { // key 13 keycode is for ENTER key.
      // this.contactService.searchKeyword = event.target.value;
      this.router.navigate(['/search_result', {name: event.target.value}]);

      setTimeout(() => {
      this.contactService.onSearchReview.emit(event.target.value);
      }, 100);
    }

  }

  clickTrangChu(): void {
    this.router.navigate(['/home']);
  }

  clickTopic(): void {
    this.router.navigate(['/search']);
  }

  clickThacMac(): void {
    this.router.navigate(['/explain']);
  }

  clickYeuCau(): void {
    this.router.navigate(['/request']);
  }

  clickHuongDan(): void {
    this.router.navigate(['/tutorial']);
  }
}
