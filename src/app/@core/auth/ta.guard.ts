import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { NotifyService } from '../notify/notify.service';

@Injectable({
  providedIn: 'root'
})
export class TAGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private notify: NotifyService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user.pipe(
      take(1),
      map(user => !!user.isTA),
      tap(isTA => {
        if (!isTA) {
          console.log('access denied');
          this.notify.update('You must be a TA!', 'error');
          this.router.navigate(['/queues']);
        }
      })
    );
  }
}
