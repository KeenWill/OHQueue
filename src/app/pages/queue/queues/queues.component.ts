import { Component, OnInit } from '@angular/core';
import { QueuesService } from '../queues.service';

import { Queue } from '../models/queue.model';
import { AuthService } from '../../../@core/auth/auth.service';

import { MatDialog } from '@angular/material/dialog';
import { NewQueueDialog } from './new-queue-dialog.component';

import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'queues',
  templateUrl: './queues.component.html',
  styleUrls: ['./queues.component.scss']
})
export class QueuesComponent implements OnInit {

  queues: Observable<Queue[]>;

  constructor(private queuesService: QueuesService, 
    public auth: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
    this.queues = this.queuesService.getQueues();
  }

  numQueues(): Observable<number> {
    return this.queues.pipe(map(queues => queues.length ));
  }

  numOpenQueues(): Observable<number> {
    return this.queues
      .pipe(map(queues => { return queues.filter(queue => queue.isOpen).length; }))
  }

  makeQueue() {
    const dialogRef = this.dialog.open(NewQueueDialog, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.queuesService.createQueue(result.name || "", result.desc || "", result.allowGrouping || false);
    });
    
  }
  
}