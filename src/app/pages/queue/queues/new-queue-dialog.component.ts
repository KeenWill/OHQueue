import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Queue } from '../models/queue.model';

@Component({
  selector: 'new-queue-dialog',
  templateUrl: './new-queue-dialog.component.html',
  styleUrls: ['./new-queue-dialog.component.scss']
})
export class NewQueueDialog {

    constructor(
        public dialogRef: MatDialogRef<NewQueueDialog>,
        @Inject(MAT_DIALOG_DATA) public queue: Queue) {}
    
    onCloseClick(): void {
        this.dialogRef.close();
    }

}
