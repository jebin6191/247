import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsSubcategoryComponent } from './news-subcategory.component';
import { RouterModule, Routes } from '@angular/router';


const routes:Routes = [
  {
    path:'',
    component:NewsSubcategoryComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsSubcategoryRoutingModule { }
