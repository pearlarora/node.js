// Functions for creating a new job, retrieving all jobs, finding a job by its id, updating a job, adding a new applicant to a job, retrieving all applicants for a job, and deleting a job

import date from "date-and-time";
// const pattern = date.compile("DD/MM/YYYY");

export default class JobModel {
  constructor(
    job_id,
    category,
    designation,
    location,
    company_name,
    salary,
    apply_by,
    number_of_openings,
    skills_required,
    posted_on,
    applicants
  ) {
    this.job_id = job_id;
    this.category = category;
    this.designation = designation;
    this.location = location;
    this.company_name = company_name;
    this.salary = salary;
    this.apply_by = apply_by;
    this.number_of_openings = number_of_openings;
    this.skills_required = skills_required || [];
    this.posted_on = posted_on;
    this.applicants = applicants || [];
    // this.applicants = applicants.map((applicant) => ({
    //   applicant_id: applicant.applicant_id,
    //   applicant_name: applicant.applicant_name,
    //   applicant_email: applicant.applicant_email,
    //   applicant_contact: applicant.applicant_contact,
    //   resume_path: applicant.resume_path,
    // }));
  }

  static getAllJobs() {
    return jobs;
  }

  static postNewJob(jobDetails) {
    let newJob = new JobModel(
      jobs.length + 1,
      jobDetails.category,
      jobDetails.designation,
      jobDetails.location,
      jobDetails.company_name,
      new Date(jobDetails.apply_by),
      jobDetails.salary,
      jobDetails.number_of_openings,
      jobDetails.skills_required,
      new Date(jobDetails.posted_on),
      jobDetails.applicants
    );
    jobs.push(newJob);
  }

  static getJobListing(id) {
    return jobs.find((job) => job.job_id === id);
  }

  static updateJobListing(jobDetails) {
    const index = jobs.findIndex((job) => job.job_id === jobDetails.id);
    if (index !== -1) {
      jobs[index].category = jobDetails.category;
      jobs[index].designation = jobDetails.designation;
      jobs[index].location = jobDetails.location;
      jobs[index].company_name = jobDetails.company_name;
      jobs[index].apply_by = new Date(jobDetails.apply_by);
      jobs[index].salary = jobDetails.salary;
      jobs[index].number_of_openings = jobDetails.number_of_openings;
      jobs[index].skills_required = jobDetails.skills_required;
      jobs[index].posted_on = new Date(jobDetails.posted_on);
      jobs[index].applicants = jobDetails.applicants || [];
      // jobs[index].applicants = applicants.map((applicant) => ({
      //   applicant_id: applicant.applicant_id,
      //   applicant_name: applicant.applicant_name,
      //   applicant_email: applicant.applicant_email,
      //   applicant_contact: applicant.applicant_contact,
      //   resume_path: applicant.resume_path,
      // }));
    }
  }

  static deleteJobListing(id) {
    const index = jobs.findIndex((job) => job.id === id);
    jobs.splice(index, 1);
  }

  static getAllApplicants(id) {
    const index = jobs.findIndex((job) => job.id === id);
    return jobs[index].applicants;
  }

  static addApplicant(job_id, name, email, contact, resume_path) {
    const index = jobs.findIndex((job) => job.job_id === job_id);
    const applicant_id = jobs[index].applicants.length + 1;
    jobs[index].applicants.push({
      applicant_id,
      name,
      email,
      contact,
      resume_path,
    });
  }

  static getApplicant(id) {
    return this.applicants.find((applicant) => applicant.id === id);
  }

  static updateApplicant(job_id, applicant_id, jobDetails) {
    const jobIndex = jobs.findIndex((job) => job.job_id === job_id);
    const applicantIndex = jobs[jobIndex].applicants.findIndex(
      (applicant) => applicant.applicant_id === applicant_id
    );
    if (jobIndex !== -1 && applicantIndex !== -1) {
      jobs[jobIndex].applicants[applicantIndex].name = jobDetails.name;
      jobs[jobIndex].applicants[applicantIndex].email = jobDetails.email;
      jobs[jobIndex].applicants[applicantIndex].contact = jobDetails.contact;
      jobs[jobIndex].applicants[applicantIndex].resume_path =
        jobDetails.resume_path;
    }
  }

  static deleteApplicant(job_id, applicant_id) {
    const jobIndex = jobs.findIndex((job) => job.job_id === job_id);
    const applicantIndex = jobs[jobIndex].applicants.findIndex(
      (applicant) => applicant.applicant_id === applicant_id
    );
    jobs[jobIndex].applicants.splice(applicantIndex, 1);
  }

  static searchResult = (company_name) => {
    const data = jobs.filter((job) => {
      if (job.company_name.toUpperCase() == company_name.toUpperCase()) {
        return job;
      }
    });
    return data;
  };
}

let jobs = [
  new JobModel(
    1,
    "Tech",
    "SDE",
    "Gurgaon",
    "Coding Ninjas",
    "1,10,000",
    "2024-02-03",
    5,
    ["React", "NodeJs", "MongoDB"],
    "2024-01-14",
    [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        contact: "1234567890",
        resume_path: "/resumes/my_resume.pdf",
      },
    ]
  ),
];
