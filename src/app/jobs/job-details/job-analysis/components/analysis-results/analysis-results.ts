import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobAnalysisService } from '../../../../../services/job-analysis.service';
import { MatchScoreBadgeDirective } from './score-analysis.directive';

@Component({
  selector: 'app-analysis-results',
  imports: [CommonModule, MatchScoreBadgeDirective],
  templateUrl: './analysis-results.html',
})
export class AnalysisResultsComponent {
  public readonly analysisService = inject(JobAnalysisService);

  scoreColorClass = computed(() => {
    const currentScore = this.analysisService.analysisResult()?.score || 0;
    if (currentScore >= 75) {
      return 'text-emerald-500';
    } else if (currentScore >= 40) {
      return 'text-amber-500';
    } else {
      return 'text-rose-500';
    }
  });
}
