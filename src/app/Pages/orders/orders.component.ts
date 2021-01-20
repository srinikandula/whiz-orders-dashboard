import {Component, OnInit} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {FormControl} from '@angular/forms';
import {DatePipe} from '@angular/common';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {defaultFormat as _rollupMoment} from 'moment';
import swal from 'sweetalert2';

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
  url: string;
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

  constructor(private authService: AuthService, private router: Router, private modalService: NgbModal) {
    // if(this.stores != null){
    // }
  }

  current = 'all';
  stores: any[];
  public isActive: any;
  term;
  closeResult: string;
  size = 0;
  arr;
  url;
  total;
  delivered;
  atdc;
  cancelled;
  decline;
  road;
  ready;
  attempt;
  partial;
  customer;
  flag = 0;
  checked;
  shift: any;
// date =  new FormControl(new Date());
  pipe = new DatePipe('en-US');
  date = new FormControl(_moment());
  flightSchedule = {
    date: new Date()
  };

  public pagination:any = {
    page: 1,
    size: 10,
    pageSizes: ['10','20','50','100','200','500','1000']
};

  details;
  details2;
  error;

  orderids: any[] = [];
  count: any[] = [];
  sitecode: any;

  checkbox;

  sortedData: any[];


  orders;
  order: any;

  openLarge(content, url) {
    this.modalService.open(content, {
      size: 'lg'
    });
    this.url = url;

  }

  openSmall2(content, id) {
    this.modalService.open(content, {
      size: 'lg'
    });
    this.authService.ordersdetails(id).subscribe((data: any) => {
        (this.details = (Array.of(data)));
        console.log(this.details);
        (this.details2 = (data.orderItems));
        // this.sortedData = this.stores.slice();
        this.size = data.numberOfElements;
        // console.log(this.stores);

      },
      error => {
        if (error.error.message == 'Access Denied') {
          localStorage.clear();
          this.router.navigate(['/']);
        } else {
          this.error = error.error.message;
        }
        console.log(error);
      });

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

  status(data) {
    this.filter(data);
  }

  all() {
    this.pagination.status = null;
    this.ngOnInit();
  }

  filter(data){
    const abc = this.flightSchedule.date.valueOf();
    const today = this.pipe.transform(abc, 'yyyy-MM-dd');
    this.pagination.status = data;
    this.authService.orders(today, this.term, this.pagination, localStorage.getItem('host')).subscribe((data: any) => {
      (this.stores = (data.content));
      (this.arr = (data.content));
      this.size = data.totalElements;
      if (this.orderids.length == 0) {
        this.checkbox = 0;
      } else {
        this.checkbox = 1;
      }
    },
    error => {
      if (error.error.message == 'Access Denied') {
        localStorage.clear();
        this.router.navigate(['/']);
      }
      console.log(error);
    });
  }

  abc(event) {
    this.orderids = [];
//   if(event.checked == true){
//     for(let b of this.stores){
//       this.orderids.push(b.orderId);
//     }
//     console.log(this.orderids);
//   }
//   if(event.checked == false){
//     this.orderids = [];
//   }
//   console.log(event.checked,this.orderids);
// }

    if (event.checked == true) {
      this.flag = this.size;
      //   console.log(this.orderids);
      //   console.log(event);
      document.getElementById('batch').style.visibility = 'visible';
      for (const o of this.stores) {
        if (o.createdBatch == false) {
          this.sitecode = o.siteCode;
          this.orderids.push(o.orderId);
        }
      }
      if (this.orderids.length == 0) {
        document.getElementById('batch').style.visibility = 'hidden';
        this.checkbox = 0;
      }
      console.log(this.orderids);
      //   // this.shiftids.push({
      //   //   "shiftIds":id});
      //   if(this.orderids.length != 0){
      //     // for(let b of this.stores){
      //     //   this.sitecode = b.siteCode;
      //     // }
      //     if(this.sitecode == sitecode){
      //       this.orderids.push(id);
      //     }
      //     else{
      //       event.checked = false;

      //       console.log(event);
      //       Swal.fire({
      //         title:"Selecting Orders!",
      //         text: 'You cannot select orders from multiple batches!',
      //         type: 'info'
      //       });
      //     }
      //   }
      //   else{
      //     this.sitecode = sitecode;
      //     this.orderids.push(id);
      //   }
      //   console.log(this.sitecode);
      // }
    }
    if (event.checked == false) {
      this.flag = 0;
      if (this.flag == 0) {
        document.getElementById('batch').style.visibility = 'hidden';
        this.orderids = [];
      }
      // this.orderids = this.orderids.filter(function(e){return e != id})
    }
    console.log(event.checked, this.orderids);
  }

  getdata(event, orderData) {
    // checked = checked ? false : true;
    // if (event.checked == true) {
    //   this.flag++;
    //   document.getElementById('batch').style.visibility = 'visible';
    //   // this.shiftids.push({
    //   //   "shiftIds":id});
    //   if (this.orderids.length != 0) {
    //     // for(let b of this.stores){
    //     //   this.sitecode = b.siteCode;
    //     // }
    //     if (this.sitecode == sitecode) {
    //       this.orderids.push(id);
    //     } else {
    //       event.checked = false;
    //       // Swal.fire({
    //       //   title:"Selecting Orders!",
    //       //   text: 'You cannot select orders from multiple batches!',
    //       //   type: 'info'
    //       // });
    //     }
    //   } else {
    //     this.sitecode = sitecode;
    //     this.orderids.push(id);
    //   }
    // }
    if (event.checked == true) {
      document.getElementById('batch').style.visibility = 'visible';
      this.sitecode = orderData.siteCode;
      this.orderids.push(orderData.orderId);
    }
    if (event.checked == false) {
      this.flag--;
      if (this.flag == 0) {
        document.getElementById('batch').style.visibility = 'hidden';
      }
      this.orderids = this.orderids.filter(function (e) {
        return e != orderData.id;
      });
    }
  }

  editOrder(orderContent2, orderData) {
    this.modalService.open(orderContent2, {size: 'sm'});
    this.order = orderData;
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  updateOrderData(term, states) {
    if (states) {
      console.log('this.order', this.order);
      this.authService.updateOrder(this.order).subscribe((data: any) => {
        if (data) {
          this.search(term);
          this.modalService.dismissAll();
        }
      });
    }
  }

  closeOrderUpdates(term) {
    this.modalService.dismissAll();
    this.search(term);
  }

  createbatch() {
    // console.log(this.flightSchedule.date.valueOf());
    const abc = this.flightSchedule.date.valueOf();
    const today = this.pipe.transform(abc, 'yyyy-MM-dd');
    // console.log(today);
    const prompt = window.prompt('Please Enter The Name Of Batch');

    if (prompt == null || prompt == '') {
      alert('You cancelled the creating batch!');
    } else {

      this.authService.createbatches(this.orderids, this.sitecode, prompt, today).subscribe((data: any) => {
          // (this.stores= (data.content));
          // (this.arr= (data.content));
          // // this.sortedData = this.stores.slice();
          // this.size = data.numberOfElements;
          // console.log(this.stores);
          Swal.fire({
            title: 'Batch Created!',
            text: 'Batch is Successfully Created!',
            type: 'success'
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);


        },
        error => {
          if (error.error.message == 'Access Denied') {
            localStorage.clear();
            this.router.navigate(['/']);
          } else {
            Swal.fire({
              title: 'Batch Can Not Be Created!',
              text: error.error.message,
              type: 'warning'
            });
          }
          console.log(error);
        });
    }
  }

  ngOnInit() {
    const abc = this.flightSchedule.date.valueOf();
    const today = this.pipe.transform(abc, 'yyyy-MM-dd');

    this.authService.orders(today, this.term, this.pagination, localStorage.getItem('host')).subscribe((data: any) => {
        (this.stores = (data.content));
        (this.arr = (data.content));
        // this.orders = data.content.orderId;
        // this.sortedData = this.stores.slice();
        this.size = data.totalElements;
        // for (const o of this.stores) {
        //   if (o.createdBatch == false) {
        //     this.orderids.push(o.orderId);
        //   }
        // }
        if (this.orderids.length == 0) {
          this.checkbox = 0;
        } else {
          this.checkbox = 1;
        }
      },
      error => {
        if (error.error.message == 'Access Denied') {
          localStorage.clear();
          this.router.navigate(['/']);
        }
        console.log(error);
      });
    // this.authService.count(localStorage.getItem('site'), today, this.term).subscribe((data: any) => {
    //     // (this.count= (data.content));
    //     // (this.arr= (data.content));
    //     // // this.sortedData = this.stores.slice();
    //     // this.size = data.numberOfElements;
    //     this.total = data;

    //   },
    //   error => {
    //     if (error.error.message == 'Access Denied') {
    //       localStorage.clear();
    //       this.router.navigate(['/']);
    //     }
    //     console.log(error);
    //   });
    const abcd = [];
    abcd.push('DELIVERED');
    abcd.push('AT_DC');
    abcd.push('CANCELLED');
    abcd.push('REJECTED');
    abcd.push('READY_FOR_PICKUP');
    abcd.push('OUT_ON_ROAD');
    abcd.push('ATTEMPTED');
    abcd.push('PARTIALLY_DELIVERED');
    abcd.push('REJECTED_BY_CUSTOMER');
    // console.log(abcd);
    this.authService.getcount(today,localStorage.getItem('host')).subscribe((data: any) => {
        // (this.count= (data.content));
        // (this.arr= (data.content));
        // // this.sortedData = this.stores.slice();
        // this.size = data.numberOfElements;
        // console.log(data);
        this.total = data.total;
        this.delivered = data.DELIVERED;
        this.attempt = data.ATTEMPTED;
        this.atdc = data.AT_DC;
        this.cancelled = data.CANCELLED;
        this.decline = data.REJECTED_BY_DA;
        this.ready = data.READY_FOR_PICKUP;
        this.road = data.OUT_ON_ROAD;
        this.partial = data.PARTIALLY_DELIVERED;
        this.customer = data.REJECTED_BY_CUSTOMER;
      },
      error => {
        if (error.error.message == 'Access Denied') {
          localStorage.clear();
          this.router.navigate(['/']);
        }
        console.log(error);
      });
  }


  callicon(link,id){
    Swal.fire({
      title: 'Send WhatsApp Message?',
      text: "Do you want to share the tracking link via WhatsApp?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Sent it!'
    }).then((result) => {
      if (result.value) {
        this.authService.getcall(id, link).subscribe((data: any) => {
          // (this.stores = (data.content));
          // (this.arr= (data.content));
          // this.sortedData = this.stores.slice();
          // this.size = data.numberOfElements;
          // console.log(this.planes);
          Swal.fire(
            'Sent!',
            // 'Your file has been deleted.',
            'success'
          )
        },
        error => {
          if (error.error.message == 'Access Denied') {
            localStorage.clear();
            this.router.navigate(['/']);
          }
          Swal.fire('Error! Message Not Sent', '', 'error')
          console.log(error);
        });
      }else{
        Swal.fire('Not Sent', '', 'info')
      }
    })

   
  }

  changePage(event) {
    this.pagination.page = event;
    this.ngOnInit();
}

handlePageSizeChange(event) {
  this.pagination.size = event;
  this.pagination.page = 1;
  this.ngOnInit();
}
  search(term) {
    const abc = this.flightSchedule.date.valueOf();
    const today = this.pipe.transform(abc, 'yyyy-MM-dd');
    console.log(today);
    if (term == null || term.length == 0) {
      this.authService.orders(today, this.term,this.pagination,localStorage.getItem('host')).subscribe((data: any) => {
          (this.stores = (data.content));
          // (this.arr= (data.content));
          // this.sortedData = this.stores.slice();
          this.size = data.totalElements;
          // console.log(this.planes);
        },
        error => {
          if (error.error.message == 'Access Denied') {
            localStorage.clear();
            this.router.navigate(['/']);
          }
          console.log(error);
        });
    } else if (term.length >= 4) {
      const abc = this.flightSchedule.date.valueOf();
      const today = this.pipe.transform(abc, 'yyyy-MM-dd');
      console.log(today);
      this.authService.orders(today, this.term, this.pagination, localStorage.getItem('host')).subscribe((data: any) => {
          (this.stores = (data.content));
          // (this.arr= (data.content));
          // this.sortedData = this.stores.slice();
          this.size = data.totalElements;
          // console.log(this.planes);
        },
        error => {
          if (error.error.message == 'Access Denied') {
            localStorage.clear();
            this.router.navigate(['/']);
          }
          console.log(error);
        });
    }
  }

}



