import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  public url = 'http://a.itying.com/';

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) { }

  get(api) {
    console.log(this.url + api);
    return this.http.get(this.url + api);

  }

  post(api, querydata) {
    console.log(this.url + api);
    return this.http.post(this.url + api, querydata, this.httpOptions);

  }

}
