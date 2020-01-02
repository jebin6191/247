import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsArticleDescriptionComponent } from './news-article-description.component';
import { SafePipe } from '../shared/safe.pipe';
import { NewsArticleDescriptionRoutingModule } from './news-article-description-routing.module';

@NgModule({
  declarations: [NewsArticleDescriptionComponent, SafePipe],
  imports: [
    CommonModule,
    NewsArticleDescriptionRoutingModule
  ]
})
export class NewsArticleDescriptionModule { }
