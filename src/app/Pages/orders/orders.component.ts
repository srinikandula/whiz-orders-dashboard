import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.stores(localStorage.getItem('site')).subscribe((data:any)=>{
      (this.stores= (data.content));
      this.size = data.numberOfElements;
      // console.log(this.stores);
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
