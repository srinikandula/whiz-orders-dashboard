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
    batches(search){
      return this.http.post<[]>(this.testPath + '/api/v1/locusBatch/search',{"searchParam":search},this.httpOptions);
    }
    createbatches(orderids,sitecode,batchname){
      return this.http.post<[]>(this.testPath + '/api/v1/locusBatch/createBatch?orderIds=' + orderids +"&siteCode=" + sitecode + "&batchName=" + batchname,this.httpOptions);
    }
    // "orderIds":orderids,
    orders(code,search){
      if(code == 'all'){
        return this.http.post<[]>(this.testPath + '/api/v1/more/orders/search', {"searchParam":search},this.httpOptions);
      }
      else{
        return this.http.post<[]>(this.testPath + '/api/v1/more/orders/search', {"storeId":code,"searchParam":search},this.httpOptions);
      }
    }
    count(code,search){
      if(code == 'all'){
        return this.http.post<[]>(this.testPath + '/api/v1/more/orders/count', {"searchParam":search},this.httpOptions);
      }
      else{
        return this.http.post<[]>(this.testPath + '/api/v1/more/orders/count', {"storeId":code,"status":search},this.httpOptions);
      }
    }
    shifts(id){
      let httpOptions2= {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // 'batchId':id
        })
      };
      return this.http.get<[]>(this.testPath + '/api/v1/locusBatch/getShifts?batchId=' + id,httpOptions2);
    }
    createplan(shifts,batchid){
      // let body = new HttpParams();
      // body = body.set('shiftIds', shifts);
      return this.http.post<[]>(this.testPath + '/api/v1/locusIntegration/createPlan?shiftIds=' + shifts + '&batchId=' + batchid,this.httpOptions);
    }
    planes(search){
      return this.http.post<[]>(this.testPath + '/api/v1/more/locusPlan/search',{"searchParam":search},this.httpOptions);
    }
}


