import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestaddComponent } from './requestadd.component';

describe('RequestaddComponent', () => {
  let component: RequestaddComponent;
  let fixture: ComponentFixture<RequestaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
