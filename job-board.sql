CREATE TABLE job_details (
    job_id SERIAL PRIMARY KEY, 
    company_name VARCHAR(100) NOT NULL,
    website_link VARCHAR(100) NOT NULL,
    company_logo VARCHAR(100) NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    job_description TEXT NOT NULL,
    location_type VARCHAR(100) NOT NULL,
    location_value VARCHAR(100),
    work_type VARCHAR(100) NOT NULL,
    salary_amount DECIMAL(10, 2),
    salary_type VARCHAR(100) NOT NULL,
    employment_type VARCHAR(100) NOT NULL, 
    application_URL VARCHAR(100) NOT NULL
);



INSERT INTO job_details (company_name, website_link, company_logo, job_title, industry, job_description, location_type, location_value, work_type, salary_amount, salary_type, employment_type, application_URL)
VALUES
('Tech Innovators Inc.', 'https://techinnovators.com', 'https://techinnovators.com/logo.png', 'Software Engineer', 'Technology', 'Develop and maintain web applications using modern technologies.', 'global', NULL, 'remote', 80000.00, 'yearly', 'full_time', 'https://techinnovators.com/careers/software-engineer'),

('Finance Solutions Ltd.', 'https://financesolutions.com', 'https://financesolutions.com/logo.png', 'Financial Analyst', 'Finance', 'Analyze financial data and prepare reports for stakeholders.', 'country', 'USA', 'onsite', 70000.00, 'yearly', 'full_time', 'https://financesolutions.com/careers/financial-analyst'),

('Green Energy Corp.', 'https://greenenergy.com', 'https://greenenergy.com/logo.png', 'Environmental Scientist', 'Environmental Science', 'Conduct research and develop strategies to improve environmental practices.', 'city', 'San Francisco', 'hybrid', 75000.00, 'yearly', 'contract', 'https://greenenergy.com/careers/environmental-scientist'),

('EduTech Global', 'https://edutechglobal.com', 'https://edutechglobal.com/logo.png', 'E-Learning Specialist', 'Education', 'Design and implement online learning programs for various subjects.', 'global', NULL, 'remote', 68000.00, 'yearly', 'part_time', 'https://edutechglobal.com/careers/e-learning-specialist'),

('HealthCare Plus', 'https://healthcareplus.com', 'https://healthcareplus.com/logo.png', 'Medical Data Analyst', 'Healthcare', 'Analyze patient data and generate reports to assist in decision making.', 'country', 'Canada', 'onsite', 72000.00, 'yearly', 'full_time', 'https://healthcareplus.com/careers/medical-data-analyst');





