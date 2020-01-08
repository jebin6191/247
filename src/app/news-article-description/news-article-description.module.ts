import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsArticleDescriptionComponent } from './news-article-description.component';
import { SafePipe } from '../shared/safe.pipe';
import { NewsArticleDescriptionRoutingModule } from './news-article-description-routing.module';
import { HttpModule } from '@angular/http';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [NewsArticleDescriptionComponent, SafePipe],
  imports: [
    CommonModule,
    NewsArticleDescriptionRoutingModule,
    HttpModule,
    ShareButtonsModule,
    CarouselModule
  ]
})
export class NewsArticleDescriptionModule { }
