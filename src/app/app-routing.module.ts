import { RequestaddComponent } from './requestadd/requestadd.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { ExplainComponent } from './explain/explain.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'search', component: SearchComponent},
  { path: 'explain', component: ExplainComponent},
  { path: 'tutorial', component: TutorialComponent},
  { path: 'review', component: ReviewDetailComponent},
  { path: 'request', component: RequestaddComponent},
  { path: 'search_result', component: SearchResultComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
