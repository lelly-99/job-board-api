"use strict";
const jobs_service = (db) => {
    // Get all jobs
    const get_all_jobs = async () => {
      return await db.manyOrNone('SELECT * FROM job_details');
    };
  
    // Get jobs by title (searchable)
    const get_jobs_by_title = async (title) => {
        return await db.any('SELECT * FROM job_details WHERE job_title ILIKE $1', [`%${title}%`]);
      };
  
    // Get jobs by location
    const get_jobs_by_location = async (location) => {
      return await db.any('SELECT * FROM job_details WHERE location_value = $1', [location]);
    };
  
    // Get jobs by work type
    const get_jobs_by_work_type = async (work_type) => {
      return await db.any('SELECT * FROM job_details WHERE work_type = $1', [work_type]);
    };
  
    // Get jobs by employment type
    const get_jobs_by_employment_type = async (employment_type) => {
      return await db.any('SELECT * FROM job_details WHERE employment_type = $1', [employment_type]);
    };
  
    // Get jobs by salary to be discussed
    //time
  
    return {
      get_all_jobs,
      get_jobs_by_title,
      get_jobs_by_location,
      get_jobs_by_work_type,
      get_jobs_by_employment_type,
    };
  };
  
  export default jobs_service;
  
  
  