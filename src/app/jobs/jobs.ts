import { Component, computed, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JobCard } from './job-card/job-card';
import { JobDetails } from './job-details/job-details';
import { Pagination } from './pagination/pagination';
import { Job } from './jobs.model';
import { JobsService } from './jobs.service';

@Component({
  selector: 'app-jobs',
  imports: [JobCard, Pagination],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss',
})
export class Jobs {
  private readonly router = inject(Router);
  readonly jobsService = inject(JobsService);

  onSelectJob(job: Job | string) {
    const id = typeof job === 'string' ? job : job._id;
    this.jobsService.selectedJobId.set(id);
    this.router.navigate(['/job', id]);
  }

  updateSearch(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.jobsService.searchQuery.set(val);
    this.jobsService.page.set(1);
  }

  onLocationChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.jobsService.selectedLocation.set(val);
    this.jobsService.page.set(1);
  }

  onSourceChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.jobsService.selectedSource.set(val);
    this.jobsService.page.set(1);
  }

  onStartDateChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.jobsService.startDate.set(val);
    this.jobsService.page.set(1);
  }

  onEndDateChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.jobsService.endDate.set(val);
    this.jobsService.page.set(1);
  }

  toggleRemote() {
    this.jobsService.remoteOnly.update((v) => !v);
    this.jobsService.page.set(1);
  }

  setSkill(sk: string) {
    this.jobsService.selectedSkill.set(sk);
    this.jobsService.page.set(1);
  }

  resetFilters() {
    this.jobsService.searchQuery.set('');
    this.jobsService.selectedLocation.set('All');
    this.jobsService.remoteOnly.set(false);
    this.jobsService.selectedSource.set('All');
    this.jobsService.selectedSkill.set('All');
    this.jobsService.startDate.set('');
    this.jobsService.endDate.set('');
    this.jobsService.page.set(1);
  }

  changePage(page: number) {
    this.jobsService.page.set(page);
  }

  changePageSize(size: number) {
    this.jobsService.limit.set(size);
    this.jobsService.page.set(1);
  }
}
