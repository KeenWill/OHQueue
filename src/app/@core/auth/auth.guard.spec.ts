import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { NotifyService } from '../notify/notify.service';
import { AngularFireAuthModule } from '@angular/fire/auth';


xdescribe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireAuthModule
      ],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: { afAuth: { } } },
        { provide: NotifyService, useValue: { } }
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
  }));
});
