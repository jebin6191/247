import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NewsSearchResultsComponent } from './news-search-results.component';

const routes:Routes = [
  {
    path:'',
    component:NewsSearchResultsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsSearchResultsRoutingModule { }
