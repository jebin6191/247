import { Component, Inject, OnInit } from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';
import { HomeService } from './shared/home.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms'
import { environment } from './shared/env';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  imageUrl = environment.imageUrl;
  imageUrlPath = environment.imageUrlPath;
  MenuToggle: boolean = false;
  form: FormGroup;
  error: string;
  userId: number = 1;
  uploadResponse: any = "";
  Temparr = [];
  public categoryList:any;
  public advertisementList:any;
  searchTerm : FormControl = new FormControl();
  NewsList = <any>[]
  events: string[] = [];
  selected: any = '';
  searchString ="";
  
  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private router: Router, private formBuilder: FormBuilder) {
    
  }

  ngOnInit() {
    this.Allcategory();
    this.getSliderNews();
    this.getScrollNews();
    
  }

  Allcategory() {
    this.homeService.Allcategory().subscribe(
      (result: any) => {
        if (result) {
          debugger;
          this.categoryList = result;
          for(var c of this.categoryList){
            this.Temparr = [];
            c.IsSubCatAvail = false;
            c.Toggle = false;
              if(c.SubCategoryJson){
                c.IsSubCatAvail = true;              
                c.SubCategoryJson = JSON.parse(c.SubCategoryJson);
              }
                for(var n of c.SubCategoryJson){
                  for(var news of n.News){
                    this.Temparr.push(news)
                  }
                }
              c.AllNews = (this.Temparr).sort((a, b) => parseInt(b.newsId) - parseInt(a.newsId));;
          }
          this.homeService.categoryList = this.categoryList
        }
      });
  }

  getSliderNews() {
    debugger;
    this.homeService.GetSliderNews().subscribe(
      (result: any) => {
        if (result) {
          for(let res of result){
            res.NewsHeadLine = res.HeadLine;
            res.UpdatedSrc = environment.imageUrl+res.Newsthump;
          }
          console.log("Slider News"+JSON.stringify(result))
          this.homeService.sliderNewsList = result;   
        }
      });
  }

  getScrollNews() {
    debugger;
    this.homeService.GetScrollNews().subscribe(
      (result: any) => {
        if (result) {
          for(let res of result){
            res.NewsHeadLine = res.HeadLine;
          }
          this.homeService.scrollNews = result;          
        }
      });
  }

}
