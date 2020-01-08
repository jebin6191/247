import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsSearchResultsComponent } from './news-search-results.component';
import { NewsSearchResultsRoutingModule } from './news-search-results-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [NewsSearchResultsComponent],
  imports: [
    CommonModule,
    NewsSearchResultsRoutingModule,
    NgxPaginationModule
  ]
})
export class NewsSearchResultsModule { }
