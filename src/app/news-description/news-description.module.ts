import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDescriptionComponent } from './news-description.component';
import { NewsDescriptionRoutingModule } from './news-description-routing.module';
import { SafePipe } from '../shared/safe.pipe';

@NgModule({
  declarations: [NewsDescriptionComponent,
    SafePipe],
  imports: [
    CommonModule,
    NewsDescriptionRoutingModule
  ]
})
export class NewsDescriptionModule { }
