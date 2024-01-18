// Create, update and delete jobs, and to manage job applicants

import JobModel from "../models/job.model.js";
// import emailService from "../services/email.service.js";
import { sendConfirmationEmail } from "../middlewares/email-confirmation.middleware.js";

export default class JobController {
  getJobListings(req, res) {
    let jobs = JobModel.getAllJobs();
    // res.render("post-job.ejs", { jobs });
    res.render("job-listings.ejs", { jobs, userEmail: req.session.userEmail });
  }

  postNewJobListing(req, res) {
    JobModel.postNewJob(req.body);

    let jobs = JobModel.getAllJobs();
    res.render("job-listings.ejs", { jobs, userEmail: req.session.userEmail });
  }

  getJobListingById(req, res) {
    const id = parseInt(req.params.id);
    const jobDetails = JobModel.getJobListing(id);
    if (jobDetails) {
      return res.render("job-details.ejs", { jobDetails, id });
    } else {
      return res.status(404).redirect("/404");
    }
  }

  // updateJobListingById(req, res) {
  //   JobModel.updateJobListing(req.body);
  //   res.redirect(`/jobs/${req.params.id}`);
  // }

  deleteJobListingById(req, res) {
    const id = parseInt(req.params.id);
    const jobFound = JobModel.getJobListing(id);
    if (jobFound) {
      JobModel.deleteJobListing(id);
      res.redirect("/jobs");
    } else {
      return res.status(404).redirect("/404");
    }
  }

  getAllApplicantsForJobId(req, res) {
    const id = parseInt(req.params.id);
    let applicants = JobModel.getAllApplicants(id);
    res.render("applicant-list.ejs", { applicants });
  }

  // addNewApplicant(req, res) {

  // }

  getApplicantById(req, res) {
    const applicant_id = parseInt(req.params.applicant_id);
    let applicantDetails = JobModel.getApplicant(applicant_id);
    if (applicantDetails) {
      res.render("job-applicant.ejs", { applicant: applicantDetails });
    } else {
      return res.status(404).redirect("/404");
    }
  }

  updateApplicantById(req, res) {
    const job_id = parseInt(req.params.id);
    const applicant_id = parseInt(req.params.applicant_id);
    JobModel.updateApplicant(job_id, applicant_id, req.body);
    res.redirect("/jobs/${job_id}/applicants/${applicant_id}");
  }

  deleteApplicantById(req, res) {
    const job_id = parseInt(req.params.id);
    const applicant_id = parseInt(req.params.applicant_id);

    const jobDetails = JobModel.getJobListing(job_id);

    if (jobDetails) {
      let applicantDetails = JobModel.getApplicant(applicant_id);
      if (applicantDetails) {
        JobModel.deleteApplicant(applicant_id);
        res.redirect(`/jobs/${job_id}/applicants`);
      } else {
        return res.status(404).redirect("/404");
      }
    } else {
      // check where to redirect
      return res.status(404).redirect("/404");
    }
  }

  getUpdateJobFormById(req, res) {
    const id = parseInt(req.params.id);
    const jobDetails = JobModel.getJobListing(id);

    if (jobDetails) {
      return res.render("update_job.ejs", { jobDetails, id });
    } else {
      return res.status(404).redirect("/404");
    }
  }

  postUpdateJobFormById(req, res) {
    JobModel.updateJobListing(req.body);
    res.redirect(`/jobs/${req.params.id}`);
  }

  getDeleteJobFormById(req, res) {}

  getApplyJobFormById(req, res) {
    const id = parseInt(req.params.id);
    const jobDetails = JobModel.getJobListing(id);

    if (jobDetails) {
      return res.render("apply-job.ejs", { id, errors: null });
    } else {
      return res.status(404).redirect("/404");
    }
  }

  postApplyJobFormById(req, res) {
    const job_id = req.params.id;
    const { name, email, contact, resume_path } = req.body;
    JobModel.addApplicant(job_id, name, email, contact, resume_path);
    let applicants = JobModel.getAllApplicants(job_id);
    const applicantEmail = req.body.email;
    sendConfirmationEmail(applicantEmail);
    res.render("applicant-list.ejs", { applicants });
  }

  get404ErrorPage(req, res) {
    res.render("error-page.ejs");
  }

  search = (req, res) => {
    const jobs = JobModel.searchResult(req.body.company_name);
    res.render("job-listings.ejs", { jobs, userEmail: req.session.userEmail });
  };
}
