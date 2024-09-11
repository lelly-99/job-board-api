import pgPromise from "pg-promise";
import cors from "cors"
import 'dotenv/config';
import express from "express";
import job_api from "./api/jobs.js";
import jobs_service from "./service/jobBoard.js";
import employer_api from "./api/employers.js";
import employers_service from "./service/employer.js";

const pgp = pgPromise();

//SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

// Database connection
const connectionString = process.env.DATABASE_URL;
const database = pgp(connectionString);

//database instance
const jobs_service_instance = jobs_service(database);
const employers_service_instance = employers_service(database)

//api instance
const jobs_api = job_api(jobs_service_instance)
const employers_api = employer_api(employers_service_instance)


//expressJS instance
const app = express();

//middleware configuratios
app.use(express.json());
app.use(cors());


//API routes
//main route
app.get('/', jobs_api.api);

//routes for getting job posts
app.get('/api/jobs', jobs_api.all_jobs);
app.get('/api/jobs/name/:title', jobs_api.jobs_by_title);
app.get('/api/jobs/place/:location', jobs_api.jobs_by_location);
app.get('/api/jobs/work/:workType', jobs_api.jobs_by_work_type);
app.get('/api/jobs/employment/:employmentType', jobs_api.jobs_by_employment_type);


//routes for employers
app.post('/api/employers', employers_api.insert); 
app.put('/api/employers/job/:job_id', employers_api.update); 
app.delete('/api/employers/job/:job_id', employers_api.deleteJob); 


// Start the server
const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
    console.log("App started at port:", PORT);
});