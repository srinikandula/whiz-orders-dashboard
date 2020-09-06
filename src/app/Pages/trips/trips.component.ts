import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.sass']
})
export class TripsComponent implements OnInit {
  shifts: any[];
  starttime: any[];
  endtime: any[];
  public pageSizeOptions1 = [5,10];
  public isActive: any;
  page1 = 1;
  pageSize1 =10;
  term;
  closeResult: string;
  size = 0;
  shiftids:any[]=[];
  checked;
  date= new Date();
  today = Date.now();
  tom = this.date.setDate(this.date.getDate()+1);
  then = this.date.setDate(this.date.getDate()+1);
  current = 'all';
  pipe = new DatePipe('en-US');

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
    let today = this.pipe.transform(this.today,'yyyy-MM-dd');
    this.authService.shifts(localStorage.getItem('batchid'),today).subscribe((data:any)=>{
      (this.shifts= (data));
      // console.log(data.shiftId);
      // (this.starttime= (data.startTime));
      // (this.endtime= (data.endTime));
      // (this.arr= (data.content));
      // this.sortedData = this.stores.slice();
      this.size = data.length;
    },
    error =>{
      if(error.error.message == 'Access Denied'){
        localStorage.clear();
        this.router.navigate(['/']);
      }
      console.log(error);
    });
  }
  tomorrow(){
    let today = this.pipe.transform(this.tom,'yyyy-MM-dd');
    this.authService.shifts(localStorage.getItem('batchid'),today).subscribe((data:any)=>{
      (this.shifts= (data));
      // console.log(data.shiftId);
      // (this.starttime= (data.startTime));
      // (this.endtime= (data.endTime));
      // (this.arr= (data.content));
      // this.sortedData = this.stores.slice();
      this.size = data.length;
    },
    error =>{
      if(error.error.message == 'Access Denied'){
        localStorage.clear();
        this.router.navigate(['/']);
      }
      console.log(error);
    });
  }
  thenn(){
    let today = this.pipe.transform(this.then,'yyyy-MM-dd');
    this.authService.shifts(localStorage.getItem('batchid'),today).subscribe((data:any)=>{
      (this.shifts= (data));
      // console.log(data.shiftId);
      // (this.starttime= (data.startTime));
      // (this.endtime= (data.endTime));
      // (this.arr= (data.content));
      // this.sortedData = this.stores.slice();
      this.size = data.length;
    },
    error =>{
      if(error.error.message == 'Access Denied'){
        localStorage.clear();
        this.router.navigate(['/']);
      }
      console.log(error);
    });
  }

  abc(event){
    if(event.checked == true){
      for(let b of this.shifts){
        this.shiftids.push(b.shiftId);
      }
    }
    if(event.checked == false){
      this.shiftids = [];
    }
    console.log(event.checked,this.shiftids);
  }
  getdata(event,id){
    // checked = checked ? false : true;
    if(event.checked == true){
      // this.shiftids.push({
      //   "shiftIds":id});
      this.shiftids.push(id);
    }
    if(event.checked == false){
      this.shiftids = this.shiftids.filter(function(e){return e != id})
    }
    console.log(event.checked,this.shiftids);
  }

  createplan(){
    this.authService.createplan(this.shiftids,localStorage.getItem('batchid')).subscribe((data:any)=>{
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
