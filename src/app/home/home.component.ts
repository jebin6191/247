import { Component, OnInit, Inject } from '@angular/core';
import { HomeService } from '../shared/home.service';
import { WINDOW } from '@ng-toolkit/universal';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../shared/env';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  private twitter: any;
  imageUrlPath = environment.imageUrlPath;
  constructor(@Inject(WINDOW) private window: Window, public homeService:HomeService,private _Router:Router) {
    this.initTwitterWidget(window);
   }

  ngOnInit() {

  }


    initTwitterWidget(window) {
      this.twitter = this._Router.events.subscribe(val => {
        if (val instanceof NavigationEnd) {
          (<any>window).twttr = (function (d, s, id) {
            let js: any, fjs = d.getElementsByTagName(s)[0],
                t = (<any>window).twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);

            t._e = [];
            t.ready = function (f: any) {
                t._e.push(f);
            };

            return t;
          }(document, "script", "twitter-wjs"));

          if ((<any>window).twttr.ready())
            (<any>window).twttr.widgets.load();
        }
      });
    }


  

}
