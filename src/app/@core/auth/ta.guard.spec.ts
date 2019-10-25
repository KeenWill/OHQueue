import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TAGuard } from './ta.guard';
import { AuthService } from './auth.service';
import { NotifyService } from '../notify/notify.service';
import { AngularFireAuthModule } from '@angular/fire/auth';


xdescribe('TAGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireAuthModule
      ],
      providers: [
        TAGuard,
        { provide: AuthService, useValue: { afAuth: { } } },
        { provide: NotifyService, useValue: { } }
      ]
    });
  });

  it('should ...', inject([TAGuard], (guard: TAGuard) => {
  }));
});
