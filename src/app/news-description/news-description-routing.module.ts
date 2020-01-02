import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NewsDescriptionComponent } from './news-description.component';


const routes:Routes = [
  {
    path:'',
    component:NewsDescriptionComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsDescriptionRoutingModule { }
