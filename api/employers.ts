import { Request, Response } from 'express';
import { JobPosting } from "../models/jobPosts"
import { EmployersService } from '../models/employersServices'; 

export default function employer_api(employers_service_instance: EmployersService) {
  // API to insert a new job
  async function insert(req: Request, res: Response): Promise<void> {
    const job: JobPosting = req.body;

    try {
      const newJob = await employers_service_instance.insert_job(job);
      res.json({
        status: 'success',
        data: newJob
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Error inserting job',
        error: (err as Error).message
      });
    }
  }

  // API to update an existing job
  async function update(req: Request, res: Response): Promise<void> {
    const job_id = parseInt(req.params.job_id, 10);
    const job: JobPosting = req.body;

    try {
      await employers_service_instance.update_job(job_id, job);
      res.json({
        status: 'success',
        message: 'Job updated successfully'
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Error updating job',
        error: (err as Error).message
      });
    }
  }

  // API to delete a job
  async function deleteJob(req: Request, res: Response): Promise<void> {
    const job_id = parseInt(req.params.job_id, 10);

    try {
      await employers_service_instance.delete_job(job_id);
      res.json({
        status: 'success',
        message: 'Job deleted successfully'
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Error deleting job',
        error: (err as Error).message
      });
    }
  }

  return {
    insert,
    update,
    deleteJob
  };
}

