import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { ExplainComponent } from './explain/explain.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { NgZorroAntdModule, NzIconModule } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { RequestaddComponent } from './requestadd/requestadd.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HomeComponent,
    ExplainComponent,
    TutorialComponent,
    ReviewDetailComponent,
    RequestaddComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule, // Version 10.0.0 sẽ lỗi thời nên bị cảnh báo
    NzIconModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
