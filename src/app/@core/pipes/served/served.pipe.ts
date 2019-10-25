import { Pipe, PipeTransform } from '@angular/core';
import { Question } from '../../../pages/queue/models/question.model';

@Pipe({
  name: 'served'
})
export class ServedPipe implements PipeTransform {
  transform(questions: Question[]): Question[] {
    return questions.filter((question) => !!question.served);
  }
}
