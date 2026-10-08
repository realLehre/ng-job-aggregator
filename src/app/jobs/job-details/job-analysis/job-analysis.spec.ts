import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobAnalysis } from './job-analysis';

describe('JobAnalysis', () => {
  let component: JobAnalysis;
  let fixture: ComponentFixture<JobAnalysis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobAnalysis]
    }).compileComponents();

    fixture = TestBed.createComponent(JobAnalysis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
