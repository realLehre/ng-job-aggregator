import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Job } from '../../../jobs.model';
import { JobAnalysisService } from '../../../../services/job-analysis.service';
import { ResumeUploadComponent } from '../components/resume-upload/resume-upload';
import { AnalysisLoaderComponent } from '../components/analysis-loader/analysis-loader';
import { AnalysisResultsComponent } from '../components/analysis-results/analysis-results';

@Component({
  selector: 'app-job-analysis-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    ResumeUploadComponent,
    AnalysisLoaderComponent,
    AnalysisResultsComponent,
  ],
  templateUrl: './job-analysis-dialog.html',
})
export class JobAnalysisDialog {
  readonly job = inject<Job>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<JobAnalysisDialog>);
  readonly analysisService = inject(JobAnalysisService);

  protected closeDialog() {
    this.dialogRef.close();
  }
}
