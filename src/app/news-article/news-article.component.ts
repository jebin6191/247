  
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WINDOW } from '@ng-toolkit/universal';
import { HomeService } from '../shared/home.service';
import { environment } from '../shared/env';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.css']
})
export class NewsArticleComponent implements OnInit {
  imageUrl = environment.imageUrl;
  imageUrlPath = environment.imageUrlPath;
  ArticlesList:any =[];
  config:any;
  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private _Router:Router) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.getArticles()
  }

  gotoArticle(data){
    this.window.open(environment.endPoint+ "article-description?newsId="+data.newsId+"&title="+ data.NewsHeadLine+"&image="+environment.imageUrl+data.Newsthump, '_self');
  }


    getArticles() {
    this.homeService.GetArticles().subscribe(
      (result: any) => {
        if (result) {
          result.forEach(element => {
            element.NewsHeadLine = element.HeadLine
            element.NewsContent = this.html2text(element.News);
          });  
          this.ArticlesList = result; 
          this.PaginationConfig();       
        }
      });
    }

    PaginationConfig(){
      this.config = {
        itemsPerPage: 36,
        currentPage: 1,
        totalItems: this.ArticlesList.count
      };
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
}