import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCategoryRoutingModule } from './news-category-routing.module';
import { NewsCategoryComponent } from './news-category.component';

@NgModule({
  declarations: [NewsCategoryComponent],
  imports: [
    CommonModule,
    NewsCategoryRoutingModule
  ]
})
export class NewsCategoryModule { }
