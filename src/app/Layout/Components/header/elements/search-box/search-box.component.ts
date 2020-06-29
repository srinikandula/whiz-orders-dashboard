import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit {
  data$: any[];
  sites: any[];
  token = localStorage.getItem('access_token');
  name = localStorage.getItem('name');
  selected = 'all';

  public isActive: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.sites().subscribe((data:any)=>{
      if(data.message == 'Access Denied'){
        localStorage.removeItem('access_token');
      }else{
      (this.sites= (data));
      localStorage.setItem('site',this.selected);
    }},
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
