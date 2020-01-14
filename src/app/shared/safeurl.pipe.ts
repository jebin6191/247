import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'SafeurlPipe'
})
export class SafeurlPipe implements PipeTransform {

  constructor(private sanitize: DomSanitizer){  }

  transform(video: string): any {
    return this.sanitize.bypassSecurityTrustResourceUrl(video); 
  }

}