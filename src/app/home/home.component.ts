import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 slidesStore : any = [
  {
    id: 1,
    src: 'assets/vendor/images/news/lifestyle/health5.jpg',
    title:'Netcix cuts out the chill with an integrated personal trainer on running'
  },
  {
    id: 2,
    src: 'assets/vendor/images/news/tech/gadget2.jpg',
    title:'Netcix cuts out the chill with an integrated personal trainer on running'
  },
  {
    id: 3,
    src: 'assets/vendor/images/news/lifestyle/travel5.jpg',
    title:'Netcix cuts out the chill with an integrated personal trainer on running'
  },
  {
    id: 4,
    src: 'assets/vendor/images/news/tech/gadget4.jpg',
    title:'Netcix cuts out the chill with an integrated personal trainer on running'
  }] 
  constructor(public homeService:HomeService) { }

  ngOnInit() {

  }


  

}
