import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cat } from '../../classes/cat';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  apiUrl = environment.url;

  constructor(public http: HttpClient) {
    this.http = http;
  }
  
  getAllCats(): Observable<Cat[]> {
    let authToken = localStorage.getItem('authToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type':  'application/json',
        'Authorization': `bearer ${authToken}`
      })
    };
    return  this.http.get<Cat[]>(this.apiUrl + "/api/cats/list", httpOptions);
  }

  getCats() : Observable<Cat[]>{
    let authToken = localStorage.getItem('authToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type':  'application/json',
        'Authorization': `bearer ${authToken}`
      })
    };
    return  this.http.get<Cat[]>(this.apiUrl + "/api/cats/update", httpOptions);
   }

   voteCat(cat: Cat, userVote: Boolean) : any {
    let authToken = localStorage.getItem('authToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type':  'application/json',
        'Authorization': `bearer ${authToken}`
      })
    };
    return this.http.post(this.apiUrl + "/api/cats/" + cat._id , {vote: userVote}, httpOptions)
   }
   
}
