export interface Analysis {
  score: number;
  summary: string;
  matchedSkills: string[];
  missingSkills: string[];
  recommendations: string[];
}

export interface AnalysisResponseData {
  status: string;
  analysis: Analysis;
}

export interface AnalysisResponse {
  status: string;
  responseData: AnalysisResponseData;
  message: string;
}

export interface UploadResponse {
  status: string;
  responseData: UploadResponseData;
  message: string;
}

export interface UploadResponseData {
  status: string;
  fileName: string;
  text: string;
}

export interface CachedResume {
  file: {
    name: string;
    size: number;
    type: string;
    lastModified?: any;
    lastModifiedDate: any;
  };
  text: string;
}
