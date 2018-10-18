import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../../classes/user';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  apiUrl = environment.url;

  constructor(public http: HttpClient) {
    this.http = http;

  }
  
  register(form: any): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(this.apiUrl + "/api/users/register", form)
   }

   login(form: any) : any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(this.apiUrl + "/api/users/authenticate", form, httpOptions)
   }
   
}
