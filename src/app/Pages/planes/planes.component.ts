import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.sass']
})
export class PlanesComponent implements OnInit {
  plans: any[];
  public pageSizeOptions1 = [5,10];
  public isActive: any;
  page1 = 1;
  pageSize1 =5;
  term;
  closeResult: string;
  size = 0;

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.authService.planes(this.term).subscribe((data:any)=>{
      (this.plans= (data.content));
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

  search(term){
    if(term == null || term.length == 0){
      this.authService.planes(this.term).subscribe((data:any)=>{
        (this.plans= (data.content));
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
      this.authService.planes(this.term).subscribe((data:any)=>{
        (this.plans= (data.content));
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
  selectPageSize(event) {
    this.pageSize1 = event;
    }
}
