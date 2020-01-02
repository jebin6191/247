import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path:'',
    component: MainComponent,
    children: [ 
      {
        path:'home',
        loadChildren: './home/home.module#HomeModule'
      },   
      {
        path: 'news-description',
        loadChildren: './news-description/news-description.module#NewsDescriptionModule'
      },
      // {
      //   path: 'news-category',
      //   loadChildren: './pages/news-category/news-category.module#NewsCategoryModule'
      // },
      // {
      //   path: 'news-subcategory',
      //   loadChildren: './pages/news-subcategory/news-subcategory.module#NewsSubcategoryModule'
      // },
      // {
      //   path: 'news-article',
      //   loadChildren: './pages/news-article/news-article.module#NewsArticleModule'
      // },
      // {
      //   path: 'news-video',
      //   loadChildren: './pages/news-video/news-video.module#NewsVideoModule'
      // },
      // {
      //   path: 'article-description',
      //   loadChildren: './pages/news-article-description/news-article-description.module#NewsArticleDescriptionModule'
      // },
      // {
      //   path: 'search-results',
      //   loadChildren: './pages/news-search-results/news-search-results.module#NewsSearchResultsModule'
      // },
      // {
      //   path: 'careers',
      //   loadChildren: './pages/careers/careers.module#CareersModule'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
