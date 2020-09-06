import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
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

export interface Dessert {
  id: number;
  text: string;
  time: number;
  data: string;
  url:string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class OrdersComponent implements OnInit {
  current='all';
  stores: any[];
  public pageSizeOptions1 = [5,10];
  public isActive: any;
  page1 = 1;
  pageSize1 =20;
  term;
  closeResult: string;
  size = 0;
arr= this.stores;
url;
total;
delivered;
processing;
cancelled;
decline;
flag =0;
// date =  new FormControl(new Date());
pipe = new DatePipe('en-US');
date = new FormControl(_moment());
flightSchedule = {
  date: new Date()
}

openLarge(content,url) {
  this.modalService.open(content, {
    size: 'lg'
  });
 this.url = url;
  
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
closed(){
  // console.log(this.arr);
  this.stores= this.arr;
  for(let b of this.stores){
      this.stores = this.stores.filter(function(number){
        return number.status == 'CANCELLED';
      });
      // console.log(this.boards);
  }
  this.size = this.stores.length;
}
rejected(){
  // console.log(this.arr);
  this.stores= this.arr;
  for(let b of this.stores){
      this.stores = this.stores.filter(function(number){
        return number.status == 'REJECTED';
      });
      // console.log(this.boards);
  }
  this.size = this.stores.length;
}
completed(){
  // console.log(this.arr);
  this.stores= this.arr;
  for(let b of this.stores){
      this.stores = this.stores.filter(function(number){
        return number.status == 'COMPLETED';
      });
      // console.log(this.boards);
  }
  this.size = this.stores.length;
}
pending(){
  console.log(this.arr);
  this.stores= this.arr;
  for(let b of this.stores){
      this.stores = this.stores.filter(function(number){
        return number.status == 'processing';
      });
      // console.log(this.boards);
  }
  this.size = this.stores.length;
  
}
all(){
  this.stores= this.arr;
  this.size = this.stores.length;
}
orderids:any[]=[];
count:any[]=[];
sitecode:any;
abc(event){
  if(event.checked == true){
    for(let b of this.stores){
      this.orderids.push(b.orderId);
    }
    console.log(this.orderids);
  }
  if(event.checked == false){
    this.orderids = [];
  }
  console.log(event.checked,this.orderids);
}
getdata(event,id,sitecode){
  // checked = checked ? false : true;
  console.log(this.orderids);
  if(event.checked == true){
    this.flag++;
    console.log(this.orderids);
    console.log(event);
    document.getElementById("batch").style.visibility = "visible";
    // this.shiftids.push({
    //   "shiftIds":id});
    if(this.orderids.length != 0){
      // for(let b of this.stores){
      //   this.sitecode = b.siteCode;
      // }
      if(this.sitecode == sitecode){
        this.orderids.push(id);
      }
      else{
        event.checked = false;
        
        console.log(event);
        Swal.fire({
          title:"Selecting Orders!",
          text: 'You cannot select orders from multiple batches!',
          type: 'info'
        });
      }
    }
    else{
      this.sitecode = sitecode;
      this.orderids.push(id);
    }
    console.log(this.sitecode);
  }
  if(event.checked == false){
    this.flag--;
    if(this.flag == 0){
    document.getElementById("batch").style.visibility = "hidden";
    }
    this.orderids = this.orderids.filter(function(e){return e != id})
  }
  console.log(event.checked,this.orderids);
}
createbatch(){
  console.log(this.flightSchedule.date.valueOf());
    let abc = this.flightSchedule.date.valueOf();
    let today = this.pipe.transform(abc,'yyyy-MM-dd');
    console.log(today);
  let prompt = window.prompt("Please Enter The Name Of Batch");

  if(prompt == null || prompt == ""){
    alert("You cancelled the creating batch!");
  }
  else{
    console.log(prompt);
    
    this.authService.createbatches(this.orderids,this.sitecode,prompt,today).subscribe((data:any)=>{
      // (this.stores= (data.content));
      // (this.arr= (data.content));
      // // this.sortedData = this.stores.slice();
      // this.size = data.numberOfElements;
      // console.log(this.stores);
      Swal.fire({
        title:"Batch Created!",
        text: 'Batch is Successfully Created!',
        type: 'success'
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      

    },
    error =>{
      if(error.error.message == 'Access Denied'){
        localStorage.clear();
        this.router.navigate(['/']);
      }
      else{
        Swal.fire({
          title:"Batch Can Not Be Created!",
          text: error.error.message,
          type: 'warning'
        });
      }
      console.log(error);
    });
  }
}

sortedData: any[];

  

  ngOnInit() {
    
    this.authService.orders(localStorage.getItem('site'),this.term).subscribe((data:any)=>{
      (this.stores= (data.content));
      (this.arr= (data.content));
      // this.sortedData = this.stores.slice();
      this.size = data.numberOfElements;
      // console.log(this.stores);

    },
    error =>{
      if(error.error.message == 'Access Denied'){
        localStorage.clear();
        this.router.navigate(['/']);
      }
      console.log(error);
    });
    this.authService.count(localStorage.getItem('site'),this.term).subscribe((data:any)=>{
      // (this.count= (data.content));
      // (this.arr= (data.content));
      // // this.sortedData = this.stores.slice();
      // this.size = data.numberOfElements;
      this.total = data;

    },
    error =>{
      if(error.error.message == 'Access Denied'){
        localStorage.clear();
        this.router.navigate(['/']);
      }
      console.log(error);
    });
    
    this.authService.count(localStorage.getItem('site'),"COMPLETED").subscribe((data:any)=>{
      // (this.count= (data.content));
      // (this.arr= (data.content));
      // // this.sortedData = this.stores.slice();
      // this.size = data.numberOfElements;
      this.delivered = data;

    },
    error =>{
      if(error.error.message == 'Access Denied'){
        localStorage.clear();
        this.router.navigate(['/']);
      }
      console.log(error);
    });

    this.authService.count(localStorage.getItem('site'),"processing").subscribe((data:any)=>{
      // (this.count= (data.content));
      // (this.arr= (data.content));
      // // this.sortedData = this.stores.slice();
      // this.size = data.numberOfElements;
      this.processing = data;

    },
    error =>{
      if(error.error.message == 'Access Denied'){
        localStorage.clear();
        this.router.navigate(['/']);
      }
      console.log(error);
    });

    this.authService.count(localStorage.getItem('site'),"CANCELLED").subscribe((data:any)=>{
      // (this.count= (data.content));
      // (this.arr= (data.content));
      // // this.sortedData = this.stores.slice();
      // this.size = data.numberOfElements;
      this.cancelled = data;

    },
    error =>{
      if(error.error.message == 'Access Denied'){
        localStorage.clear();
        this.router.navigate(['/']);
      }
      console.log(error);
    });

    this.authService.count(localStorage.getItem('site'),"REJECTED").subscribe((data:any)=>{
      // (this.count= (data.content));
      // (this.arr= (data.content));
      // // this.sortedData = this.stores.slice();
      // this.size = data.numberOfElements;
      this.decline = data;

    },
    error =>{
      if(error.error.message == 'Access Denied'){
        localStorage.clear();
        this.router.navigate(['/']);
      }
      console.log(error);
    });

  }

  search(term){
    if(term == null || term.length == 0){
      this.authService.orders(localStorage.getItem('site'),this.term).subscribe((data:any)=>{
        (this.stores= (data.content));
        // (this.arr= (data.content));
        // this.sortedData = this.stores.slice();
        this.size = data.numberOfElements;
        // console.log(this.planes);
      },
      error =>{
        if(error.error.message == 'Access Denied'){
          localStorage.clear();
          this.router.navigate(['/']);
        }
        console.log(error);
      });
    }
    else if(term.length >= 4){
      this.authService.orders(localStorage.getItem('site'),this.term).subscribe((data:any)=>{
        (this.stores= (data.content));
        // (this.arr= (data.content));
        // this.sortedData = this.stores.slice();
        this.size = data.numberOfElements;
        // console.log(this.planes);
      },
      error =>{
        if(error.error.message == 'Access Denied'){
          localStorage.clear();
          this.router.navigate(['/']);
        }
        console.log(error);
      });
    }
  }
  
  constructor(private authService: AuthService,private router: Router,private modalService: NgbModal) { 
    // if(this.stores != null){
    // }
  }


  
// selectPageSize(event) {
//   this.pageSize1 = event.target.value;
//   }
//   sortData(sort: Sort) {
//     const data = this.stores.slice();
//     if (!sort.active || sort.direction === '') {
//       this.sortedData = data;
//       return;
//     }

//     this.sortedData = data.sort((a, b) => {
//       const isAsc = sort.direction === 'asc';
//       switch (sort.active) {
//         // case 'name': return compare(a.name, b.name, isAsc);
//         // case 'calories': return compare(a.calories, b.calories, isAsc);
//         // case 'fat': return compare(a.fat, b.fat, isAsc);
//         // case 'carbs': return compare(a.carbs, b.carbs, isAsc);
//         case 'updatedAt': return compare(a.updatedAt, b.updatedAt, isAsc);
//         default: return 0;
//       }
//     });
//   }
}

// function compare(a: number | string, b: number | string, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }


