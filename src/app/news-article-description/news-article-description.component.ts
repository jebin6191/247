import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { WINDOW } from '@ng-toolkit/universal';
import { HomeService } from '../shared/home.service';
import { environment } from '../shared/env';


@Component({
  selector: 'app-news-article-description',
  templateUrl: './news-article-description.component.html',
  styleUrls: ['./news-article-description.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewsArticleDescriptionComponent implements OnInit {

  imageUrl = environment.imageUrl;
  imageUrlPath = environment.imageUrlPath;
  private twitter: any;
  newsId:number = 0;
  NewsArticle:any;
  categoryListArr:any =[];
  DetailedNews:any;
  RelatedArticles:any = [];

  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private _Router:Router, private route: ActivatedRoute) { 
    this.route.queryParams
    .subscribe(params => {
      window.scrollTo(0,0);
      this.newsId = params.newsId;
    })  
    this.initTwitterWidget(window);
  }

  ngOnInit() {
    this.GetNewsArticleById(this.newsId);
    this.Allcategory();
    this.getArticles();

  }

  Allcategory() {
    this.homeService.Allcategory().subscribe((result: any) => {
          this.categoryListArr = result;
      });
  }

  initTwitterWidget(window) {
    this.twitter = this._Router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        (<any>window).twttr = (function (d, s, id) {
          let js: any, fjs = d.getElementsByTagName(s)[0],
              t = (<any>window).twttr || {};
          if (d.getElementById(id)) return t;
          js = d.createElement(s);
          js.id = id;
          js.src = "https://platform.twitter.com/widgets.js";
          fjs.parentNode.insertBefore(js, fjs);

          t._e = [];
          t.ready = function (f: any) {
              t._e.push(f);
          };

          return t;
        }(document, "script", "twitter-wjs"));

        if ((<any>window).twttr.ready())
          (<any>window).twttr.widgets.load();

      }
    });
  }
  
    getArticles() {
      let arr = [];
      this.homeService.GetArticles().subscribe((result: any) => {
          if (result) {
            result.forEach(element => {
              element.NewsHeadLine = element.HeadLine
              element.NewsContent = this.html2text(element.News);
              element.ImageUrl = "https://admin.onebharathnews.tv/article/"+element.Newsthump
              if(element.newsId != this.newsId ){
                arr.push(element);
              }
            });  
            this.RelatedArticles = arr;         
          }
        });
    }

    html2text(html) {        
      let d = document.createElement("div");
      d.innerHTML = html;
      return d.innerText.split("\n").join("").trim();
  }

  GetNewsArticleById(data){      
    this.homeService.GeArticleById(data).subscribe(
      (result: any) => {
        if (result) {
           this.NewsArticle = result;
           this.DetailedNews = this.NewsArticle[0].News;
           console.log(this.NewsArticle);
        }
      })
  }
}