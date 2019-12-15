import { Component, OnInit } from '@angular/core';
declare var $: any;

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
  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
      $('.featured-slider').owlCarousel({
        dots: false,
        lazyLoad:true,
        items: 1,
        autoplay: true,
        navigation: true,
        navigationText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']
      });
    });

    $('.more-news-slide').owlCarousel({
      dots: false,
      lazyLoad:true,
      items: 1,
      autoplay: true,
      navigation: true,
      navigationText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']
    });
   

    
  }

}
