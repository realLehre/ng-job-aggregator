import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface JobSourceItem {
  name: string;
  url: string;
  description: string;
  nodeId: string;
  category: string;
}

@Component({
  selector: 'app-sources',
  imports: [RouterLink],
  templateUrl: './sources.html',
  styleUrl: './sources.scss',
})
export class Sources {
  sourcesList: JobSourceItem[] = [
    {
      name: 'Remote OK',
      url: 'https://remoteok.com/',
      description:
        'A leading remote job board aggregator providing global listings for remote software engineers, designers, and marketers.',
      nodeId: 'SOURCE_01',
      category: 'Global Remote',
    },
    {
      name: 'Himalayas',
      url: 'https://himalayas.app/',
      description:
        'Modern remote job board focused on top-tier tech companies, offering rich company profiles, timezone filters, and salary transparency.',
      nodeId: 'SOURCE_02',
      category: 'Tech & Startup',
    },
    {
      name: 'Remotive',
      url: 'https://remotive.com/',
      description:
        'Community-driven remote job platform connecting tech professionals with vetted remote-first startups and enterprises.',
      nodeId: 'SOURCE_03',
      category: 'Tech Community',
    },
    {
      name: 'WeWorkRemotely',
      url: 'https://weworkremotely.com/',
      description:
        'One of the largest communities for remote jobs in the world, featuring high-volume engineering and product listings.',
      nodeId: 'SOURCE_04',
      category: 'Enterprise Remote',
    },
    {
      name: 'Arbeitnow',
      url: 'https://www.arbeitnow.com/',
      description:
        'Europe and global job board specializing in remote and relocation-friendly roles with direct API data syndication.',
      nodeId: 'SOURCE_05',
      category: 'Global & EU',
    },
  ];
}
