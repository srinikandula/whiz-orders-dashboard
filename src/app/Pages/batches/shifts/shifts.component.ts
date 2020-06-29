import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.sass']
})
export class ShiftsComponent implements OnInit {
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

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.authService.shifts(localStorage.getItem('batchid')).subscribe((data:any)=>{
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
