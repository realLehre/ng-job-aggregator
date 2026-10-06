import { Component } from '@angular/core';
import { Jobs } from '../jobs/jobs';
import { JobSources } from './job-sources/job-sources';

@Component({
  selector: 'app-home',
  imports: [Jobs, JobSources],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
