

export interface JobPosting {
    company_name: string;
    website_link: string;
    company_logo: string;
    job_title: string;
    industry: string;
    job_description: string;
    location_type: 'country' | 'city' | 'region';
    location_value: string;
    work_type: 'onsite' | 'remote' | 'hybrid';
    salary_amount: string | number;
    salary_type: 'yearly' | 'monthly' | 'hourly';
    employment_type: 'full-time' | 'part-time' | 'contract';
    application_URL: string;
}
  