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
  SubCategoryList: any =[];

  config: any;
  collection = { count: 60, data: [] };
  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private route: ActivatedRoute,private _Router:Router) { }

  ngOnInit() {
    
    this.route.queryParams
    .subscribe(params => {
      window.scrollTo(0,0);
      this.newsCategoryId = params.categoryId;
      if(this.newsCategoryId == 'national'){
        // this.NationalNews();
      }else{
        this.getNewsByCategory(this.newsCategoryId);   
      }     
    })
  }

  PaginationConfig(){
    this.config = {
      itemsPerPage: 30,
      currentPage: 1,
      totalItems: this.SubCategoryList.count
    };
  }

  GotToDesc(data){  
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
              for(let n of c.News){
                n.NewsContent = this.html2text(n.DetailedNews);
              }
            }
          }

          this.SubCategoryList = this.newsCategoryList[0];
          this.PaginationConfig();
        }
      });
  
  }

  html2text(html) {        
    let d = document.createElement("div");
    d.innerHTML = html;
    return d.innerText.split("\n").join("").trim();
}


  pageChanged(event){
    this.config.currentPage = event;
    this.window.scrollTo(0,420);
  }

  OnSubCategoryListClick(subcategory){
    for(let c of this.newsCategoryList){
      if(subcategory.SubCategoryId == c.SubCategoryId){
        this.SubCategoryList = c;
        console.log("dddd"+JSON.stringify(this.SubCategoryList))
      }
    }
    this.PaginationConfig();
  }

  // NationalNews() {
  //   this.homeService.GetNationalNews().subscribe((result: any) => {
  //       if (result) {
  //         this.subcategory.News = result;
  //       }
  //     });
  //   }
  }