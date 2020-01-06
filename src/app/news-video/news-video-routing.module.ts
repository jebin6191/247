import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NewsVideoComponent } from './news-video.component';

const routes:Routes = [
  {
    path:'',
    component:NewsVideoComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsVideoRoutingModule { }
