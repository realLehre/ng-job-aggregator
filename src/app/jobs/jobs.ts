import { Component, computed, signal, inject, DestroyRef } from '@angular/core';
import { Router } from '@angular/router';
import { JobCard } from './job-card/job-card';
import { JobDetails } from './job-details/job-details';
import { Pagination } from './pagination/pagination';
import { Job } from './jobs.model';
import { JobsService } from './jobs.service';
import { ViewportScroller } from '@angular/common';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-jobs',
  imports: [JobCard, Pagination],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss',
})
export class Jobs {
  private readonly router = inject(Router);
  private viewportScroller = inject(ViewportScroller);
  readonly jobsService = inject(JobsService);
  private destroyRef = inject(DestroyRef);
  private searchSubject = new Subject<string>();

  readonly showMobileFilters = signal(false);
  readonly isDesktop = signal(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((val) => {
        this.jobsService.searchQuery.set(val);
        this.jobsService.page.set(1);
      });

    if (typeof window !== 'undefined') {
      const resizeListener = () => {
        this.isDesktop.set(window.innerWidth >= 768);
      };
      window.addEventListener('resize', resizeListener);
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('resize', resizeListener);
      });
    }
  }

  toggleMobileFilters() {
    this.showMobileFilters.update((v) => !v);
  }

  onSelectJob(job: Job | string) {
    const id = typeof job === 'string' ? job : job._id;
    this.jobsService.selectedJobId.set(id);
    this.router.navigate(['/job', id]).then(() => this.viewportScroller.scrollToPosition([0, 0]));
  }

  updateSearch(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.searchSubject.next(val);
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
