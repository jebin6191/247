import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

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
  }

}
