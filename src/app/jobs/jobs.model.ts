export interface JobSource {
  name: string;
  sourceJobId: string;
  url: string;
  canonicalUrl: string;
}

export interface Job {
  _id: string;
  __v?: number;
  active: boolean;
  company: string;
  createdAt: string;
  description: string;
  employmentType: string[];
  fingerprint: string;
  lastSeenAt: string;
  location: string;
  postedAt: string;
  remote: boolean;
  scrapedAt: string;
  skills: string[];
  source: string;
  sourceJobId: string;
  sources: JobSource[];
  title: string;
  updatedAt: string;
  url: string;
  salary?: string | {
    min?: number;
    max?: number;
    currency?: string;
  };
}

export interface JobCardData {
  _id: string;
  company: string;
  location: string;
  postedAt: string;
  remote: boolean;
  skills: string[];
  source: string;
  title: string;
  salary?: string | {
    min?: number;
    max?: number;
    currency?: string;
  };
}

export interface Data {
  jobs: JobCardData[];
  count: number;
  totalJobs: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ResponseData {
  data: Data;
}

export interface JobApiResponse {
  status: string;
  responseData: ResponseData;
  message: string;
}
