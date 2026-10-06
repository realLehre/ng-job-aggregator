import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobCard } from './job-card';

describe('JobCard', () => {
  let component: JobCard;
  let fixture: ComponentFixture<JobCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobCard],
    }).compileComponents();

    fixture = TestBed.createComponent(JobCard);
    fixture.componentRef.setInput('job', {
      _id: '1',
      __v: 0,
      active: true,
      company: 'Test Co',
      createdAt: '2026-01-01',
      description: 'Test',
      employmentType: [],
      fingerprint: '',
      lastSeenAt: '',
      location: 'Remote',
      postedAt: '',
      remote: true,
      scrapedAt: '',
      skills: ['Angular'],
      source: 'Direct',
      sourceJobId: '1',
      sources: [],
      title: 'Frontend Dev',
      updatedAt: '',
      url: 'https://example.com'
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
