/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { _bookListService } from './_bookList.service';

describe('Service: _bookList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [_bookListService]
    });
  });

  it('should ...', inject([_bookListService], (service: _bookListService) => {
    expect(service).toBeTruthy();
  }));
});
