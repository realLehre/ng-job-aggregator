import { Injectable, signal, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Job } from './jobs.model';

export interface JobApiResponse {
  status: string;
  responseData: {
    data: {
      jobs: Job[];
      count: number;
      totalJobs: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private readonly apiUrl = environment.apiUrl + 'jobs/';
  readonly sources = ['All', 'Arbeitnow', 'Direct', 'Himalayas', 'RemoteOK'];
  readonly searchQuery = signal<string>('');
  readonly selectedLocation = signal<string>('All');
  readonly remoteOnly = signal<boolean>(false);
  readonly selectedSource = signal<string>('All');
  readonly selectedSkill = signal<string>('All');
  readonly startDate = signal<string>('');
  readonly endDate = signal<string>('');
  readonly page = signal<number>(1);
  readonly limit = signal<number>(20);

  // Selected Job ID for fetching details resource
  readonly selectedJobId = signal<string | null>(null);

  // httpResource for list of jobs
  readonly jobsResource = httpResource<JobApiResponse>(() => {
    const q = this.searchQuery();
    const loc = this.selectedLocation();
    const remote = this.remoteOnly();
    const src = this.selectedSource();
    const skill = this.selectedSkill();
    const start = this.startDate();
    const end = this.endDate();
    const p = this.page();
    const l = this.limit();

    const params: Record<string, string | boolean> = {
      page: p.toString(),
      limit: l.toString(),
    };

    if (q) params['search'] = q;
    if (loc && loc !== 'All') params['location'] = loc;
    if (remote) params['remote'] = true;
    if (src && src !== 'All') params['source'] = src;
    if (skill && skill !== 'All') params['skill'] = skill;
    if (start) params['startDate'] = start;
    if (end) params['endDate'] = end;

    return {
      url: this.apiUrl,
      params,
    };
  });

  // httpResource for individual job details fetched by ID (endpoint: url/id)
  readonly jobDetailsResource = httpResource<any>(() => {
    const id = this.selectedJobId();
    if (!id) return undefined;
    return {
      url: `${this.apiUrl}${id}`,
    };
  });

  // Computed signals for consuming components with safe hasValue() check
  readonly jobs = computed(() => {
    if (this.jobsResource.hasValue()) {
      const res = this.jobsResource.value();
      if (res?.responseData?.data?.jobs) {
        return res.responseData.data.jobs;
      }
    }
    return [];
  });

  // Selected Job Details with fallback support
  readonly selectedJob = computed(() => {
    if (this.jobDetailsResource.hasValue()) {
      const res = this.jobDetailsResource.value() as any;
      if (res) {
        if (res.responseData?.data) return res.responseData.data;
        if (res.data) return res.data;
        if (res._id) return res as Job;
      }
    }
  });

  readonly isJobDetailsLoading = computed(() => this.jobDetailsResource.isLoading());
  readonly jobDetailsError = computed(() => this.jobDetailsResource.error());

  readonly totalJobs = computed(() => {
    if (this.jobsResource.hasValue()) {
      const res = this.jobsResource.value();
      if (res?.responseData?.data?.totalJobs !== undefined) {
        return res.responseData.data.totalJobs;
      }
    }
    return this.jobs().length;
  });

  readonly totalPages = computed(() => {
    if (this.jobsResource.hasValue()) {
      const res = this.jobsResource.value();
      if (res?.responseData?.data?.totalPages !== undefined) {
        return res.responseData.data.totalPages;
      }
    }
    const total = this.totalJobs();
    const limit = this.limit();
    return Math.max(1, Math.ceil(total / limit));
  });

  readonly isLoading = computed(() => this.jobsResource.isLoading());
  readonly error = computed(() => this.jobsResource.error());
}
