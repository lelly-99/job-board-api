
import { JobPosting } from "./jobPosts"

export interface EmployersService {
    insert_job(job: JobPosting): Promise<JobPosting>;

    update_job(job_id: number, job: JobPosting): Promise<void>;

    delete_job(job_id: number): Promise<void>;
}
