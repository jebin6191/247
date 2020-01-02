import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCategoryComponent } from './news-category.component';
import { Routes, RouterModule } from '@angular/router';

const routes:Routes = [
  {
    path:'',
    component:NewsCategoryComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsCategoryRoutingModule { }
