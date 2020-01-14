import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsVideoComponent } from './news-video.component';
import { NewsVideoRoutingModule } from './news-video-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { SafeurlPipe } from '../shared/safeurl.pipe';

@NgModule({
  declarations: [NewsVideoComponent, SafeurlPipe],
  imports: [
    CommonModule,
    NewsVideoRoutingModule,
    NgxPaginationModule
  ]
})
export class NewsVideoModule { }
