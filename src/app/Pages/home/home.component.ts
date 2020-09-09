import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import {FormControl} from '@angular/forms';
import { AuthService } from '../../auth.service';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {defaultFormat as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [DatePipe,
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})

export class HomeComponent implements OnInit {
  data$: any[];
  sites: any[];
  stores: any[];
  token = localStorage.getItem('access_token');
  name = localStorage.getItem('name');
  // date = new FormControl(new Date());
  checked: boolean = true;
  date = new FormControl(_moment());
flightSchedule = {
  date: new Date()
}

  heading = 'Home';
  // subheading = 'This is an example dashboard created for more retail.';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';

  public pageSizeOptions1 = [5,10];
  public isActive: any;
  page1 = 1;
  pageSize1 =5;
  term;
  closeResult: string;
  size = 0;
  boards=[
    {
    id:62000000123,
    text:"Out For Delivery",
    time:"5 mins ago"
  },
  {
    id:6200000161,
    text:"Waiting For Pickup",
    time:"25 mins ago"
  },
  {
    id:62000000123,
    text:"Out For Delivery",
    time:"5 mins ago"
  },
  {
    id:6200000161,
    text:"Waiting For Pickup",
    time:"25 mins ago"
  },
  {
    id:62000000123,
    text:"Out For Delivery",
    time:"5 mins ago"
  },
  {
    id:6200000161,
    text:"Waiting For Pickup",
    time:"25 mins ago"
  },
  {
    id:62000000123,
    text:"Out For Delivery",
    time:"5 mins ago"
  },
  {
    id:6200000161,
    text:"Waiting For Pickup",
    time:"25 mins ago"
  },
  {
    id:62000000123,
    text:"Out For Delivery",
    time:"5 mins ago"
  },
  {
    id:6200000161,
    text:"Waiting For Pickup",
    time:"25 mins ago"
  },

]
fromDate: NgbDate;
  toDate: NgbDate;
  model;
  selected;
constructor(calendar: NgbCalendar,private datePipe: DatePipe,private authService: AuthService) {
  // this.model = this.datePipe.transform(this.model, 'yyyy-MM-dd');
  this.fromDate = calendar.getToday();
  this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  // console.log(this.selected);
}
pipe = new DatePipe('en-US');
cashtobe;
cashdepo;
balance;
cashcol;
cashcan;
delivered;
assigned;
cancelled;
pending;
rejected;
total;
outfordelivery;
  ngOnInit() {
    let abc = this.flightSchedule.date.valueOf();
    let today = this.pipe.transform(abc,'yyyy-MM-dd');
    console.log(today);
    this.authService.getordersummary(today).subscribe((data:any)=>{
      this.assigned = data.assigned;
      this.delivered = data.delivered;
      this.cancelled = data.cancelled;
      this.pending = data.pending;
      this.rejected = data.rejected;
      this.total = data.total;
      this.outfordelivery = data.outfordelivery;
    },
    error =>{
      console.log(error);
    });
    this.authService.getcashsummary(today).subscribe((data:any)=>{
      this.cashtobe = data.CashToBeCollected;
      this.cashdepo = data.CashDeposited;
      this.balance = data.balance;
      this.cashcol = data.CashCollected;
      this.cashcan = data.CashForCancelledOrders;
    },
    error =>{
      console.log(error);
    });
    this.authService.sites().subscribe((data:any)=>{
      (this.sites= (data));
    },
    error =>{
      console.log(error);
    });

    
  }
  myOpts = {
    duration: 12.8,
  };
  // doSomething(event){
  //   this.authService.orders(event.value.clientStationCode,term).subscribe((data:any)=>{
  //     (this.stores= (data.content));
  //     this.size = data.numberOfElements;
  //     console.log(this.stores);
  //   },
  //   error =>{
  //     console.log(error);
  //   });
  // }

  selectPageSize(event) {
    this.pageSize1 = event.target.value;
    this.page1 = 1;
    }
}
