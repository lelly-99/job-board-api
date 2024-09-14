import pgPromise from 'pg-promise';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import jobsApi from './api/jobs.js';
import jobBoardService from './service/jobBoard.js';
import employersApi from './api/employers.js';
import employerService from './service/employer.js';


dotenv.config();

const pgp = pgPromise();
const useSSL = process.env.USE_SSL === 'true';
const dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: useSSL ? { rejectUnauthorized: false } : false,
};

const database = pgp(dbConfig);
const jobsService = jobBoardService(database);
const employersService = employerService(database);

const jobsApiInstance = jobsApi(jobsService);
const employersApiInstance = employersApi(employersService);

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => jobsApiInstance.api(req, res));
app.get('/api/jobs', (req, res) => jobsApiInstance.all_jobs(req, res));
app.get('/api/jobs/name/:title', (req, res) => jobsApiInstance.jobs_by_title(req, res));
app.get('/api/jobs/place/:location', (req, res) => jobsApiInstance.jobs_by_location(req, res));
app.get('/api/jobs/work/:workType', (req, res) => jobsApiInstance.jobs_by_work_type(req, res));
app.get('/api/jobs/employment/:employmentType', (req, res) => jobsApiInstance.jobs_by_employment_type(req, res));

app.post('/api/employers', (req, res) => employersApiInstance.insert(req, res));
app.put('/api/employers/update/:job_id', (req, res) => employersApiInstance.update(req, res));
app.delete('/api/employers/delete/:job_id', (req, res) => employersApiInstance.deleteJob(req, res));

app.use((err, req, res, next) => {
    console.error('Unexpected error:', err);
    res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred',
        error: err.message,
    });
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    console.log(`App started at port: ${PORT}`);
});
