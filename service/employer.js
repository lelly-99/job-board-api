const employers_service = (db) => {

  // Function to insert a new job posting by an employer
  const insert_job = async (company_name, website_link, company_logo, job_title, industry, job_description, location_type, location_value, work_type, salary_amount, salary_type, employment_type, application_URL) => {
    return await db.one(
      `INSERT INTO job_details (company_name, website_link, company_logo, job_title, industry, job_description, location_type, location_value, work_type, salary_amount, salary_type, employment_type, application_URL)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [company_name, website_link, company_logo, job_title, industry, job_description, location_type, location_value, work_type, salary_amount, salary_type, employment_type, application_URL]
    );
  };
  

  // Function to update a job posting by an employer
  const update_job = async (job_id, company_name, website_link, company_logo, job_title, industry, job_description, location_type, location_value, work_type, salary_amount, salary_type, employment_type, application_URL) => {
    return await db.none(
      `UPDATE job_details 
       SET company_name = $2, website_link = $3, company_logo = $4, job_title = $5, industry = $6, 
           job_description = $7, location_type = $8, location_value = $9, work_type = $10, 
           salary_amount = $11, salary_type = $12, employment_type = $13, application_URL = $14
       WHERE job_id = $1`,
      [job_id, company_name, website_link, company_logo, job_title, industry, job_description, location_type, location_value, work_type, salary_amount, salary_type, employment_type, application_URL]
    );
  };
  
  // Function to delete a job posting by an employer
  const delete_job = async (job_id) => {
    return await db.none('DELETE FROM job_details WHERE job_id = $1', [job_id]);
  };
  

  return {
    insert_job,
    update_job,
    delete_job,
  };
};

export default employers_service;