export default function job_api(jobs_service_instance) {
  async function api(req, res) {
    try {
      res.json(
        "Job Board API" 
      );
    } catch (err) {
      console.log("Error rendering api", err);
    }
  }
  
  async function all_jobs(req, res) {
    try {
      let allJobs = await jobs_service_instance.get_all_jobs();
      res.json({
        status: "success",
        data: allJobs,
      });
    } catch (err) {
			res.json({
				status: "Error getting all jobs",
				error: err.stack
			});
		}
  }

  //get jobs by searching the job title
  async function jobs_by_title(req, res) {
    const jobTitle = req.params.title;
    try {
      let jobsByTitle = await jobs_service_instance.get_jobs_by_title(
        jobTitle
      );
      res.json({
        status: "success",
        data: jobsByTitle,
      });
    } catch (err) {
			res.json({
				status: "no jobs available for that title",
				error: err.stack
			});
		}
  }

  async function jobs_by_location(req, res) {
    const jobLocation = req.params.location;
    try {
      let jobsByLocation = await jobs_service_instance.get_jobs_by_location(
        jobLocation
      );
      res.json({
        status: "success",
        data: jobsByLocation,
      });
    } catch (err) {
			res.json({
				status: "error getting jobs by location",
				error: err.stack
			});
		}
  }

  // hybrid, remote and onsite options
  async function jobs_by_work_type(req, res) {
    const jobWorkType = req.params.workType;
    try {
      let jobsByWorkType = await jobs_service_instance.get_jobs_by_work_type(jobWorkType);
      res.json({
        status: "success",
        data: jobsByWorkType,
      });
    } 
    catch (err) {
			res.json({
				status: "error getting jobs by type",
				error: err.stack
			});
		}
  }

  async function jobs_by_employment_type(req, res) {
    const jobEmploymentType = req.params.employmentType;
    try {
      let jobsByEmploymentType = await jobs_service_instance.get_jobs_by_employment_type(jobEmploymentType); // Fixed function name
      res.json({
        status: "success",
        data: jobsByEmploymentType,
      });
    } catch (err) {
      res.json({
        status: "error getting jobs by employment type",
        error: err.stack,
      });
    }
  }
  

  //for salary range I need to figure out how i'm gonna apply it because there are jobs that show yearly, monthly and hours,
  //time posted , one day ago, week etc. 

  return {
    api,
    all_jobs,
    jobs_by_title,
    jobs_by_location,
    jobs_by_work_type,
    jobs_by_employment_type,
  };
}
