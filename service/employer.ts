// services/employers_service.ts
import { IDatabase } from 'pg-promise';
import { JobPosting } from '../models/jobPosts';
import { EmployersService } from '../models/employersServices';

const employers_service = (db: IDatabase<any>): EmployersService => {

    // Insert job posting
    const insert_job = async (job: JobPosting): Promise<JobPosting> => {
        return db.one<JobPosting>(
            `INSERT INTO job_details (company_name, website_link, company_logo, job_title, industry, job_description, 
              location_type, location_value, work_type, salary_amount, salary_type, employment_type, application_URL)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
            [job.company_name, job.website_link, job.company_logo, job.job_title, job.industry, job.job_description, 
             job.location_type, job.location_value, job.work_type, job.salary_amount, job.salary_type, job.employment_type, job.application_URL]
        );
    };

    // Update job posting
    const update_job = async (job_id: number, job: JobPosting): Promise<void> => {
        await db.none(
            `UPDATE job_details 
             SET company_name = $2, website_link = $3, company_logo = $4, job_title = $5, industry = $6, 
                 job_description = $7, location_type = $8, location_value = $9, work_type = $10, 
                 salary_amount = $11, salary_type = $12, employment_type = $13, application_URL = $14
             WHERE job_id = $1`,
            [job_id, job.company_name, job.website_link, job.company_logo, job.job_title, job.industry, job.job_description, 
             job.location_type, job.location_value, job.work_type, job.salary_amount, job.salary_type, job.employment_type, job.application_URL]
        );
    };

    // Delete job posting
    const delete_job = async (job_id: number): Promise<void> => {
        await db.none('DELETE FROM job_details WHERE job_id = $1', [job_id]);
    };

    return {
        insert_job,
        update_job,
        delete_job,
    };
};

export default employers_service;

