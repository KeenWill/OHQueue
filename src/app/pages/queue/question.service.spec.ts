import { TestBed, inject } from '@angular/core/testing';

import { QuestionService } from './question.service';

xdescribe('NotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionService],
    });
  });

  it('should be created', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();
  }));
});
