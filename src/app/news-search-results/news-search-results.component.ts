import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../shared/home.service';
import { environment } from '../shared/env';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-news-search-results',
  templateUrl: './news-search-results.component.html',
  styleUrls: ['./news-search-results.component.css']
})
export class NewsSearchResultsComponent implements OnInit {
  NewsListByDateRange= <any>[];
  NewsListBySearchTerm= <any>[];
  imageUrl = environment.imageUrl;
  StartDate: string;
  EndDate: string;
  SearchTerm : string;

  config: any;
  constructor(@Inject(WINDOW) private window: Window,public homeService:HomeService,private route: ActivatedRoute, private router: Router) {
    debugger;
  }

  ngOnInit() {
    debugger;
 
    this.route
    .queryParams
    .subscribe(params => {
        this.StartDate = params['StartDate'];
        this.EndDate = params['EndDate'];
        this.SearchTerm =  params['SearchTerm'];
    });

    if(this.StartDate != ""){
      this.SearchByDate(this.StartDate, this.EndDate);
    }
    if(this.SearchTerm != ""){
      this.SearchByTerm(this.SearchTerm);
    }  
  }
  ngOnChanges(){
    if(this.StartDate != ""){
      this.SearchByDate(this.StartDate, this.EndDate);
    }
    if(this.SearchTerm != ""){
      this.SearchByTerm(this.SearchTerm);
    } 
  }

  SearchByTerm(searchstring){
    this.homeService.search(searchstring).subscribe(
      (result: any) => {
        if (result) {
          for(let n of result){
            n.NewsContent = this.html2text(n.DetailedNews);
          }
          console.log("result"+JSON.stringify(result))
          this.NewsListBySearchTerm = result; 
          this.PaginationConfig();
        }
      });
  }

  html2text(html) {        
    let d = document.createElement("div");
    d.innerHTML = html;
    return d.innerText.split("\n").join("").trim();
}

  SearchByDate(Sdate: string, Edate: string){
    let data = {
      StartDate : Sdate,
      EndDate : Edate
    }
    this.homeService.GetNewsByDateRange(data).subscribe(
      (result: any) => {
        if (result) {
          this.NewsListByDateRange = result; 
          this.NewsListByDateRange.forEach(element => {
            element.SubCategoryJson = JSON.parse(element.SubCategoryJson)
           

          });     
          console.log(JSON.stringify(this.NewsListByDateRange));
          this.PaginationConfig();
        }
      });
  }
  PaginationConfig(){
    this.config = {
      itemsPerPage: 36,
      currentPage: 1,
      totalItems: this.NewsListByDateRange.count
    };
  }

  pageChanged(event){
    this.config.currentPage = event;
    this.window.scrollTo(0,420);
  }

}