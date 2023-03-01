/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('Service: Courses', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesService],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should ...', inject([CoursesService], (service: CoursesService) => {
    expect(service).toBeTruthy();
  }));
});
