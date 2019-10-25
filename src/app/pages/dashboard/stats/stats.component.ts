import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../@core/auth/auth.service';
import { QuestionService } from '../../queue/question.service';

@Component({
  selector: 'stats',
  styleUrls: ['./stats.component.scss'],
  templateUrl: './stats.component.html',
})
export class StatsComponent implements OnDestroy {

  numberOfQuestionsAsked: Observable<number>;

  constructor(public auth: AuthService, private questionService: QuestionService) {
    this.numberOfQuestionsAsked = questionService.numberOfQuestionsAsked();
  }

  ngOnDestroy() { }
}
