import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from './../contact.service';
import { NgForm, FormBuilder, Validators, FormControl, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-requestadd',
  templateUrl: './requestadd.component.html',
  styleUrls: ['./requestadd.component.css']
})
export class RequestaddComponent implements OnInit {
  addform: FormGroup;
  constructor(

    private formBuilder: FormBuilder,
    public contactService: ContactService
  ) {
    this.addform = formBuilder.group({
      Quantri: [''],
      name: ['', Validators.required],
      subject: ['', Validators.required],
      content: ['', Validators.required],
      phone: [''],
      mail: [''],
      hinh: [''],
      file: [''],
    });
    this.addform.controls.Quantri.disable();
    this.addform.controls.Quantri.setValue('camtu29082000@gmail.com');
  }

  ngOnInit(): void {
  }

  UpRequest(): void {

    console.log(this.addform);
    const control = this.addform.controls;
    const formData = new FormData();
    formData.append('To', control.Quantri.value);
    formData.append('Name', control.name.value);
    formData.append('Subject', control.subject.value);
    formData.append('Content', control.content.value);
    formData.append('NumberPhone', control.phone.value);
    formData.append('UserEmail', control.mail.value);
    formData.append('Image', control.hinh.value);
    formData.append('Attachments', control.file.value);

    this.contactService.createRequest(formData).subscribe(res => {
      console.log('KQ: ', res);
    });
    this.addform.reset();
  }

  // AddForm(): void {
  //   console.log(this.addform);
  //   if (this.addform.valid) {
  //     // Khi form valid thì làm ....
  //   } else {
  //     alert('Form chưa được điền đầy đủ');
  //   }
  // }
}
