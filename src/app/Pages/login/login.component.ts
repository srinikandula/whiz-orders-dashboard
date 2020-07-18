import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  submitted = false;
  formvalue;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder,private authService: AuthService,private router: Router) {}
    
  
  ngOnInit() {
    this.loginform = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.minLength(10),Validators.pattern('^[6789]+[0-9]{9}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  }); 
  if(localStorage.getItem('access_token')!= null){
    this.router.navigate(['/home']);
  }
  }
  get f() { return this.loginform.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginform.invalid) {
        return;
    }
    this.formvalue = JSON.stringify(this.loginform.value);
    this.authService.login(this.formvalue).subscribe((data:any)=>{
      localStorage.setItem('access_token',data.accessToken);
      localStorage.setItem('name',data.fullName);
      this.router.navigate(['/home']);
    },
    error =>{
      document.getElementById("error").classList.remove("d-none");
      document.getElementById("error").innerHTML= error.error.message;
    });
  
  }
    
  
 
}
