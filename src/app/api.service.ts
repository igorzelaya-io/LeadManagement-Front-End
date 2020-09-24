import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of } from 'rxjs';
import { Prospect } from './home/Prospect';
import { retry , catchError } from 'rxjs/internal/operators';
import { map } from 'rxjs/operators';
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':'application/json',
//     'Access-Control-Allow-Origin':'*',
//   })
// };

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  searchOption = [];
  
  public postData:Prospect[];
	
	private SERVER_URL = '/prospects';
  
  constructor(private httpClient: HttpClient) {

  }
  
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
         
  public getAllProspects():Observable<Prospect[]>{
    return this.httpClient.get<Prospect[]>(this.SERVER_URL)
    .pipe(
      retry(1),catchError(this.handleError<Prospect[]>('getAllProspects',[]))); 
  }


  public getProspectByEmail(mail: string): Observable<Prospect[]>{
    return this.httpClient.get<Prospect[]>(this.SERVER_URL + '?prospectEmail=' + mail)
    .pipe(
      retry(1),catchError(this.handleError<Prospect[]>('getProspectByEmail',[])));
    
  }

  
  public deleteProspect(prospectId: string): Observable<string>{
    return this.httpClient.delete<string>(this.SERVER_URL + '?prospectId=' + prospectId);   
  }


  public postProspect(prospect : Prospect): Observable<string> {
    return this.httpClient.post<string>(this.SERVER_URL, prospect);
  }
	filteredListOptions(){
		let posts = this.postData;
		let filteredPostsList = [];
		for(let post of posts){
			for(let options of this.searchOption){
				if(options.prospectEmail === post.prospectEmail){
					filteredPostsList.push(post);
				}
			}
		}
		console.log(filteredPostsList);
		return filteredPostsList;
	}
}
