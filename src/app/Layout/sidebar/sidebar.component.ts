import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
