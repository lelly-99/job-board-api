
import { JobPosting } from "./jobPosts"

export interface JobsService {
  get_all_jobs(): Promise<JobPosting[]>;
  get_jobs_by_title(title: string): Promise<JobPosting[]>;
  get_jobs_by_location(location: string): Promise<JobPosting[]>;
  get_jobs_by_work_type(work_type: 'onsite' | 'remote' | 'hybrid'): Promise<JobPosting[]>;
  get_jobs_by_employment_type(employment_type: 'full-time' | 'part-time' | 'contract'): Promise<JobPosting[]>;
}
