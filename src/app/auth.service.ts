import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {env} from 'process';
import * as config from "./../assets/appsettings.json";
// import {environment} from 'src/environments/environment';
// var environment = require('src/environments/environment');
// var PropertiesReader = require('properties-reader');
// var properties = new PropertiesReader(environment);
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // basePath = environment.basePath;
  testPath = environment.testPath;
  // testPath = properties.get('main.PATH');
  // authToken = localStorage.getItem('access_token');
  // basePath = config.basePath;
  // testPath = config.testPath;
  // testPath = "http://192.168.29.145:8090";

  constructor(private router: Router,
              private http: HttpClient) {
                // console.log(this.testPath);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': "Bearer " + this.authToken
    })
  };

  login(cred) {
    return this.http.post<[]>(this.testPath + '/api/auth/signin',cred, this.httpOptions);
  }

  // roles() {
  //   //   let customHeaders: Headers = new Headers();
  //   // customHeaders.append('token', token);
  //   return this.http.get<[]>(this.basePath + '/api/v1/user/getRoles', {
  //     headers: {['Content-Type']: 'application/json'},
  //   });
  // }

  // sites() {
  //   return this.http.post<[]>(this.testPath + '/api/v1/more/orders/searchStores', {"clientCode": "MORE"}, this.httpOptions);
  // }

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


  rescheduleOrder(starttime,endtime,date,id){
    let body = {"id":id,"createdDate":date,"slot": {
      "endTime": endtime,
      "startTime": starttime
  },}
    return this.http.post<[]>(this.testPath + '/api/v1/orders/rescheduleOrder', body);
  }

  uploadfile(data){
    let body = "orders=" + data;
     console.log(data.get('formFile'));
    // let httpOptions2 = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
    //     // 'batchId':id
    //   })
    // };
    return this.http.post<[]>(this.testPath + '/api/v1/more/orders/uploadCloverOrders', data);
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
    return this.http.get<[]>(this.testPath + '/api/v1/more/orders/getOrder/' + id, httpOptions2);
  }

  batches(search,pagination,host) {
    return this.http.post<[]>(this.testPath + '/api/v1/locusBatch/search', {"searchParam": search, "page":pagination.page, "size":pagination.size, "clientCode": host}, this.httpOptions);
  }

  createbatches(orderids, sitecode, batchname, host, date) {
    return this.http.post<[]>(this.testPath + '/api/v1/locusBatch/createBatch?orderIds=' + orderids + "&siteCode=" + sitecode + "&batchName=" + batchname + '&date=' + date + '&clientCode=' + host, this.httpOptions);
  }

  getUserNameList(data) {
    return this.http.post<[]>(this.testPath + '/api/v1/user/getUserNamesList', data, this.httpOptions);
  }

  // "orderIds":orderids,
  orders(date, userId, search, pagination, host) {
    // console.log(config.testPath, config.basePath);
    // if (code == 'all') {
      return this.http.post<[]>(this.testPath + '/api/v1/more/orders/search', {
        "date": date,
        "userId": userId,
        "searchParam": search,
        "page":pagination.page,
        "size":pagination.size,
        "clientCode":host,
        // "host":host,
        "status":pagination.status
      }, this.httpOptions);
    // } else {
    //   return this.http.post<[]>(this.testPath + '/api/v1/more/orders/search', {
    //     "storeId": code,
    //     "date": date,
    //     "searchParam": search,
    //     "page":pagination.page,
    //     "size":pagination.size,
    //     "clientCode":host,
    //     "status":pagination.status
    //   }, this.httpOptions);
    // }
  }

  allocateshift(shiftid,id){
      return this.http.post<[]>(this.testPath + '/api/v1/locusIntegration/assignRiderToTask?id=' + id + '&shiftId=' + shiftid, {}, this.httpOptions);
  }


  getshifts(sitecode,date){
    return this.http.get<[]>(this.testPath + '/api/v1/userShift/getShiftsForOrders?siteCode=' + sitecode + '&shiftDateStr=' + date, this.httpOptions);
  }


  getcount(date,host){
    return this.http.get<[]>(this.testPath + '/api/v1/more/orders/getOrdersSummery?date=' + date + '&clientCode=' + host, this.httpOptions);
  }
  count(code, date, search) {
    if (code == 'all') {
      return this.http.post<[]>(this.testPath + '/api/v1/more/orders/getOrdersSummery', {
        // "searchParam": search,
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
  shifts(id, date, host) {
    let httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'batchId':id
      })
    };
    return this.http.get<[]>(this.testPath + '/api/v1/locusBatch/getShifts?batchId=' + id + '&date=' + date + '&clientCode=' + host, httpOptions2);
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

  createplanForShifts(shifts,forceuse, batchId) {
    return this.http.post<[]>(this.testPath + '/api/v1/locusIntegration/createPlan?' + 'batchId=' + batchId + '&forceUseAllVehicles=' + forceuse, shifts, this.httpOptions);
  }

  planes(search) {
    return this.http.post<[]>(this.testPath + '/api/v1/more/locusPlan/search', {"searchParam": search}, this.httpOptions);
  }
}


