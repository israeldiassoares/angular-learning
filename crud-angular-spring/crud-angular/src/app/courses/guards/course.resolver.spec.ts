import { TestBed } from '@angular/core/testing';

import { CourseResolver } from './course.resolver';
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('CourseResolver', () => {
  let resolver: CourseResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    resolver = TestBed.inject(CourseResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
