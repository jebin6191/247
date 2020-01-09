import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsArticleRoutingModule } from './news-article-routing.module';
import { NewsArticleComponent } from './news-article.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [NewsArticleComponent],
  imports: [
    CommonModule,
    NewsArticleRoutingModule,
    NgxPaginationModule
  ]
})
export class NewsArticleModule { }
