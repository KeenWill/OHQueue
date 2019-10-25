import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../question.service';
import { Observable, of } from 'rxjs';
import { Queue } from '../models/queue.model';
import { Question } from '../models/question.model';

import { AskQuestionDialog } from './ask-question-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../@core/auth/auth.service';

import { User } from '../../../@core/auth/auth.service';
import { QueuesService } from '../queues.service';

@Component({
  selector: 'queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  @Input() queue: Queue;

  questions: Observable<Question[]>;
  //sansweredQuestionsObs: Observable<Question[]>;
  //answeredQuestions: Observable<Question[]>;

  showAnswered: boolean = true;

  constructor(
    private questionService: QuestionService, 
    private queuesService: QueuesService, 
    public auth: AuthService, 
    public dialog: MatDialog) { 

      this.showAnswered = true;

  }

  ngOnInit() {
    //this.unansweredQuestions = this.questionService.getUnansweredQuestions(this.queue.id);
    //this.answeredQuestionsObs = this.questionService.getAnsweredQuestions(this.queue.id);
    //this.answeredQuestions = this.answeredQuestionsObs;

    this.questions = this.questionService.getQuestions(this.queue.id);

    //this.unansweredQuestions.subscribe((q) => { console.log(JSON.stringify(q))})
  }

  askQuestion(asker: User) {
    const dialogRef = this.dialog.open(AskQuestionDialog, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.questionService.createQuestion(asker, this.queue.id, result.title || "", result.desc || "");
    });
  }

  showAnsweredQuestions() {
    this.showAnswered = true;
    //this.answeredQuestions = this.answeredQuestionsObs;
  }

  hideAnsweredQuestions() {
    this.showAnswered = false;
    //this.answeredQuestions = of([]);
  }

  answerQuestion() {
    //this.questionService.answerQuestion(this.queue.id);
    console.log("answering question");
  }

  openQueue() {
    this.queuesService.openQueue(this.queue.id);
  }

  closeQueue() {
    this.queuesService.closeQueue(this.queue.id); 
  }

  deleteQueue() {
    this.queuesService.deleteQueue(this.queue.id);
  }

}
