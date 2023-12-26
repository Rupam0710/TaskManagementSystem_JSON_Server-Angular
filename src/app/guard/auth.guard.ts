import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private toastr: ToastrService,
    private service: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.service.IsLoggedIn()) {
      if (route.url.length > 0) {
        let menu = route.url[0].path;
        if (menu === 'user') {
          if (this.service.GetUserRole() === 'admin') {
            return true;
          } else {
            this.toastr.warning('You dont have access')
            this.router.navigate(['']);
            return false;
          }
        } else {
          return true;
        }
      }
      else {
        return true;
      }
    } else {
      this.router.navigate(['login'])
      return false;

    }
  }
};
