import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.sass']
})
export class BatchesComponent implements OnInit {
  batches: any[];
  public pageSizeOptions1 = [5,10];
  public isActive: any;
  page1 = 1;
  pageSize1 =5;
  term;
  closeResult: string;
  size = 0;
  
  public pagination:any = {
    page: 1,
    size: 10,
    pageSizes: ['10','20','50','100','200','500','1000']
};

  constructor(private authService: AuthService,private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.authService.batches(this.term,  this.pagination ,localStorage.getItem('host')).subscribe((data:any)=>{
      (this.batches= (data.content));
      // (this.arr= (data.content));
      // this.sortedData = this.stores.slice();
      this.size = data.totalElements;
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

  opensweetalert()
  {
    Swal.fire({
        title:"Creating Batches!",
        text: 'Batches Already Created for that!',
        type: 'info'
      });
  }

  shifts(id){
    localStorage.setItem('batchid',id);
    this.router.navigate(['/batches/shifts']);
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

  search(term){
    if(term == null || term.length == 0){
      this.authService.batches(this.term, this.pagination,localStorage.getItem('host')).subscribe((data:any)=>{
        (this.batches= (data.content));
        // (this.arr= (data.content));
        // this.sortedData = this.stores.slice();
        this.size = data.totalElements;
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
      this.authService.batches(this.term, this.pagination,localStorage.getItem('host')).subscribe((data:any)=>{
        (this.batches= (data.content));
        // (this.arr= (data.content));
        // this.sortedData = this.stores.slice();
        this.size = data.totalElements;
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
}
