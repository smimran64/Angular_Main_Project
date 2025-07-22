import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AdminHotelAdminGuard implements CanActivate{

   constructor(

    private authService: AuthService,
    private router: Router,

    @Inject(PLATFORM_ID) private platformId: Object
  ){}


  canActivate(): boolean | UrlTree | Observable<boolean| UrlTree> {
   
    if(this.authService.isAuthenticated() && (this.authService.isHotelAdmin() || this.authService.isAdmin())){
      return true;
    }

    return this.router.createUrlTree(['']);
 
  }
 
};
