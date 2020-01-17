import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDescriptionComponent } from './news-description.component';
import { NewsDescriptionRoutingModule } from './news-description-routing.module';
import { SafePipe } from '../shared/safe.pipe';

import { HttpModule } from '@angular/http';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { CarouselModule } from 'ngx-owl-carousel-o';



@NgModule({
  declarations: [NewsDescriptionComponent],
  imports: [
    CommonModule,
    NewsDescriptionRoutingModule,
    HttpModule,
    ShareButtonsModule,
    CarouselModule,
    SafePipe
  ]
})
export class NewsDescriptionModule { }
