import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterguardGuard implements CanActivate{

  constructor(
    private router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
        if(localStorage.getItem('access_token')!= null)
        {
          
          return true; 
        }
        else{
        //   if(this.dataService.isLoggedIn == false){
          this.router.navigate(['/login']);
          return false;
        // //}
          }
        }
  


  
}
