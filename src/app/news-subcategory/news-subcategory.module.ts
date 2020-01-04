import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsSubcategoryRoutingModule } from './news-subcategory-routing.module';
import { NewsSubcategoryComponent } from './news-subcategory.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [NewsSubcategoryComponent],
  imports: [
    CommonModule,
    NewsSubcategoryRoutingModule,
    NgxPaginationModule
  ]
})
export class NewsSubcategoryModule { }
