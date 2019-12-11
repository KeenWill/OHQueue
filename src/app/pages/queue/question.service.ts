import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Question } from './models/question.model';
import { User } from '../../@core/auth/auth.service';

@Injectable()
export class QuestionService {

  // questionCollection: AngularFirestoreCollection<Question>;
  // questionDocument:   AngularFirestoreDocument<Question>;

  constructor(private afs: AngularFirestore) {
    // this.questionCollection = this.afs.collection<Question>('questions', (ref) => ref.orderBy('time', 'desc'));
  }

  getQuestions(queueId): Observable<Question[]> {
    // ['added', 'modified', 'removed']
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(23, 59, 59);
    return this.afs.collection<Question>(`/queues/${queueId}/questions/`,
    // ref => ref.where('timestamp', '>', date.getTime()).orderBy('timestamp'))
      ref => ref.orderBy('timestamp'))
    .snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      }),
    );
  }

  /*getAnsweredQuestions(queueId): Observable<Question[]> {
    // ['added', 'modified', 'removed']
    return this.afs.collection<Question>(`/queues/${queueId}/questions/`,
    ref => ref.orderBy('timestamp', 'desc'))//.where('served', '==', true))
    .snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    ).pipe(filter((questions) => questions.filter((question) => question.served)));
  }*/

  getQuestion(queueId: string, id: string): AngularFirestoreDocument<Question> {
    return this.afs.doc<Question>(`/queues/${queueId}/questions/${id}`);
  }

  createQuestion(asker: User, queueId: string, title: string, desc: string): Promise<DocumentReference> {
    const question = {
      uid: asker.uid,
      uName: asker.displayName,
      queueId,
      title: title || '',
      desc: desc || '',
      timestamp: new Date().getTime(),
      served: false,
    } as Question;
    return this.afs.collection<Question>(`queues/${queueId}/questions/`).add(question);
  }

  answerQuestion(id: string, queueId: string, taUid: string): Promise<void> {
    return this.getQuestion(queueId, id).update(
      { served: true,
        servedTime: new Date().getTime(),
        taAnswererUid: taUid,
      });
  }

  updateQuestion(question: Question) {
    return this.getQuestion(question.queueId, question.id).update(question);
  }

  unanswerQuestion(id: string, queueId: string): Promise<void> {
    return this.getQuestion(queueId, id).update({ served: false });
  }

  /*updateQuestion(id: string, data: any): Promise<void> {
    return this.getQuestion(id).update(data);
  }

  deleteQuestion(id: string): Promise<void> {
    return this.getQuestion(id).delete();
  }*/

  numberOfQuestionsAsked(): Observable<number> {
    return this.afs.collectionGroup<Question>(`questions`).valueChanges()
    .pipe(map((questions) => questions.length ));
  }

}
