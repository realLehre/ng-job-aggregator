import { Injectable, signal, computed, effect, untracked } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Job, JobCardData, JobApiResponse } from './jobs.model';

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

  // Active cursor signal sent to the API
  readonly cursor = signal<string | null>(null);

  // Cache mapping page number -> cursor for that page
  cursorCache = new Map<number, string | null>();

  // Selected Job ID for fetching details resource
  readonly selectedJobId = signal<string | null>(null);

  constructor() {
    // Cache nextCursor when job resource updates successfully without triggering reactive loops
    effect(() => {
      const res = this.jobsResource.value();
      const p = this.page();
      if (res?.responseData?.data) {
        const next = res.responseData.data.nextCursor ?? null;
        untracked(() => {
          this.cursorCache.set(p + 1, next);
        });
      }
    });
  }

  // httpResource for list of jobs using cursor-based pagination and page tracking
  readonly jobsResource = httpResource<JobApiResponse>(() => {
    const q = this.searchQuery();
    const loc = this.selectedLocation();
    const remote = this.remoteOnly();
    const src = this.selectedSource();
    const skill = this.selectedSkill();
    const start = this.startDate();
    const end = this.endDate();
    const p = this.page();
    const cur = this.cursor();
    const l = this.limit();

    const params: Record<string, string | boolean> = {
      page: p.toString(),
      limit: l.toString(),
    };

    if (cur) {
      params['cursor'] = cur;
    }
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
        return res.responseData.data.jobs as unknown as Job[];
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

  readonly nextCursor = computed(() => {
    if (this.jobsResource.hasValue()) {
      const res = this.jobsResource.value();
      if (res?.responseData?.data?.nextCursor !== undefined) {
        return res.responseData.data.nextCursor;
      }
    }
    return null;
  });

  readonly totalPages = computed(() => {
    if (this.jobsResource.hasValue()) {
      const res = this.jobsResource.value();
      if (
        res?.responseData?.data?.totalJobs !== undefined &&
        res?.responseData?.data?.limit !== undefined
      ) {
        const total = res.responseData.data.totalJobs;
        const lim = res.responseData.data.limit;
        return Math.max(1, Math.ceil(total / lim));
      }
    }
    const total = this.totalJobs();
    const limit = this.limit();
    const hasNext = !!this.nextCursor();
    const current = this.page();
    return Math.max(current + (hasNext ? 1 : 0), Math.ceil(total / limit) || 1);
  });

  updateCursor(page: number) {
    if (page === 1) {
      this.cursorCache.clear();
      this.cursor.set(null);
    } else {
      this.cursor.set(this.cursorCache.get(page) ?? null);
    }
  }

  readonly isLoading = computed(() => this.jobsResource.isLoading());
  readonly error = computed(() => this.jobsResource.error());
}
