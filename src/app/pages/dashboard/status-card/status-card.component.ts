import { Component, Input } from '@angular/core';
import { QueuesService } from '../../queue/queues.service';
import { Queue } from '../../queue/models/queue.model';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="flip()" [ngClass]="{'Closed': !queuesService}">
      <div class="icon-container">
        <div class="icon status-{{queue.isOpen ? 'success' : 'danger'}}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title h5">{{ queue.name }}</div>
        <div class="status paragraph-2">{{ queue.isOpen ? 'OPEN' : 'CLOSED' }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() queue: Queue;

  constructor(public queuesService: QueuesService) { }

  flip() {
    this.queue.isOpen 
      ? this.queuesService.closeQueue(this.queue.id) 
      : this.queuesService.openQueue(this.queue.id);
  }
}
