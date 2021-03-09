import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormBuilder, Validators, FormControl, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { ContactService } from './../contact.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as $ from "jquery";
import * as bootstrap from "bootstrap";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit, AfterViewInit {
  upForm: FormGroup;
  formCmt: FormGroup;
  khoaList: any ;
  monList: any;
  reviewList: any;
  commentList: any;
  idOfComment = null;

  onlyID = null;

  constructor(
    private formBuilder: FormBuilder,
    public contactService: ContactService,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.upForm = formBuilder.group({
      txtMess: ['', [Validators.minLength(10), Validators.required]],
      txtObj: [''],
      txtName: ['', Validators.required],
      txtChucVu: ['', Validators.required],
      slcDanhGia: ['', Validators.required]

    });
    this.upForm.controls.txtObj.disable();
    this.upForm.controls.txtObj.setValue(this.contactService.onlyID);

    this.formCmt = formBuilder.group({
      Cmt: ['', [Validators.minLength(10), Validators.required]],
      Ten: ['', Validators.required]
    });


    // tslint:disable-next-line: variable-name
    this.contactService.getContact_khoa().subscribe(data_khoa => {
      this.khoaList = data_khoa['items'];
    });
    // tslint:disable-next-line: variable-name
    this.contactService.getContact_mon().subscribe(data_mon => {
      this.monList = data_mon['items'];
    });

    this.contactService.getContact_review().subscribe(data_review => {
      this.reviewList = data_review['items'];
      console.log(this.reviewList);
    });

    this.contactService.getContact_comment().subscribe(data_comment => {
      this.commentList = data_comment['items'];
      console.log(this.commentList);
    });


  }

  // onClickReview(evt) {
  //   console.log(evt);
  //   // lấy được id
  //   this.contactService.onlyID = evt.numberCode;
  // }

  getIDqr(item){
    this.contactService.idOfReview = item.numberCode;
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
    this.activatedRoute.queryParams.subscribe(data => {
      console.log(data);
      if  (data.object)  {
        this.contactService.onlyID = data.object;
        this.onlyID = data.object;
      }

      if (data.idOfReview)  {

        setTimeout(() => {
          // HTML load hết thì mới chạy hàm này (tìm cách)
          const elmnt = document.getElementById(data.idOfReview);
          if (elmnt !== undefined && elmnt !== null) {
            elmnt.scrollIntoView();
          }
        }, 1000);
      }
    });
  }

  ngAfterViewInit(): void {
    this.upForm.controls.txtMess.valueChanges.subscribe(res => {
      console.log(res);
    });

    setTimeout(() => {
      // HTML load hết thì mới chạy hàm này (tìm cách)
      const elmnt = document.getElementById(this.contactService.idOfReview);
      if (elmnt !== undefined && elmnt !== null) {
        elmnt.scrollIntoView();
      }
    }, 200);

  }

  updateLike(id): void{
    this.contactService.updateLike(id).subscribe(res => {
      console.log(res);
    });
    this.contactService.getContact_review().subscribe(data_review => {
      this.reviewList = data_review['items'];
      console.log(this.reviewList);
    });
  }

  updateDisLike(id): void{
    this.contactService.updateDisLike(id).subscribe(res => {
      console.log(res);
    });
    this.contactService.getContact_review().subscribe(data_review => {
      this.reviewList = data_review['items'];
      console.log(this.reviewList);
    });
  }

  getID(item): void  {
    console.log(item);
    this.idOfComment = item.id;
  }

  UpReview(): void {
    console.log(this.upForm);
    const control = this.upForm.controls;
    const params = {
      "name": control.txtName.value,
      "position": control.txtChucVu.value,
      "content": control.txtMess.value,
      "numberCode": control.txtObj.value || this.contactService.onlyID,
      "like": 0,
      "disLike": 0,
      // tslint:disable-next-line: radix
      // "star": parseInt(control.slcDanhGia.value),

      "star": parseInt(control.slcDanhGia.value, 10),
    };

    this.contactService.createReview(params).subscribe(res => {
      console.log('KQ: ', res);
    });

    this.upForm.reset();
    // debugger
    // $('#myModal').modal('hide');
    alert('Send success!');
    this.contactService.getContact_review().subscribe(data_review => {
      this.reviewList = data_review['items'];
      console.log(this.reviewList);
    });
  }

  UpComment(): void {
    console.log(this.formCmt);
    const control = this.formCmt.controls;
    const params = {
      "name": control.Ten.value,
      "numberCode": String(this.idOfComment),
      "content": control.Cmt.value,
    };
    this.contactService.createComment(params).subscribe(res => {
      console.log('KQ: ', res);
    });
    this.formCmt.reset();

    alert('Send success!');
    // $('#myModal').modal('hide');
    this.contactService.getContact_comment().subscribe(data_comment => {
      this.commentList = data_comment['items'];
      console.log(this.commentList);
    });
  }


  UpCmt(): void {
    console.log(this.idOfComment);
    console.log(this.formCmt);
    console.log(this.formCmt.value.Ten);
    console.log(this.formCmt.value.Cmt);
  }

}



