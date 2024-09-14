import { IDatabase } from 'pg-promise';
import { JobPosting } from '../models/jobPosts';
import { JobsService } from '../models/jobServices';


// Define the jobs_service function
const jobs_service = (db: IDatabase<any>): JobsService => {
    // Get all jobs
    const get_all_jobs = async (): Promise<JobPosting[]> => {
        try {
            return await db.manyOrNone<JobPosting>('SELECT * FROM job_details');
        } catch (error) {
            console.error('Error fetching all jobs:', error);
            throw error;
        }
    };

    // Get jobs by title (searchable)
    const get_jobs_by_title = async (title: string): Promise<JobPosting[]> => {
        try {
            return await db.any<JobPosting>('SELECT * FROM job_details WHERE job_title ILIKE $1', [`%${title}%`]);
        } catch (error) {
            console.error('Error fetching jobs by title:', error);
            throw error;
        }
    };

    // Get jobs by location
    const get_jobs_by_location = async (location: string): Promise<JobPosting[]> => {
        try {
            return await db.any<JobPosting>('SELECT * FROM job_details WHERE location_value = $1', [location]);
        } catch (error) {
            console.error('Error fetching jobs by location:', error);
            throw error;
        }
    };

    // Get jobs by work type
    const get_jobs_by_work_type = async (work_type: 'onsite' | 'remote' | 'hybrid'): Promise<JobPosting[]> => {
        try {
            return await db.any<JobPosting>('SELECT * FROM job_details WHERE work_type = $1', [work_type]);
        } catch (error) {
            console.error('Error fetching jobs by work type:', error);
            throw error;
        }
    };

    // Get jobs by employment type
    const get_jobs_by_employment_type = async (employment_type: 'full-time' | 'part-time' | 'contract'): Promise<JobPosting[]> => {
        try {
            return await db.any<JobPosting>('SELECT * FROM job_details WHERE employment_type = $1', [employment_type]);
        } catch (error) {
            console.error('Error fetching jobs by employment type:', error);
            throw error;
        }
    };

    return {
        get_all_jobs,
        get_jobs_by_title,
        get_jobs_by_location,
        get_jobs_by_work_type,
        get_jobs_by_employment_type,
    };
};

export default jobs_service;





