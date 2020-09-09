import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {defaultFormat as _rollupMoment} from 'moment';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  selector: 'app-cashmanagement',
  templateUrl: './cashmanagement.component.html',
  styleUrls: ['./cashmanagement.component.sass'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class CashmanagementComponent implements OnInit {
  public pageSizeOptions1 = [5,10];
  public isActive: any;
  page1 = 1;
  pageSize1 =20;
  term;
  closeResult: string;
  size = 0;
  total;
delivered;
processing;
cancelled;
decline;
road;
ready;
cashm;
pipe = new DatePipe('en-US');
date = new FormControl(_moment());
flightSchedule = {
  date: new Date()
}

  constructor(private authService: AuthService,private router: Router,private modalService: NgbModal) { }
details;
  ngOnInit() {
    let abc = this.flightSchedule.date.valueOf();
    let today = this.pipe.transform(abc,'yyyy-MM-dd');
    console.log(today);
    this.authService.cashm(today).subscribe((data:any)=>{
      (this.cashm= (data));
      this.details = data.orderIds;
      // (this.arr= (data.content));
      // this.sortedData = this.stores.slice();
      this.size = data.length;
      // console.log(this.stores);

    },
    error =>{
      if(error.error.message == 'Access Denied'){
        localStorage.clear();
        this.router.navigate(['/']);
      }
      console.log(error);
    });
  }
  selectPageSize(event) {
    this.pageSize1 = event;
    }
    openSmall2(content) {
      this.modalService.open(content, {
        size: 'sm'
      });
    }

}
