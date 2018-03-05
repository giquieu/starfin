import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { tap } from 'rxjs/operators/tap';

import { NbAuthService } from '@nebular/auth';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: NbAuthService
  ) { }

  canActivate() {
    // canActive can return Observable<boolean>, which is exactly what isAuhenticated returns
    return this.authService.isAuthenticated()
    .pipe(
      tap(authenticated => {
        if (!authenticated) {
          console.log("auth/login");
          this.router.navigate(['auth/login']);
        }
      }),
    );
  }

}