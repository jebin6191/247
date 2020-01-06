import { Component, OnInit, Inject } from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from '../shared/home.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { environment } from '../shared/env';

@Component({
  selector: 'app-news-description',
  templateUrl: './news-description.component.html',
  styleUrls: ['./news-description.component.css']
})
export class NewsDescriptionComponent implements OnInit {

  newsId:any;
  imageUrlPath = environment.imageUrlPath;
  private twitter: any;
  newsDetails:any = [];
  DetailedNews: any;
  ShareUrl:string;
  categoryList: any = [];
  CommentType="news";
  CommentsList: any;
  CommentsForm: FormGroup;
  
  constructor(@Inject(WINDOW) private window: Window, private _Router:Router,private route: ActivatedRoute, public homeService:HomeService,
  private formBuilder: FormBuilder) {
    this.initTwitterWidget(window);  

    this.route.queryParams
    .subscribe(params => {
      window.scrollTo(0,0);
      this.newsId = params.newsId;    
      this.ShareUrl = "https://www.onebharathnews.tv/news-description?newsId="+this.newsId;
    })
   }
  
  ngOnInit() {
    this.CommentsForm = this.formBuilder.group({
      NewsId:[this.newsId],
      ParentId:[0],
      Description:[''],
      CommentType:['news'],
      CommentBy:[''],
    });
    this.GetNews(this.newsId);
    this.GetComments();
    this.Allcategory();
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

  GetComments(){       
    this.homeService.NewsCommentsGet(this.newsId, this.CommentType).subscribe(
      (result: any) => {
        if (result) {
           this.CommentsList = result;
        }
      })
  }

  SaveComments(){
    const data = this.CommentsForm.value;
    if(data){
      this.homeService.NewsCommentsSave(data).subscribe(
        (result: any) => {
        
          this.CommentsForm = this.formBuilder.group({
            NewsId:[this.newsId],
            ParentId:[0],
            Description:[''],
            CommentType:['news'],
            CommentBy:[''],
          });
          this.GetComments();
        })
    }
  }

  GetNews(id){
    this.homeService.GetNews(id).subscribe(
      (result: any) => {
        if (result) {
          console.log("restultt===>>  "+JSON.stringify(result))
          this.newsDetails = result;
          if(this.newsDetails.length > 0) {
            this.DetailedNews = this.newsDetails[0].News;
          }
        }
      })
    }

    Allcategory() {
      this.homeService.Allcategory().subscribe((result: any) => {
            this.categoryList = result;
        });
    }

}
