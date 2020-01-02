import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WINDOW } from '@ng-toolkit/universal';

import { HomeService } from '../shared/home.service';
import { environment } from '../shared/env';

@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.component.html',
  styleUrls: ['./news-category.component.css']
})
export class NewsCategoryComponent implements OnInit {
  newsCategoryId:any;
  newsCategoryList:any;
  imageUrl = environment.imageUrl;
  subcategory = {
    "News": []
  };
  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private route: ActivatedRoute,private _Router:Router) { }

  ngOnInit() {
    
    this.route.queryParams
    .subscribe(params => {
      window.scrollTo(0,0);
      this.newsCategoryId = params.categoryId;
      if(this.newsCategoryId == 'national'){
        this.NationalNews();
      }else{
        this.getNewsByCategory(this.newsCategoryId);   
      }     
    })
  }
  GotToDesc(data){  
    console.log("test"+JSON.stringify(data));
    this.window.open(environment.endPoint+ "news-description?newsId="+data.newsId, '_self');
  }
  getNewsByCategory(id) {
    this.homeService.GetNewsByCategory(id).subscribe(
      (result: any) => {
        if (result) {
          this.newsCategoryList = result;
          for(let c of this.newsCategoryList){
            if(c.News){
              c.News = JSON.parse(c.News);
          }
          }
         console.log("getNewsByCategory 22 ==>>  " + JSON.stringify(this.newsCategoryList))  
        }
      });
  }

  NationalNews() {
    this.homeService.GetNationalNews().subscribe((result: any) => {
        if (result) {
          this.subcategory.News = result;
        }
      });
    }
  }