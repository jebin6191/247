import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsArticleDescriptionComponent } from './news-article-description.component';
import { NewsArticleDescriptionRoutingModule } from './news-article-description-routing.module';
import { HttpModule } from '@angular/http';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NewsArticleDescriptionComponent],
  imports: [
    CommonModule,
    NewsArticleDescriptionRoutingModule,
    HttpModule,
    ShareButtonsModule,
    CarouselModule,
    SharedModule
  ]
})
export class NewsArticleDescriptionModule { }
