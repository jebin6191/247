import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'SafePipe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitize: DomSanitizer){  }

  transform(html: string): any {
    return this.sanitize.bypassSecurityTrustHtml(html); 
  }

}