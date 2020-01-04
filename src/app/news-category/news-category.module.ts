import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCategoryRoutingModule } from './news-category-routing.module';
import { NewsCategoryComponent } from './news-category.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [NewsCategoryComponent],
  imports: [
    CommonModule,
    NewsCategoryRoutingModule,
    NgxPaginationModule
  ]
})
export class NewsCategoryModule { }
