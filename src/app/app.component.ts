import { Component, Inject, OnInit } from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';
import { HomeService } from './shared/home.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms'
import { environment } from './shared/env';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var $: any;

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
  Today;any;
  
  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.Allcategory();
    this.getSliderNews();
    this.getScrollNews();
    this.getAdvertisement();
    this.getVideoNews();   
    this.GetCurrentdate()
  }


  GetCurrentdate(){
    var currentDate = new Date()
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    this.Today =  month  + "/" + day + "/" + year;
  }

  
  getVideoNews() {
    this.homeService.GetVideoNews().subscribe(
      (result: any) => {
        if (result) {
          result.forEach((item,i) => {
            var src = item.Link;
            var src1 = src.split("embed/");
            result[i]['videoId']=  src1[1]
            result[i]['video'] = item.Link;
            result[i]['title'] = (item.Title.length>50)? ((item.Title).slice(0, 50)+'...') : (item.Title) ;

            result[i]['thumbImage'] = "https://img.youtube.com/vi/"+src1[1]+"/0.jpg"; 
          })
          // this.SliderImages = result;
          this.homeService.videoNews = result;
          // console.log(JSON.stringify(this.SliderImages));
        }
      });
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
                    news.NewsContent = this.html2text(news.DetailedNews);
                    news.SubCategoryName = n.SubCategoryName;
                    this.Temparr.push(news)
                  }
                }
              c.AllNews = (this.Temparr).sort((a, b) => parseInt(b.newsId) - parseInt(a.newsId));;
          }
          this.homeService.categoryList = this.categoryList;
        }
      });
  }

  
  html2text(html) {        
    let d = document.createElement("div");
    d.innerHTML = html;
    return d.innerText.split("\n").join("").trim();
}

  getAdvertisement() {
    debugger;
    this.homeService.GetAdvertisement().subscribe(
      (result: any) => {
        if (result) {
          for(let i in result){
            this.homeService.advertisementList = result;
          }         
        }
      });
  }

  MoveTop(){
    this.window.scrollTo(0,420);
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
