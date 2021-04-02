import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {AuthService} from '../../auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {FormControl} from '@angular/forms';
import {DatePipe} from '@angular/common';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

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
import { Socket } from 'ngx-socket-io';


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
  private userNamesListWithRole: Array<any> = [];

  private userNamesListWithRole: Array<any> = [];

  constructor(private authService: AuthService, private router: Router,private socket: Socket, private modalService: NgbModal, private formBuilder: FormBuilder) {
    // if(this.stores != null){
    // }
    this.authService.getUserNameList({}).subscribe((response: any) => {
      this.userNamesListWithRole = response.content;
    });
  }

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
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
    date: new Date(),
    userId: ''
  };

  public pagination:any = {
    page: 1,
    size: 10,
    pageSizes: ['10','20','50','100','200','500','1000']
};

  details;
  details2;
  details3;
  error;
  details4;

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

  openSmall2(content, id, items) {
    this.modalService.open(content, {
      size: 'lg'
    });
    this.authService.ordersdetails(id).subscribe((data: any) => {
        (this.details = (Array.of(data)));
        // console.log(this.details);
        (this.details2 = (data.orderItems));
        this.details3 = Array.of(items.address);
        this.details4 = data.orderHistory;
        // this.sortedData = this.stores.slice();
        // this.size = data.numberOfElements;
        console.log(this.details3);

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


  onFileSelect(event) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);

      if (!_.includes(af, file.type)) {
        alert('Only EXCEL Docs Allowed!');
      } else {
        this.fileInputLabel = file.name;
        this.fileUploadForm.get('myfile').setValue(file);
      }
    }
  }

  id;
  openCalendar(calendar,id){
    this.modalService.open(calendar,  {
      size: 'lg',
    });
    this.id = id;
  }

  activeDayIsOpen: boolean = true;
  calendardate;

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  starttime:any = {hour: 12, minute: 0};
  endtime = {hour: 12, minute: 0};
  meridian = true;
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] },dates): void {
    let today:any = new Date();
    today = today.getDate();
    let date2 = date.getDate();
    if(date2 >= today){
      this.calendardate = date;
      this.openDate(dates);
    }else{
      alert("Can Not Select Previous Dates");
    }
  }


  saveDate(){
    let date = new Date(this.calendardate);
    let year = date.getFullYear();
    let month = date.getMonth();
    let date2 = date.getDate();
    let starttime:any = new Date(year,month,date2,this.starttime.hour,this.starttime.minute);
    let endtime:any = new Date(year,month,date2,this.endtime.hour,this.endtime.minute);
    starttime = Date.parse(starttime);
    endtime = Date.parse(endtime);
    if(starttime === endtime || starttime > endtime){
      alert("Start Time Can not greater than End Time Or Same.")
    }
    else{
    this.calendardate = this.pipe.transform(this.calendardate,"yyyy-MM-dd");
    this.authService.rescheduleOrder(starttime,endtime,this.calendardate,this.id).subscribe((data:any) => {
      if(data === true){
        this.modalService.dismissAll();
        Swal.fire({
          title: 'Date Rescheduled',
          type: 'success'
        });
        this.ngOnInit();
      }
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
  
  }
  
  openDate(date){
    this.modalService.open(date,  {
      size: 'sm',
    });
  }

  openSmall3(content) {
    this.modalService.open(content,  {
      size: 'lg',
    });
  }


  onFormSubmit() {
    if (!this.fileUploadForm.get('myfile').value) {
      alert('Please fill valid details!');
      return false;
    }

    let formData = new FormData();
     formData.append('orders', this.fileUploadForm.get('myfile').value);
    // formData.append('agentId', '007');

    // console.log(this.fileUploadForm.get('myfile').value);
    this.authService.uploadfile(formData).subscribe((data: any) => {
      console.log(data);
      if(data.statusCodeValue == 400){
        let error:any[] = [];
        for(let i=0; i< data.body.length; i++){
          console.log(data.body)
          error.push('<li class="text-left text-danger">' + ' ' + data.body[i] + '</li>');
        }
        console.log(error);
        Swal.fire({
          title: 'Orders Can Not Be Inserted!',
          html: '<ol class="overflow-auto" style="height: 250px;overflow: scroll">' + error.join('') + '</ol>',
          // html: true,
          type: 'error'
        });
        this.fileUploadForm.reset();
        this.fileInputLabel = null;
      }
      else{
      Swal.fire({
        title: 'File Uploaded',
        text: data.body.count + ' Orders is Successfully Inserted!',
        type: 'success'
      });
      this.fileUploadForm.reset();
      this.fileInputLabel = null;
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    },
    error => {
      if (error.error.message == 'Access Denied') {
        localStorage.clear();
        this.router.navigate(['/']);
      } else {
        Swal.fire({
          title: 'Orders Can Not Be Created!',
          text: error.error.code || error.error.message,
          type: 'warning'
        });
        this.fileUploadForm.reset();
      this.fileInputLabel = null;
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
    console.log('this.flightSchedule', this.flightSchedule)
    const abc = this.flightSchedule.date.valueOf();
    const userId = this.flightSchedule.userId;
    const today = this.pipe.transform(abc, 'yyyy-MM-dd');
    this.pagination.status = data;
    this.authService.orders(today, userId, this.term, this.pagination, localStorage.getItem('host')).subscribe((data: any) => {
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
      // console.log(this.orderids);
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
    // console.log(event.checked, this.orderids);
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
        return e != orderData.orderId;
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
    const userId = this.flightSchedule.userId;
    const today = this.pipe.transform(abc, 'yyyy-MM-dd');
    // console.log(today);
    const prompt = window.prompt('Please Enter The Name Of Batch');

    if (prompt == null || prompt == '') {
      alert('You cancelled the creating batch!');
    } else {

      this.authService.createbatches(this.orderids, this.sitecode, prompt, localStorage.getItem('host'), today).subscribe((data: any) => {
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


  setupSocketConnection() {
    this.socket.on('getmessage', (data: string) => {
    if(data === 'updatedata'){
     this.getcounts();
     this.getorders();
    }
    });
  }


  getorders(){
    const abc = this.flightSchedule.date.valueOf();
    const userId = this.flightSchedule.userId;
    const today = this.pipe.transform(abc, 'yyyy-MM-dd');

    this.authService.orders(today, userId, this.term, this.pagination, localStorage.getItem('host')).subscribe((data: any) => {
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
  }

  getcounts(){
    const abc = this.flightSchedule.date.valueOf();
    const userId = this.flightSchedule.userId;
    const today = this.pipe.transform(abc, 'yyyy-MM-dd');

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

  ngOnInit() {
    this.setupSocketConnection();
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });

    this.getorders();
    this.getcounts();
    
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
    this.orderids = [];
    this.checked = false;
    this.pagination.page = event;
    this.ngOnInit();

}

handlePageSizeChange(event) {
  this.orderids = [];
  this.checked = false;
  this.pagination.size = event;
  this.pagination.page = 1;
  this.ngOnInit();
}
  search(term) {
    const abc = this.flightSchedule.date.valueOf();
    const userId = this.flightSchedule.userId;
    const today = this.pipe.transform(abc, 'yyyy-MM-dd');
    console.log(today);
    if (term == null || term.length == 0) {
      this.authService.orders(today, userId, this.term,this.pagination,localStorage.getItem('host')).subscribe((data: any) => {
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
      const userId = this.flightSchedule.userId;
      const today = this.pipe.transform(abc, 'yyyy-MM-dd');
      console.log(today);
      this.authService.orders(today, userId, this.term, this.pagination, localStorage.getItem('host')).subscribe((data: any) => {
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



