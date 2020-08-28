import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of } from 'rxjs';
import { Prospect } from './home/Prospect';
import { retry , catchError } from 'rxjs/internal/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type:':'application/json',
    'Access-Control-Allow-Origin':'*',
  })
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private SERVER_URL = 'http://localhost:8080/prospects';
  constructor(private httpClient: HttpClient) { }
  
  private log(message: string){
    console.log(message);
  }

  private handleError<T>( operation = 'operation', result ?: T){
    return(error: any): Observable<T> => {
      console.error(error);
      this.log('${operation} failed: ${error.message}');
      return of(result as T);
    
    };
  }
  
  public getProspectByEmail(mail: string): Observable<Prospect[]>{
    return this.httpClient.get<Prospect[]>(this.SERVER_URL + '?prospectMail=' + mail)
    .pipe(
      retry(1),catchError(this.handleError<Prospect[]>('getProspectByEmail',[])));
    
  }

  
  public deleteProspect(prospectId: string): Observable<Prospect>{
    return this.httpClient.delete<Prospect>(this.SERVER_URL + '?prospectId=' + prospectId,httpOptions)
    .pipe(
      retry(1),catchError(this.handleError('deleteProspect',{}as Prospect))
    );
  }


  public postProspect(prospect : Prospect): Observable<Prospect>{    
    return this.httpClient.post<Prospect>(this.SERVER_URL, prospect, httpOptions)
    .pipe(
      retry(1), catchError(this.handleError('postProspect', prospect))
    );
  }

}
