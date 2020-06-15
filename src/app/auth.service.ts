import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  basePath = 'https://admin.whizzard.in';
  testPath = 'http://qa.whizzard.in';

  constructor(private router: Router,
    private http: HttpClient) { }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    

    login(cred){
      return this.http.post<[]>(this.basePath + '/api/auth/signin', cred,this.httpOptions);
    }

    roles(){
    //   let customHeaders: Headers = new Headers();
    // customHeaders.append('token', token);
      return this.http.get<[]>(this.basePath + '/api/v1/user/getRoles',{
        headers:{['Content-Type']: 'application/json'},
      });
    }
    sites(){
      return this.http.post<[]>(this.testPath + '/api/v1/more/orders/searchStores', {"clientCode":"MORE"},this.httpOptions);
    }
    stores(code){
      if(code == 'all'){
        return this.http.post<[]>(this.testPath + '/api/v1/more/orders/search', {},this.httpOptions);
      }
      else{
        return this.http.post<[]>(this.testPath + '/api/v1/more/orders/search', {"storeId":code},this.httpOptions);
      }
    }
}


