import pgPromise from "pg-promise";
import cors from "cors";
import 'dotenv/config'; // Loads environment variables from .env
import express from "express";
import job_api from "./api/jobs.js";
import jobs_service from "./service/jobBoard.js";
import employer_api from "./api/employers.js";
import employers_service from "./service/employer.js";

// Initialize pg-promise with options (optional: for query logging or other configurations)
const pgp = pgPromise();

// SSL connection setup
const useSSL = process.env.USE_SSL === 'true'; // Use an explicit USE_SSL flag from .env if available

// Database connection options
const dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: useSSL ? { rejectUnauthorized: false } : false, // Configure SSL based on useSSL flag
};

// Initialize the database connection
const database = pgp(dbConfig);

// Services
const jobs_service_instance = jobs_service(database);
const employers_service_instance = employers_service(database);

// APIs
const jobs_api = job_api(jobs_service_instance);
const employers_api = employer_api(employers_service_instance);

// Express instance
const app = express();

// Middleware configurations
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables Cross-Origin Resource Sharing (CORS)

// API routes
// Root route
app.get('/', (req, res) => res.send('Welcome to the Job Board API'));

// Job routes
app.get('/api/jobs', jobs_api.all_jobs);
app.get('/api/jobs/name/:title', jobs_api.jobs_by_title);
app.get('/api/jobs/place/:location', jobs_api.jobs_by_location);
app.get('/api/jobs/work/:workType', jobs_api.jobs_by_work_type);
app.get('/api/jobs/employment/:employmentType', jobs_api.jobs_by_employment_type);

// Employer routes
app.post('/api/employers', employers_api.insert);
app.put('/api/employers/job/:job_id', employers_api.update);
app.delete('/api/employers/job/:job_id', employers_api.deleteJob);

// Start the server
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    console.log(`App started at port: ${PORT}`);
});
