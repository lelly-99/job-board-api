import { Request, Response } from 'express';
import { JobsService } from '../models/jobServices'; 

export default function job_api(jobs_service_instance: JobsService) {
  // Endpoint to check the API status
  async function api(req: Request, res: Response): Promise<void> {
    try {
      res.json({
        message: "Welcome to Job Board API"
      });
    } catch (err) {
      console.error("Error rendering API status:", err);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: (err as Error).message,
      });
    }
  }

  // Endpoint to get all job postings
  async function all_jobs(req: Request, res: Response): Promise<void> {
    try {
      const allJobs = await jobs_service_instance.get_all_jobs();
      res.json({
        status: "success",
        data: allJobs,
      });
    } catch (err) {
      console.error("Error getting all jobs:", err);
      res.status(500).json({
        status: "error",
        message: "Error getting all jobs",
        error: (err as Error).message,
      });
    }
  }

  // Endpoint to get jobs by title
  async function jobs_by_title(req: Request, res: Response): Promise<void> {
    const jobTitle = req.params.title;
    try {
      const jobsByTitle = await jobs_service_instance.get_jobs_by_title(jobTitle);
      res.json({
        status: "success",
        data: jobsByTitle,
      });
    } catch (err) {
      console.error("Error getting jobs by title:", err);
      res.status(500).json({
        status: "error",
        message: `Error getting jobs by title: ${jobTitle}`,
        error: (err as Error).message,
      });
    }
  }

  // Endpoint to get jobs by location
  async function jobs_by_location(req: Request, res: Response): Promise<void> {
    const jobLocation = req.params.location;
    try {
      const jobsByLocation = await jobs_service_instance.get_jobs_by_location(jobLocation);
      res.json({
        status: "success",
        data: jobsByLocation,
      });
    } catch (err) {
      console.error("Error getting jobs by location:", err);
      res.status(500).json({
        status: "error",
        message: `Error getting jobs by location: ${jobLocation}`,
        error: (err as Error).message,
      });
    }
  }

  // Endpoint to get jobs by work type
  async function jobs_by_work_type(req: Request, res: Response): Promise<void> {
    const jobWorkType = req.params.workType as 'onsite' | 'remote' | 'hybrid';
    try {
      const jobsByWorkType = await jobs_service_instance.get_jobs_by_work_type(jobWorkType);
      res.json({
        status: "success",
        data: jobsByWorkType,
      });
    } catch (err) {
      console.error("Error getting jobs by work type:", err);
      res.status(500).json({
        status: "error",
        message: `Error getting jobs by work type: ${jobWorkType}`,
        error: (err as Error).message,
      });
    }
  }

  // Endpoint to get jobs by employment type
  async function jobs_by_employment_type(req: Request, res: Response): Promise<void> {
    const jobEmploymentType = req.params.employmentType as 'full-time' | 'part-time' | 'contract';
    try {
      const jobsByEmploymentType = await jobs_service_instance.get_jobs_by_employment_type(jobEmploymentType);
      res.json({
        status: "success",
        data: jobsByEmploymentType,
      });
    } catch (err) {
      console.error("Error getting jobs by employment type:", err);
      res.status(500).json({
        status: "error",
        message: `Error getting jobs by employment type: ${jobEmploymentType}`,
        error: (err as Error).message,
      });
    }
  }

  return {
    api,
    all_jobs,
    jobs_by_title,
    jobs_by_location,
    jobs_by_work_type,
    jobs_by_employment_type,
  };
}
