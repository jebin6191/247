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
  HeaderName: any;
  ResultArr:any = [];

  config: any;
  collection = { count: 60, data: [] };
  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private route: ActivatedRoute,private _Router:Router) { }

  ngOnInit() {
    
    this.route.queryParams
    .subscribe(params => {
      window.scrollTo(0,0);
      this.newsCategoryId = params.categoryId;
      console.log("this.newsCategoryId"+this.newsCategoryId);
      if(this.newsCategoryId == 'national'){
        this.HeaderName = "NATIONAL";
         this.NationalNews();
      }else{
        this.getNewsByCategory(this.newsCategoryId);   
      }  
      this.PaginationConfig();   
    })
  }

  PaginationConfig(){
    this.config = {
      itemsPerPage: 36,
      currentPage: 1,
      totalItems: this.ResultArr.count
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
          this.ResultArr = this.SubCategoryList.News;
          this.HeaderName = this.newsCategoryList[0].CategoryName;
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
    console.log(JSON.stringify(subcategory))
    for(let c of this.newsCategoryList){
      if(subcategory.SubCategoryId == c.SubCategoryId){
        this.ResultArr = c.News;
        // console.log("dddd"+JSON.stringify(this.SubCategoryList))
      }
    }
    this.PaginationConfig();
  }

  NationalNews() {
    this.homeService.GetNationalNews().subscribe((result: any) => {
        if (result) {
          console.log("dddd"+JSON.stringify(result))
          for(let n of result){
            n.NewsContent = this.html2text(n.DetailedNews);
          }
          this.ResultArr = result;
          // this.subcategory.News = result;
        }
      });
    }
  }