import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.authService.batches(this.term).subscribe((data:any)=>{
      (this.batches= (data.content));
      // (this.arr= (data.content));
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
  }

  shifts(id){
    localStorage.setItem('batchid',id);
    this.router.navigate(['/batches/shifts']);
  }

  search(term){
    if(term == null || term.length == 0){
      this.authService.batches(this.term).subscribe((data:any)=>{
        (this.batches= (data.content));
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
      this.authService.batches(this.term).subscribe((data:any)=>{
        (this.batches= (data.content));
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
}
