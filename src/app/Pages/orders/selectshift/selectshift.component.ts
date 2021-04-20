import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-selectshift',
  templateUrl: './selectshift.component.html',
  styleUrls: ['./selectshift.component.sass']
})
export class SelectshiftComponent implements OnInit {

  size = 0;
  shiftids = '';
  public pageSizeOptions1 = [5, 10];
  public isActive: any;
  page1 = 1;
  pageSize1 = 10;
  checked;
  shifts: any[];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getshifts();
  }
  date;
  siteCode;
  id;
  getshifts(){
    this.id = localStorage.getItem('OrderId');
    this.date = localStorage.getItem('OrderDate');
    this.siteCode = localStorage.getItem('OrderSiteCode');
    this.authService.getshifts(this.siteCode, this.date).subscribe((data: any) => {
      this.shifts = data;
      this.size = data.length;
    },
    error => {
      if (error.error.message == 'Access Denied') {
        localStorage.clear();
        this.router.navigate(['/']);
      }
      console.log(error);
    });
  }

  getdata(event, item) {
    // checked = checked ? false : true;
    if (event.checked == true) {
      // this.shiftids.push({
      //   "shiftIds":id});
      this.shiftids = item.shiftId;
      item.flag = 1;
    }
    if (event.checked == false) {
      this.shiftids = '';
      item.flag = 0;
    }
    console.log(this.shiftids);
  }
  
  allocateshifts(){
    this.authService.allocateshift(this.shiftids,this.id).subscribe((data: any) => {
      Swal.fire({
        title: 'Shift Allocated!',
        text: 'Shift is Successfully Allocated!',
        type: 'success'
      });
      setTimeout(() => {
        this.router.navigate(['/orders']);
      }, 1000);
    },
    error => {
      if (error.error.message == 'Access Denied') {
        localStorage.clear();
        this.router.navigate(['/']);
      } else {
        Swal.fire({
          title: 'Shift Can Not Be Allocated!',
          text: error.error.message,
          type: 'warning'
        });
      }
      console.log(error);
    });
  }
}
