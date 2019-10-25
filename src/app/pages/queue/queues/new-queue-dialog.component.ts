import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Queue } from '../models/queue.model';

@Component({
  selector: 'new-queue-dialog',
  templateUrl: './new-queue-dialog.component.html',
  styleUrls: ['./new-queue-dialog.component.scss'],
})
export class NewQueueDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<NewQueueDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public queue: Queue) {

    }

    onCloseClick(): void {
        this.dialogRef.close();
    }

}
