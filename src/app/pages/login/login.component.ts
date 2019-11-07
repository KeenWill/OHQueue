import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../@core/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.auth.user.subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/pages/queues');
      }
    });
  }

  async signInWithGoogle() {
    await this.auth.googleLogin();
    return await this.afterSignIn();
  }

  /// Shared

  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    return this.router.navigate(['/queues']);
  }

}
