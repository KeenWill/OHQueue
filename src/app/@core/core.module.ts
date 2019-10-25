import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { NotifyService } from './notify/notify.service';
import { TAGuard } from './auth/ta.guard';
import { ServedPipe } from './pipes/served/served.pipe';
import { UnservedPipe } from './pipes/served/unserved.pipe';

@NgModule({
  declarations: [ServedPipe, UnservedPipe],
  providers: [AuthService, AuthGuard, TAGuard, NotifyService],
  exports: [ServedPipe, UnservedPipe]
})
export class CoreModule { }
