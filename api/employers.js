export default function employer_api(employers_service_instance) {

  // API to insert a new job
  async function insert(req, res) {
    const { company_name, website_link, company_logo, job_title, industry, job_description, location_type, location_value, work_type, salary_amount, salary_type, employment_type, application_URL } = req.body;
  
    try {
      // Insert the job into the database
      let newJob = await employers_service_instance.insert_job(
        company_name,
        website_link,
        company_logo,
        job_title,
        industry,
        job_description,
        location_type,
        location_value,
        work_type,
        salary_amount,
        salary_type,
        employment_type,
        application_URL,
      );
      
      // Send a success response
      res.json({
        status: "success",
        data: newJob,
      });
    } catch (err) {
      res.json({
        status: "error inserting job",
        error: err.stack,
      });
    }
  }
  

  // API to update an existing job
  async function update(req, res) {
    const { job_id } = req.params;
    const { company_name, website_link, company_logo, job_title, industry, job_description, location_type, location_value, work_type, salary_amount, salary_type, employment_type, application_URL} = req.body;

    try {
      await employers_service_instance.update_job(job_id, company_name, website_link, company_logo, job_title, industry, job_description, location_type, location_value, work_type, salary_amount, salary_type, employment_type, application_URL);
      res.json({
        status: "success",
        message: "Job updated successfully",
      });
    } catch (err) {
      res.json({
        status: "error updating job",
        error: err.stack,
      });
    }
  }

  // API to delete a job
  async function deleteJob(req, res) {
    const { job_id } = req.params;

    try {
      await employers_service_instance.delete_job(job_id);
      res.json({
        status: "success",
        message: "Job deleted successfully",
      });
    } catch (err) {
      res.json({
        status: "error deleting job",
        error: err.stack,
      });
    }
  }

  return {
    insert,
    update,
    deleteJob,
  };
}

  