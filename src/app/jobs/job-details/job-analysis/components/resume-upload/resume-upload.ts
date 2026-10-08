import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobAnalysisService } from '../../../../../services/job-analysis.service';

@Component({
  selector: 'app-resume-upload',
  imports: [CommonModule, FormsModule],
  templateUrl: './resume-upload.html',
  styles: [
    `
      .dragging {
        border-color: #201a23;
        background-color: #fff;
      }
    `,
  ],
})
export class ResumeUploadComponent {
  public readonly analysisService = inject(JobAnalysisService);
  readonly isDragging = signal<boolean>(false);

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.analysisService.validateAndSetFile(files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.analysisService.validateAndSetFile(input.files[0]);
    }
  }
}
