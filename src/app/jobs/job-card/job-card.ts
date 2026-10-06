import { Component, input, output } from '@angular/core';
import { JobCardData } from '../jobs.model';
import { FormatSalaryPipe } from '../../pipes/salary.pipe';
import { TimeAgoPipe } from '../../pipes/date-posted.pipe';

@Component({
  selector: 'app-job-card',
  imports: [FormatSalaryPipe, TimeAgoPipe],
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss',
})
export class JobCard {
  readonly job = input<JobCardData | null>(null);
  readonly isSelected = input<boolean>(false);
  readonly isLoading = input<boolean>(false);

  readonly selectJob = output<string>();

  onClick() {
    console.log(this.job());
    const currentJob = this.job();
    if (currentJob && !this.isLoading()) {
      this.selectJob.emit(currentJob._id);
    }
  }

  matchScore(): number {
    return 94;
  }
}
