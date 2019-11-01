import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Queue } from './models/queue.model';

@Injectable()
export class QueuesService {

  queuesCollection: AngularFirestoreCollection<Queue>;

  constructor(private afs: AngularFirestore) {
    this.queuesCollection = this.afs.collection<Queue>('queues');
  }

  getQueues() {
    // ['added', 'modified', 'removed']
    return this.queuesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, containsUserQuestionUnknown: true, ...data };
        });
      }),
    );
  }

  getQueue(id: string): AngularFirestoreDocument<Queue> {
    return this.afs.doc<Queue>(`queues/${id}`);
  }

  createQueue(name: string, desc: string, allowGrouping: boolean): Promise<DocumentReference> {
    const queue = {
      name,
      isOpen: false,
      desc,
      allowGrouping,
    };
    return this.queuesCollection.add(queue);
  }

  openQueue(id: string): Promise<void> {
    return this.getQueue(id).update({ isOpen: true });
  }

  closeQueue(id: string): Promise<void> {
    return this.getQueue(id).update({ isOpen: false });
  }

  deleteQueue(id: string): Promise<void> {
    return this.getQueue(id).delete();
  }
}
