import { Component, computed, input, inject, OnInit, effect } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Job } from '../jobs.model';
import { JobsService } from '../jobs.service';
import { TimeAgoPipe } from '../../pipes/date-posted.pipe';
import { FormatSalaryPipe } from '../../pipes/salary.pipe';
import { JobAnalysis } from './job-analysis/job-analysis';

@Component({
  selector: 'app-job-details',
  imports: [RouterLink, TimeAgoPipe, FormatSalaryPipe, CommonModule, JobAnalysis],
  templateUrl: './job-details.html',
  styleUrl: './job-details.scss',
})
export class JobDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly jobsService = inject(JobsService);

  readonly jobInput = input<Job | null>(null, { alias: 'job' });
  readonly isLoadingInput = input<boolean>(false, { alias: 'isLoading' });
  readonly isLoading = this.jobsService.isJobDetailsLoading;
  readonly job = this.jobsService.selectedJob;

  constructor() {
    effect(() => {
      console.log('job details', this.job());
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.jobsService.selectedJobId.set(id);
    }
  }
}
