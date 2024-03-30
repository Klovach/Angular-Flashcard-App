import { TestBed } from '@angular/core/testing';
import { FlashcardAppService } from './flashcard-app.service';

describe('FlashcardAppService', () => {
  let service: FlashcardAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashcardAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
