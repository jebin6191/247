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
  imageUrl = environment.imageUrl
  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private route: ActivatedRoute,private _Router:Router) { }


  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      window.scrollTo(0,0);
      this.subcategoryId = params.subcategoryId;
      this.getNewsBySubcategory(this.subcategoryId);
    })
  }


  getNewsBySubcategory(id) {
    this.homeService.GetNewsByCategory(id).subscribe(
      (result: any) => {
        if (result) {
          this.subCategoryList = result;
          for(let c of this.subCategoryList){
            if(c.News){
              c.News = JSON.parse(c.News);
          }
          }
         console.log("getNewsBySubcategory 333 ==>>  " + JSON.stringify(this.subCategoryList))  
        }
      });
  }

}
