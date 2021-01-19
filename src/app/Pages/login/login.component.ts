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
    this.router.navigate(['/orders']);
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
      let role = this.getUserRoleValue(data.role);
      localStorage.setItem('role', role);
      localStorage.setItem('profileurl', data.profilePicUrl);
      this.router.navigate(['/orders']);
    },
    error =>{
      document.getElementById("error").classList.remove("d-none");
      document.getElementById("error").innerHTML= error.error.message;
    });
  
  }

  getUserRoleValue(key) {
    if (key === 1) {
        return 'Associate';
    } else if (key === 5) {
        return 'Driver';
    } else if (key === 10) {
        return 'Driver And Associate';
    } else if (key === 15) {
        return 'Labourer';
    } else if (key === 19) {
        return 'Process Associate';
    } else if (key === 20) {
        return 'Site Supervisor';
    } else if (key === 26) {
        return 'Hub Manager';
    } else if (key === 25) {
        return 'Shift Lead';
    } else if (key === 30) {
        return 'Cluster Manager';
    } else if (key === 31) {
        return 'Ops Manager';
    } else if (key === 35) {
        return 'City Manager';
    } else if (key === 45) {
        return 'Super User';
    } else {
        return key;
    }
}
    
  
 
}
