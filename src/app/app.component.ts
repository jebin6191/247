import { Component, Inject, OnInit, ElementRef } from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';
import { HomeService } from './shared/home.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
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
  Today:any;
  GalleryArr:any =[];
  Gallery:any =[];

  actvalue:any = "0ct";
  
  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private router: Router, private formBuilder: FormBuilder, private el: ElementRef) {

  }

  ngOnInit() {
    this.Allcategory();
    this.getSliderNews();
    this.getScrollNews();
    this.getAdvertisement();
    this.getVideoNews();   
    this.GetCurrentdate();
    this.form = this.formBuilder.group({
      Name: ['', Validators.required],
      uploadedfile: ['', Validators.required],
      description: ['']
    });
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
    this.Gallery = [];
    this.homeService.Allcategory().subscribe(

      (result: any) => {
        this.GalleryArr = [];
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
                    this.GalleryArr.push(news)
                  }
                }
              c.AllNews = (this.Temparr).sort((a, b) => parseInt(b.newsId) - parseInt(a.newsId));
             
          }
          this.homeService.categoryList = this.categoryList;
          for(let i=0; i < 9; i++){
            this.Gallery.push(this.pickRandomQuestion());
          }
        }
      });
  }

   pickRandomQuestion(){
    var obj_keys = Object.keys(this.GalleryArr);
    var ran_key = obj_keys[Math.floor(Math.random() *obj_keys.length)];
    return this.GalleryArr[ran_key]
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

  MoveTop(event, value){

    this.actvalue = value;
    this.window.scrollTo(0,420);
    
    console.log(event.target.parentNode.nextSibling);
    document.getElementById("megamenu"+value).className = 'dropdown-menu mega-menu-content';
  }

  NavigateToSearch(event){
    if(event){
      // document.getElementById("navbarSupportedContent1").className = 'collapse navbar-collapse';
      if(this.searchString == null || this.searchString == ""){
        alert("SearchText can't be empty");
        return false;
    }
    }
    this.router.navigate(['/search-results'], { queryParams: { SearchTerm: this.searchString , StartDate: "", EndDate:""} } )
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

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.form.get('uploadedfile').setValue(file);
    }
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('uploadedfile').value);
    const body = {
      "Body": this.form.get('description').value,
      "Name": this.form.get('Name').value,
    };
    formData.append('data', JSON.stringify(body));
    this.homeService.FileUploads(formData).subscribe(
      (res) => {this.uploadResponse = res
      console.log(this.uploadResponse);
        if(this.uploadResponse == "Mail Sent"){
          alert("Submitted Successfully");
          this.form.reset();
        }     
      }
    );
  }

}
