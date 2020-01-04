import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsSubcategoryRoutingModule } from './news-subcategory-routing.module';
import { NewsSubcategoryComponent } from './news-subcategory.component';

@NgModule({
  declarations: [NewsSubcategoryComponent],
  imports: [
    CommonModule,
    NewsSubcategoryRoutingModule
  ]
})
export class NewsSubcategoryModule { }
