import {Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  title = 'ArchitectUI - Angular 7 Bootstrap 4 & Material Design Admin Dashboard Template';

  constructor(
    public http: HttpClient
  ) { }

  makeHttpCall() {
    this.http.get('https://jsonplaceholder.typicode.com/comments')
      .subscribe((r) => {
        console.log(r);
      });
  }
}
