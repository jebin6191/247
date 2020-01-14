import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '../shared/env';
import { WINDOW } from '@ng-toolkit/universal';
import { HomeService } from '../shared/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-video',
  templateUrl: './news-video.component.html',
  styleUrls: ['./news-video.component.css']
})
export class NewsVideoComponent implements OnInit {

  imageUrl = environment.imageUrl;
  imageUrlPath = environment.imageUrlPath;
  iframeVideo = '';
  iframeVideoIndex:any = "";
  config:any;
  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private _Router:Router) { }

  ngOnInit() {
    this.window.scrollTo(0,0);
    this.PaginationConfig();
     
  }


  openModal(modal, id){
    this.iframeVideo = 'https://www.youtube.com/embed/' + id;
    modal.style.display = "block";
  }

  closeModal(modal){
      modal.style.display = "none";
  }


  ifraVideo(index,link){
    debugger
    console.log(link)
    this.iframeVideoIndex = index
       this.iframeVideo = link.toString().trim();
      // document.getElementById("iframeVideo").innerHTML = '<iframe src="'+link.toString().trim()+'" width="420" height="345"></iframe>'
  }

  videopopup(){
    document.getElementById("iframeVideo").innerHTML = "";
  }

  PaginationConfig(){
    this.config = {
      itemsPerPage: 32,
      currentPage: 1,
      totalItems: this.homeService.videoNews.count
    };
  }
  pageChanged(event){
    this.config.currentPage = event;
    this.window.scrollTo(0,400);
  }

}
