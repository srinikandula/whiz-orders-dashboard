import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

export interface Dessert {
  id: number;
  text: string;
  time: number;
  data: string;
  url:string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit {
  current='all';
  stores: any[];
  public pageSizeOptions1 = [5,10];
  public isActive: any;
  page1 = 1;
  pageSize1 =5;
  term;
  closeResult: string;
  size = 0;
arr= this.stores;
url;

openLarge(content,url) {
  this.modalService.open(content, {
    size: 'lg'
  });
 this.url = url;
  
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
closed(){
  // console.log(this.arr);
  this.stores= this.arr;
  for(let b of this.stores){
      this.stores = this.stores.filter(function(number){
        return number.status == 'closed';
      });
      // console.log(this.boards);
  }
  this.size = this.stores.length;
}
completed(){
  // console.log(this.arr);
  this.stores= this.arr;
  for(let b of this.stores){
      this.stores = this.stores.filter(function(number){
        return number.status == 'complete';
      });
      // console.log(this.boards);
  }
  this.size = this.stores.length;
}
pending(){
  // console.log(this.arr);
  this.stores= this.arr;
  for(let b of this.stores){
      this.stores = this.stores.filter(function(number){
        return number.status == 'pending';
      });
      // console.log(this.boards);
  }
  this.size = this.stores.length;
}
all(){
  this.stores= this.arr;
  this.size = this.stores.length;
}

sortedData: any[];

  

  ngOnInit() {
    this.authService.orders(localStorage.getItem('site'),this.term).subscribe((data:any)=>{
      (this.stores= (data.content));
      (this.arr= (data.content));
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

  search(term){
    if(term == null || term.length == 0){
      this.authService.orders(localStorage.getItem('site'),this.term).subscribe((data:any)=>{
        (this.stores= (data.content));
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
      this.authService.orders(localStorage.getItem('site'),this.term).subscribe((data:any)=>{
        (this.stores= (data.content));
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
  
  constructor(private authService: AuthService,private router: Router,private modalService: NgbModal) { 
    // if(this.stores != null){
    // }
  }


  
// selectPageSize(event) {
//   this.pageSize1 = event.target.value;
//   }
//   sortData(sort: Sort) {
//     const data = this.stores.slice();
//     if (!sort.active || sort.direction === '') {
//       this.sortedData = data;
//       return;
//     }

//     this.sortedData = data.sort((a, b) => {
//       const isAsc = sort.direction === 'asc';
//       switch (sort.active) {
//         // case 'name': return compare(a.name, b.name, isAsc);
//         // case 'calories': return compare(a.calories, b.calories, isAsc);
//         // case 'fat': return compare(a.fat, b.fat, isAsc);
//         // case 'carbs': return compare(a.carbs, b.carbs, isAsc);
//         case 'updatedAt': return compare(a.updatedAt, b.updatedAt, isAsc);
//         default: return 0;
//       }
//     });
//   }
}

// function compare(a: number | string, b: number | string, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }


