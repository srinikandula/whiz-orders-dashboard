import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {env} from 'process';
import * as config from "./../assets/appsettings.json";
import {environment} from 'src/environments/environment';

// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  basePath = environment.basePath;
  testPath = environment.testPath;
  // authToken = localStorage.getItem('access_token');
  // basePath = config.basePath;
  // testPath = config.testPath;

  constructor(private router: Router,
              private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': "Bearer " + this.authToken
    })
  };


  login(cred) {
    return this.http.post<[]>(this.basePath + '/api/auth/signin', cred, this.httpOptions);
  }

  roles() {
    //   let customHeaders: Headers = new Headers();
    // customHeaders.append('token', token);
    return this.http.get<[]>(this.basePath + '/api/v1/user/getRoles', {
      headers: {['Content-Type']: 'application/json'},
    });
  }

  sites() {
    return this.http.post<[]>(this.testPath + '/api/v1/more/orders/searchStores', {"clientCode": "MORE"}, this.httpOptions);
  }

  getcall(id,link){
    return this.http.post<[]>(this.testPath + '/api/v1/whatsAppConversations/sendTrackingLink', {"orderId":id,"link":link}, this.httpOptions);
  }

  getcashsummary(date) {
    let httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'batchId':id
      })
    };
    return this.http.get<[]>(this.testPath + '/api/v1/more/orders/getCashSummery?date=' + date, httpOptions2);
  }

  getordersummary(date) {
    let httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'batchId':id
      })
    };
    return this.http.get<[]>(this.testPath + '/api/v1/more/orders/getOrdersSummery?date=' + date, httpOptions2);
  }

  ordersdetails(id) {
    let httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'batchId':id
      })
    };
    return this.http.get<[]>(this.testPath + '//api/v1/more/orders/getOrder/' + id, httpOptions2);
  }

  batches(search) {
    return this.http.post<[]>(this.testPath + '/api/v1/locusBatch/search', {"searchParam": search}, this.httpOptions);
  }

  createbatches(orderids, sitecode, batchname, date) {
    return this.http.post<[]>(this.testPath + '/api/v1/locusBatch/createBatch?orderIds=' + orderids + "&siteCode=" + sitecode + "&batchName=" + batchname + '&date=' + date, this.httpOptions);
  }

  // "orderIds":orderids,
  orders(code, date, search) {
    console.log(config.testPath, config.basePath);
    if (code == 'all') {
      return this.http.post<[]>(this.testPath + '/api/v1/more/orders/search', {
        "date": date,
        "searchParam": search
      }, this.httpOptions);
    } else {
      return this.http.post<[]>(this.testPath + '/api/v1/more/orders/search', {
        "storeId": code,
        "date": date,
        "searchParam": search
      }, this.httpOptions);
    }
  }

  count(code, date, search) {
    if (code == 'all') {
      return this.http.post<[]>(this.testPath + '/api/v1/more/orders/count', {
        "searchParam": search,
        "date": date
      }, this.httpOptions);
    } else {
      return this.http.post<[]>(this.testPath + '/api/v1/more/orders/count', {
        "storeId": code,
        "status": search,
        "date": date
      }, this.httpOptions);
    }
  }

  updateOrder(data) {
    return this.http.put(this.testPath + '/api/v1/more/orders/updateOrder/' + data.id, data, this.httpOptions);
  }

  // count2(code,search){
  //   if(code == 'all'){
  //     return this.http.post<[]>(this.testPath + '/api/v1/more/orders/count', {"searchParam":search},this.httpOptions);
  //   }
  //   else{
  //     return this.http.post<[]>(this.testPath + '/api/v1/more/orders/count', {"storeId":code,"status":search},this.httpOptions);
  //   }
  // }
  shifts(id, date) {
    let httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'batchId':id
      })
    };
    return this.http.get<[]>(this.testPath + '/api/v1/locusBatch/getShifts?batchId=' + id + '&date=' + date, httpOptions2);
  }

  cashm(date) {
    let httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'batchId':id
      })
    };
    return this.http.get<[]>(this.testPath + '/api/v1/more/trips/getTrips?date=' + date, httpOptions2);
  }

  createplan(shifts, batchid) {
    // let body = new HttpParams();
    // body = body.set('shiftIds', shifts);
    return this.http.post<[]>(this.testPath + '/api/v1/locusIntegration/createPlan?shiftIds=' + shifts + '&batchId=' + batchid, this.httpOptions);
  }

  createplanForShifts(shifts, batchId) {
    return this.http.post<[]>(this.testPath + '/api/v1/locusIntegration/createPlan?' + '&batchId=' + batchId, shifts, this.httpOptions);
  }

  planes(search) {
    return this.http.post<[]>(this.testPath + '/api/v1/more/locusPlan/search', {"searchParam": search}, this.httpOptions);
  }
}


