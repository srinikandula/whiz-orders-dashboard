import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  data$: any[];
  sites: any[];
  token = localStorage.getItem('access_token');
  name = localStorage.getItem('name');
  selected = 'all';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // this.authService.roles().subscribe((data:any)=>{
    //   (this.data$ = (data));
    // },
    // error =>{
    //   console.log(error);
    // });
    this.authService.sites().subscribe((data:any)=>{
      (this.sites= (data));
      localStorage.setItem('site',this.selected);
    },
    error =>{
      console.log(error);
    });
    
    
  }
  doSomething(event){
    if(event.value.clientStationCode == undefined){
      localStorage.setItem('site',event.value);
    }
    else{
  localStorage.setItem('site',event.value.clientStationCode);
    }
  }

}
