import { Component, OnInit } from '@angular/core';
import { QueuesService } from '../queues.service';

import { Queue } from '../models/queue.model';
import { AuthService } from '../../../@core/auth/auth.service';

import { MatDialog } from '@angular/material/dialog';
import { NewQueueDialogComponent } from './new-queue-dialog.component';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'queues',
  templateUrl: './queues.component.html',
  styleUrls: ['./queues.component.scss'],
})
export class QueuesComponent implements OnInit {

  queues: Observable<Queue[]>;
  noOpenQueues: Observable<boolean>;

  constructor(
    private queuesService: QueuesService,
    public auth: AuthService,
    private toastrService: NbToastrService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.queues = this.queuesService.getQueues();
    this.noOpenQueues = this.queues.pipe(map(queues => queues.reduce((acc, queue) => acc && !queue.isOpen, true)));
  }

  numQueues(): Observable<number> {
    return this.queues.pipe(map(queues => queues.length ));
  }

  numOpenQueues(): Observable<number> {
    return this.queues
      .pipe(map(queues => queues.filter(queue => queue.isOpen).length ));
  }

  makeQueue() {
    const dialogRef = this.dialog.open(NewQueueDialogComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.queuesService.createQueue(result.name || '', result.desc || '', result.allowGrouping || false);
      this.showToast('Created New Queue', !!result.name ? result.name : undefined);
    });

  }

  showToast(title: string, message?: string): void {
    this.toastrService.show(!!message ? message : '', title, { limit: 3, status: 'success' });
  }

}
