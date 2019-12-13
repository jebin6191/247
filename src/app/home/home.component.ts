import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


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
  },

  ] 
  constructor() { }

  ngOnInit() {
  }

}
