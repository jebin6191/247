import { Component, OnInit, Inject } from '@angular/core';
import { HomeService } from '../shared/home.service';
import { WINDOW } from '@ng-toolkit/universal';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../shared/env';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  private twitter: any;
  imageUrlPath = environment.imageUrlPath;
  SliderImages:any;
  NationalNewsList:any = [];
    constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private _Router:Router, private sanitize: DomSanitizer) {
      this.initTwitterWidget(window);
    }

    ngOnInit() {
      this.NationalNews();
      this.getArticles();
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
      this.homeService.GetArticles().subscribe(
        (result: any) => {
          if (result) {
            result.forEach(element => {
              element.NewsHeadLine = element.HeadLine
              element.NewsContent = this.html2text(element.News);
            });  
            this.homeService.articles = result;         
          }
        });
    }

    html2text(html) {        
      let d = document.createElement("div");
      d.innerHTML = html;
      return d.innerText.split("\n").join("").trim();
  }

  NationalNews() {
    this.homeService.GetNationalNews().subscribe((result: any) => {
        if (result) {
          this.NationalNewsList = result;
          console.log(JSON.stringify(this.NationalNewsList));
        }
      });
    }
  

}
