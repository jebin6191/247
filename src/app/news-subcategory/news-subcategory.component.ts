import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '../shared/env';
import { ActivatedRoute, Router } from '@angular/router';
import { WINDOW } from '@ng-toolkit/universal';
import { HomeService } from '../shared/home.service';

@Component({
  selector: 'app-news-subcategory',
  templateUrl: './news-subcategory.component.html',
  styleUrls: ['./news-subcategory.component.css']
})
export class NewsSubcategoryComponent implements OnInit {

  subcategoryId:any;
  subCategoryList:any;
  imageUrl = environment.imageUrl;
  config:any;
  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private route: ActivatedRoute,private _Router:Router) { }


  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      window.scrollTo(0,0);
      this.subcategoryId = params.subcategoryId;
      this.getNewsBySubcategory(this.subcategoryId);
    })
  }

  
  PaginationConfig(){
    this.config = {
      itemsPerPage: 30,
      currentPage: 1,
      totalItems: this.subCategoryList.count
    };
  }

  pageChanged(event){
    this.config.currentPage = event;
    this.window.scrollTo(0,400);
  }

  html2text(html) {        
    let d = document.createElement("div");
    d.innerHTML = html;
    return d.innerText.split("\n").join("").trim();
  }


  getNewsBySubcategory(id) {
    this.homeService.GetNewsByCategory(id).subscribe(
      (result: any) => {
        if (result) {
          this.subCategoryList = result;
          for(let c of this.subCategoryList){
            if(c.News){
              c.News = JSON.parse(c.News);
              for(let n of c.News){
                n.NewsContent = this.html2text(n.DetailedNews);
              }
            }
          }
          this.PaginationConfig();
         console.log( JSON.stringify(this.subCategoryList))  
        }
      });
  }

}
