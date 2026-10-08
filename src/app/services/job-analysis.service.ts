import { inject, Injectable, signal } from '@angular/core';
import { Job, JobAnalysisResult } from '../jobs/jobs.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  AnalysisResponse,
  CachedResume,
  UploadResponse,
} from '../jobs/job-details/job-analysis/job-analysis.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JobAnalysisService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + 'resume/';
  readonly selectedFile = signal<File | null>(null);
  readonly uploadError = signal<string | null>(null);
  readonly isAnalyzing = signal<boolean>(false);
  readonly analysisResult = signal<JobAnalysisResult | null>(null);
  readonly analysisStepIndex = signal<number>(0);
  readonly steps = signal<string[]>([
    'Reading resume...',
    'Preparing job details...',
    'Connecting to AI engine...',
    'Matching skills and requirements...',
    'Calculating score and recommendations...',
  ]);
  private analysisSub?: Subscription;
  private stepInterval?: any;
  CACHE_KEY = 'qp-2nsk0rcnf';

  validateAndSetFile(file: File) {
    if (file.type !== 'application/pdf') {
      this.uploadError.set('Please upload a valid PDF resume (.pdf)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.uploadError.set('File size exceeds 5MB limit.');
      return;
    }
    this.uploadError.set(null);
    this.selectedFile.set(file);
  }

  runAnalysis(job: Job) {
    const file = this.selectedFile();
    console.log(file);

    if (!file) return;
    const formData = new FormData();
    const cached = this.resumeStorage.get();
    const isValidCache = this.resumeStorage.matches(file, cached);

    if (isValidCache) {
      formData.append('resume', file.name);
    } else {
      formData.append('resume', file, file.name);
    }

    this.isAnalyzing.set(true);
    this.analysisResult.set(null);
    this.analysisStepIndex.set(-1);

    let stepIndex = 0;

    const resumeText$ =
      isValidCache && cached
        ? of(cached.text)
        : this.http.post<UploadResponse>(`${this.apiUrl}upload`, formData).pipe(
            map((uploadResponse) => {
              const text = uploadResponse.responseData.text;
              this.resumeStorage.save({
                file: {
                  name: file.name,
                  size: file.size,
                  type: file.type,
                  lastModified: file.lastModified || new Date(),
                  lastModifiedDate: {},
                },
                text: text,
              });
              return text;
            }),
          );

    this.analysisSub = resumeText$
      .pipe(
        switchMap((uploadResponse) => {
          const newFormData = new FormData();

          newFormData.append('jobTitle', job.title || '');
          newFormData.append('jobDescription', job.description || '');
          newFormData.append('jobSkills', JSON.stringify(job.skills || []));

          newFormData.append('resumeText', uploadResponse);

          this.analysisStepIndex.set(1);

          stepIndex++;

          return this.http.post<AnalysisResponse>(
            'http://localhost:2000/api/resume/analyze',
            newFormData,
          );
        }),
      )
      .subscribe({
        next: (aiAnalysisResult: AnalysisResponse) => {
          this.stepInterval = setInterval(() => {
            stepIndex++;

            if (stepIndex < this.steps().length) {
              this.analysisStepIndex.set(stepIndex);
            } else {
              this.clearInterval();

              this.isAnalyzing.set(false);

              const analysis = aiAnalysisResult.responseData.analysis;

              this.analysisResult.set({
                score: analysis.score,
                summary: analysis.summary,
                matchedSkills: analysis.matchedSkills,
                missingSkills: analysis.missingSkills,
                recommendations: analysis.recommendations,
              });
            }
          }, 900);
        },
        error: (err) => {
          this.isAnalyzing.set(false);
          this.uploadError.set('An error occured, tried again later!');
          this.clearInterval();
        },
      });
  }

  removeResume() {
    this.resumeStorage.clear();
    this.resetState();
  }

  resetState() {
    if (this.analysisSub) this.analysisSub.unsubscribe();
    this.clearInterval();
    this.selectedFile.set(null);
    this.analysisResult.set(null);
    this.uploadError.set(null);
    this.isAnalyzing.set(false);
  }

  clearInterval() {
    if (this.stepInterval) {
      clearInterval(this.stepInterval);
      this.stepInterval = null;
    }
  }

  resumeStorage = {
    key: this.CACHE_KEY,
    get(): CachedResume | null {
      if (typeof window === 'undefined') return null;
      const data = localStorage.getItem(this.key);
      if (!data) return null;
      try {
        return JSON.parse(data);
      } catch {
        return null;
      }
    },

    save(data: CachedResume): void {
      if (typeof window === 'undefined') return;
      const payload: CachedResume = {
        file: {
          name: data.file.name,
          size: data.file.size,
          type: 'application/pdf',
          lastModified: data.file.lastModified || new Date(),
          lastModifiedDate: {},
        },
        text: data.text,
      };
      localStorage.setItem(this.key, JSON.stringify(payload));
    },

    clear(): void {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(this.key);
    },

    matches(file: File, cached: CachedResume | null): boolean {
      if (!cached) return false;
      return cached.file.name === file.name && cached.file.size === file.size;
    },
  };
}
