import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsArticleDescriptionComponent } from './news-article-description.component';
import { Routes, RouterModule } from '@angular/router';

const routes:Routes = [
  {
    path:'',
    component:NewsArticleDescriptionComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsArticleDescriptionRoutingModule { }
