import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobAnalysisService } from '../../../../../services/job-analysis.service';

@Component({
  selector: 'app-analysis-loader',
  imports: [CommonModule],
  templateUrl: './analysis-loader.html',
})
export class AnalysisLoaderComponent {
  private jobAnalysisService = inject(JobAnalysisService);
  steps = this.jobAnalysisService.steps;

  readonly analysisStepIndex = this.jobAnalysisService.analysisStepIndex;

  progressBarWidth = computed(() => {
    const totalSteps = this.steps().length;
    const currentIndex = this.jobAnalysisService.analysisStepIndex();
    // Formula: ((currentIndex + 1) / totalSteps) * 100
    const percentage = Math.min(((currentIndex + 1) / totalSteps) * 100, 100);
    return `${percentage}%`;
  });
}
