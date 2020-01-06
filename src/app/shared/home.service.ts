import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, debounceTime, map } from "rxjs/operators";
import { environment } from './env';


const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public categoryList:any;
  public advertisementList:any;
  public sliderNewsList:any;
  public latestNewsList:any;
  public videoNews:any = [];
  public articles:any;
  public scrollNews:any;
  public selectedArticleNews:any;
  constructor(private _httpClient: HttpClient) { }


  Allcategory(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/Allcategory")
      .pipe(catchError(this.handleError));
  }

  GetSliderNews(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetSliderNews")
      .pipe(catchError(this.handleError));
  }

  GetLatestNews(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetLatestNews")
      .pipe(catchError(this.handleError));
  }

  GetOtherNews(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetOtherNews")
      .pipe(catchError(this.handleError));
  }

  GetNews(id): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetNewsById/"+id)
      .pipe(catchError(this.handleError));
  }

  GetVideoNews(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetVideoNews")
      .pipe(catchError(this.handleError));
  }

  GetAdvertisement(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetAdvertisement")
      .pipe(catchError(this.handleError));
  }

  GetArticles(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetArticles")
      .pipe(catchError(this.handleError));
  }

  GetNewsByCategory(id): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetNewsByCategoryId/"+id)
      .pipe(catchError(this.handleError));
  }

  GetScrollNews(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetScrollNews")
      .pipe(catchError(this.handleError));
  }

  GetArticleComments(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetArticles")
      .pipe(catchError(this.handleError));
  }
  GetSearchedNews(data): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetSearchNews/"+data)
      .pipe(catchError(this.handleError));
  }

  GetNewsByDateRange(data): Observable<any> {
    return this._httpClient.post<any>(API_URL + "News/GetNewsByDate", data)
      .pipe(catchError(this.handleError));
  }

  FileUploads(data): Observable<any> {
    return this._httpClient.post<any>(API_URL + "News/sendMail", data)
      .pipe(catchError(this.handleError));
  }

  NewsCommentsSave(data): Observable<any> {
    return this._httpClient.post<any>(API_URL + "News/InsertComments", data)
      .pipe(catchError(this.handleError));
  }

  NewsCommentsGet(newsId, CommentType): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetComments?newsId="+newsId+"&CommentType="+CommentType)
      .pipe(catchError(this.handleError));
  }

  GetPopularNews(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetPopularNews/")
      .pipe(catchError(this.handleError));
  }

  GetNationalNews(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetNationalNews")
      .pipe(catchError(this.handleError));
  }

  GeArticleById(data): Observable<any> {
    return this._httpClient.get<any>(API_URL + "News/GetArticleById/"+data)
      .pipe(catchError(this.handleError));
  }

  search(term) {
    var listOfNews = this._httpClient.get(API_URL+'News/GetSearchNews/' + term)
    .pipe(
        debounceTime(100),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map(
            (data: any) => {
                return (
                    data.length != 0 ? data as any[] : [{"NewsHeadLine": "No Record Found"} as any]
                );
            }
    ));
    return listOfNews;  
  } 
  
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}