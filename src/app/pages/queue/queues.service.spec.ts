import { TestBed, inject } from '@angular/core/testing';

import { QueuesService } from './queues.service';

xdescribe('NotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueuesService]
    });
  });

  it('should be created', inject([QueuesService], (service: QueuesService) => {
    expect(service).toBeTruthy();
  }));
});
