import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/auth.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.sass']
})
export class ShiftsComponent implements OnInit {
  shifts: any[];
  shiftsData: any[];
  starttime: any[];
  endtime: any[];
  public pageSizeOptions1 = [5, 10];
  public isActive: any;
  page1 = 1;
  pageSize1 = 10;
  term;
  closeResult: string;
  size = 0;
  shiftids: any[] = [];
  checked;
  date = new Date();
  today = Date.now();
  tom = this.date.setDate(this.date.getDate() + 1);
  then = this.date.setDate(this.date.getDate() + 1);
  current = 'all';
  pipe = new DatePipe('en-US');
  enableEdit = false;
  enableEditIndex = null;
  shift: any;

  constructor(private authService: AuthService, private router: Router, private modalService: NgbModal) {}

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    const today = this.pipe.transform(this.today, 'yyyy-MM-dd');
    this.authService.shifts(localStorage.getItem('batchid'), today, localStorage.getItem('host')).subscribe((data: any) => {
        (this.shifts = (data));
        if (this.shifts.length) {
          // this.shifts.forEach(item => item.vehicleType == 4 ? item.quantity = 50 : item.vehicleType == 3 ? item.quantity = 30 : item.vehicleType == 2 ? item.quantity = 20 : 0);
          this.shifts.forEach(item => item.vehicleType == 4 ? item.weight = 800 : item.vehicleType == 3 ? item.weight = 100 : item.vehicleType == 2 ? item.weight = 15 : 0);
          this.shifts.forEach(item => item.vehicleType == 4 ? item.volume = 392 : item.vehicleType == 3 ? item.volume = 100 : item.vehicleType == 2 ? item.volume = 8 : 0);
          this.shifts.forEach(item => item.vehicleType == 4 ? item.crates = 100 : item.vehicleType == 3 ? item.crates = 50 : item.vehicleType == 2 ? item.crates = 5 : 0);
        }
        // console.log(data.shiftId);
        // (this.starttime= (data.startTime));
        // (this.endtime= (data.endTime));
        // (this.arr= (data.content));
        // this.sortedData = this.stores.slice();
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

  tomorrow() {
    const today = this.pipe.transform(this.tom, 'yyyy-MM-dd');
    this.authService.shifts(localStorage.getItem('batchid'), today, localStorage.getItem('host')).subscribe((data: any) => {
        (this.shifts = (data));
        if (this.shifts.length) {
          // this.shifts.forEach(item => item.vehicleType == 4 ? item.quantity = 50 : item.vehicleType == 3 ? item.quantity = 30 : item.vehicleType == 2 ? item.quantity = 20 : 0);
          this.shifts.forEach(item => item.vehicleType == 4 ? item.weight = 800 : item.vehicleType == 3 ? item.weight = 100 : item.vehicleType == 2 ? item.weight = 15 : 0);
          this.shifts.forEach(item => item.vehicleType == 4 ? item.volume = 392 : item.vehicleType == 3 ? item.volume = 100 : item.vehicleType == 2 ? item.volume = 8 : 0);
          this.shifts.forEach(item => item.vehicleType == 4 ? item.crates = 100 : item.vehicleType == 3 ? item.crates = 50 : item.vehicleType == 2 ? item.crates = 5 : 0);
        }
        // console.log(data.shiftId);
        // (this.starttime= (data.startTime));
        // (this.endtime= (data.endTime));
        // (this.arr= (data.content));
        // this.sortedData = this.stores.slice();
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

  enableEditMethod(e, i) {
    console.log('i', i);
    this.enableEdit = true;
    this.enableEditIndex = i;
  }

  enableEditMethodForSome(shiftContent2, data) {
    this.modalService.open(shiftContent2, {
      size: 'sm'
    });
    this.shift = data;
    // this.authService.ordersdetails(id).subscribe((data: any) => {
    //     (this.details = (Array.of(data)));
    //     (this.details2 = (data.orderItems));
    //     // this.sortedData = this.stores.slice();
    //     this.size = data.numberOfElements;
    //     // console.log(this.stores);
    //
    //   },
    //   error => {
    //     if (error.error.message == 'Access Denied') {
    //       localStorage.clear();
    //       this.router.navigate(['/']);
    //     } else {
    //       this.error = error.error.message;
    //     }
    //   });
  }

  updateShiftData(shift) {
    // this.shifts.forEach(item => {
    //   if (item.shiftId == shift.shiftId) {
    //     item.quantity = shift.quantity;
    //     item.weight = shift.weight;
    //   }
    // });
    this.modalService.dismissAll();
  }

  closeUpdates() {
    this.shifts.forEach(itemData => {
      if (itemData.shiftId == this.shift.shiftId) {
        // itemData.vehicleType == 4 ? itemData.quantity = 50 : itemData.vehicleType == 3 ? itemData.quantity = 30 : itemData.vehicleType == 2 ? itemData.quantity = 20 : 0;
        itemData.vehicleType == 4 ? itemData.weight = 800 : itemData.vehicleType == 3 ? itemData.weight = 100 : itemData.vehicleType == 2 ? itemData.weight = 15 : 0;
        itemData.vehicleType == 4 ? itemData.volume = 392 : itemData.vehicleType == 3 ? itemData.volume = 200 : itemData.vehicleType == 2 ? itemData.volume = 8 : 0;
        itemData.vehicleType == 4 ? itemData.crates = 100 : itemData.vehicleType == 3 ? itemData.crates = 50 : itemData.vehicleType == 2 ? itemData.crates = 5 : 0;
      }
    });
    this.modalService.dismissAll();
  }

  saveSegment() {
  }

  thenn() {
    const today = this.pipe.transform(this.then, 'yyyy-MM-dd');
    this.authService.shifts(localStorage.getItem('batchid'), today, localStorage.getItem('host')).subscribe((data: any) => {
        (this.shifts = (data));
        if (this.shifts.length) {
          // this.shifts.forEach(item => item.vehicleType == 4 ? item.quantity = 50 : item.vehicleType == 3 ? item.quantity = 30 : item.vehicleType == 2 ? item.quantity = 20 : 0);
          this.shifts.forEach(item => item.vehicleType == 4 ? item.weight = 800 : item.vehicleType == 3 ? item.weight = 100 : item.vehicleType == 2 ? item.weight = 15 : 0);
        }
        // console.log(data.shiftId);
        // (this.starttime= (data.startTime));
        // (this.endtime= (data.endTime));
        // (this.arr= (data.content));
        // this.sortedData = this.stores.slice();
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

  abc(event) {
    if (event.checked == true) {
      for (const b of this.shifts) {
        this.shiftids.push(b.shiftId);
      }
    }
    if (event.checked == false) {
      this.shiftids = [];
    }
    console.log(event.checked, this.shiftids);
  }

  getdata(event, item) {
    // checked = checked ? false : true;
    if (event.checked == true) {
      // this.shiftids.push({
      //   "shiftIds":id});
      this.shiftids.push(item);
    }
    if (event.checked == false) {
      this.shiftids = this.shiftids.filter(function(e) {
        return e != item;
      });
    }
    console.log(event.checked, this.shiftids);
  }

  createplan() {
    this.authService.createplanForShifts(this.shiftids, localStorage.getItem('batchid')).subscribe((data: any) => {
        Swal.fire({
          title: 'Shift Allocated!',
          text: 'Shift is Successfully Allocated!',
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
            title: 'Shift Can Not Be Allocated!',
            text: error.error.message,
            type: 'warning'
          });
        }
        console.log(error);
      });
  }

  selectPageSize(event) {
    this.pageSize1 = event;
  }
}
