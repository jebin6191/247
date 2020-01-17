import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDescriptionComponent } from './news-description.component';
import { NewsDescriptionRoutingModule } from './news-description-routing.module';
import { HttpModule } from '@angular/http';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [NewsDescriptionComponent],
  imports: [
    CommonModule,
    NewsDescriptionRoutingModule,
    HttpModule,
    ShareButtonsModule,
    CarouselModule,
    SharedModule
  ]
})
export class NewsDescriptionModule { }
