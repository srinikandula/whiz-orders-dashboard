import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import {FormControl} from '@angular/forms';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [DatePipe]
})

export class HomeComponent implements OnInit {
  data$: any[];
  sites: any[];
  stores: any[];
  token = localStorage.getItem('access_token');
  name = localStorage.getItem('name');
  date = new FormControl(new Date());
  checked: boolean = true;

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

  ngOnInit() {
    // this.authService.roles().subscribe((data:any)=>{
    //   (this.data$ = (data));
    // },
    // error =>{
    //   console.log(error);
    // });
    this.authService.sites().subscribe((data:any)=>{
      (this.sites= (data));
    },
    error =>{
      console.log(error);
    });

    
  }
  doSomething(event){
    this.authService.stores(event.value.clientStationCode).subscribe((data:any)=>{
      (this.stores= (data.content));
      this.size = data.numberOfElements;
      console.log(this.stores);
    },
    error =>{
      console.log(error);
    });
  }

  selectPageSize(event) {
    this.pageSize1 = event.target.value;
    this.page1 = 1;
    }
}
