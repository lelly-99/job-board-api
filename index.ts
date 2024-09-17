import pgPromise, { IMain, IDatabase } from 'pg-promise';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import job_api from './api/jobs';
import jobs_service from './service/jobBoard';
import employer_api from './api/employers';
import employers_service from './service/employer';

// Load environment variables
dotenv.config();

// Initialize pg-promise
const pgp: IMain = pgPromise();

// SSL connection setup
const useSSL: boolean = process.env.USE_SSL === 'true';

// Database connection options
const dbConfig = {
    connectionString: process.env.DATABASE_URL as string,
    ssl: useSSL ? { rejectUnauthorized: false } : false,
};

// Initialize the database connection
const database: IDatabase<any> = pgp(dbConfig);

// Services
const jobs_service_instance = jobs_service(database);
const employers_service_instance = employers_service(database);

// APIs
const jobs_api = job_api(jobs_service_instance);
const employers_api = employer_api(employers_service_instance);

// Express instance
const app: Application = express();

// Middleware configurations
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables Cross-Origin Resource Sharing (CORS)

// API routes
// Root route
app.get('/', (req: Request, res: Response) => jobs_api.api(req, res));

// Job routes
app.get('/api/jobs', (req: Request, res: Response) => jobs_api.all_jobs(req, res));
app.get('/api/jobs/name/:title', (req: Request, res: Response) => jobs_api.jobs_by_title(req, res));
app.get('/api/jobs/place/:location', (req: Request, res: Response) => jobs_api.jobs_by_location(req, res));
app.get('/api/jobs/work/:workType', (req: Request, res: Response) => jobs_api.jobs_by_work_type(req, res));
app.get('/api/jobs/employment/:employmentType', (req: Request, res: Response) => jobs_api.jobs_by_employment_type(req, res));

// Employer routes
app.post('/api/employers', (req: Request, res: Response) => employers_api.insert(req, res));
app.put('/api/employers/update/:job_id', (req: Request, res: Response) => employers_api.update(req, res));
app.delete('/api/employers/delete/:job_id', (req: Request, res: Response) => employers_api.deleteJob(req, res));

// Basic error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Unexpected error:', err);
    res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred',
        error: err.message,
    });
});

// Start the server
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    console.log(`App started at port: ${PORT}`);
});




