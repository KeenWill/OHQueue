import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router, CanDeactivate, UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { NotifyService } from '../notify/notify.service';
import {LoginComponent} from '../../pages/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanDeactivate<LoginComponent> {
  constructor(
    private auth: AuthService,
    private router: Router,
    private notify: NotifyService,
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<UrlTree | boolean> {
    return this.auth.user.pipe(
      take(1),
      map(user => {
        if (!user) {
          this.notify.update('Not logged in!', 'error');
        }
        return !!user || this.router.parseUrl('/login');
      }),
    );
  }
  canDeactivate(
    component: LoginComponent,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user.pipe(
      take(1),
      map(user => !!user),
    );
  }
}
