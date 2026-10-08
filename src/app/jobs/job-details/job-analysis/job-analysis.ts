import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Job } from '../../jobs.model';
import { JobAnalysisDialog } from './dialog/job-analysis-dialog';
import { JobAnalysisService } from '../../../services/job-analysis.service';

@Component({
  selector: 'app-job-analysis',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './job-analysis.html',
  styleUrl: './job-analysis.scss',
})
export class JobAnalysis {
  readonly analysisService = inject(JobAnalysisService);
  readonly job = input<Job | null>(null);
  private readonly dialog = inject(MatDialog);

  openAnalysisDialog() {
    const cached = this.analysisService.resumeStorage.get();
    const fileData = cached?.file || null;
    this.analysisService.selectedFile.set(fileData as any);
    const dialogRef = this.dialog.open(JobAnalysisDialog, {
      data: this.job(),
      width: '750px',
      maxWidth: '95vw',
      panelClass: 'custom-mat-dialog-container',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.analysisService.resetState();
    });
  }
}
