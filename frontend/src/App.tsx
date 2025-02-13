import { useState } from 'react'
import './App.css'

interface JobForm {
  title: string;
  description: string;
  location: string;
  salary: string;
}

interface ApplicationForm {
  name: string;
  email: string;
  resume: string;
  job_id: number;
}

function App() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [showApplicants, setShowApplicants] = useState(false);
  
  const [formData, setFormData] = useState<JobForm>({
    title: '',
    description: '',
    location: '',
    salary: ''
  });

  const [applicationData, setApplicationData] = useState<ApplicationForm>({
    name: '',
    email: '',
    resume: '',
    job_id: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Job posted successfully!');
        setFormData({
          title: '',
          description: '',
          location: '',
          salary: ''
        });
        fetchJobs();
      } else {
        alert('Failed to post job');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error posting job');
    }
  };

  const handleApply = async (e: React.FormEvent, jobId: number) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/applicants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...applicationData,
          job_id: jobId
        }),
      });
      
      if (response.ok) {
        alert('Application submitted successfully!');
        setApplicationData({
          name: '',
          email: '',
          resume: '',
          job_id: 0
        });
        setSelectedJobId(null);
      } else {
        alert('Failed to submit application');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting application');
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/jobs');
      const data = await response.json();
      setJobs(data.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchApplicants = async (jobId?: number) => {
    try {
      const url = jobId 
        ? `http://localhost:3000/api/applicants/job/${jobId}`
        : 'http://localhost:3000/api/applicants';
      const response = await fetch(url);
      const data = await response.json();
      setApplicants(data.data);
      setShowApplicants(true);
    } catch (error) {
      console.error('Error fetching applicants:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplicationInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <h1>Job Portal</h1>
      
      <div className="form-container">
        <h2>Post a New Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Salary:</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <button type="submit">Post Job</button>
        </form>
      </div>

      <div className="jobs-list">
        <h2>Posted Jobs</h2>
        <div className="button-group">
          <button onClick={fetchJobs}>Refresh Jobs</button>
          <button onClick={() => fetchApplicants()}>View All Applicants</button>
        </div>
        
        {jobs.map((job: any, index: number) => (
          <div key={index} className="job-card">
            <h3>{job.title}</h3>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            
            <div className="button-group">
              <button onClick={() => setSelectedJobId(job.job_id)}>
                Apply for this Job
              </button>
              <button onClick={() => fetchApplicants(job.job_id)}>
                View Applicants
              </button>
            </div>

            {selectedJobId === job.job_id && (
              <div className="application-form">
                <h4>Apply for {job.title}</h4>
                <form onSubmit={(e) => handleApply(e, job.job_id)}>
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={applicationData.name}
                      onChange={handleApplicationInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={applicationData.email}
                      onChange={handleApplicationInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Resume Link:</label>
                    <input
                      type="url"
                      name="resume"
                      value={applicationData.resume}
                      onChange={handleApplicationInputChange}
                      required
                    />
                  </div>
                  
                  <button type="submit">Submit Application</button>
                  <button type="button" onClick={() => setSelectedJobId(null)}>Cancel</button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>

      {showApplicants && (
        <div className="applicants-list">
          <h2>Applicants</h2>
          <button onClick={() => setShowApplicants(false)}>Close</button>
          {applicants.map((applicant: any, index: number) => (
            <div key={index} className="applicant-card">
              <h3>{applicant.name}</h3>
              <p><strong>Email:</strong> {applicant.email}</p>
              <p><strong>Applied for:</strong> {applicant.job_title}</p>
              <p>
                <strong>Resume:</strong>
                <a href={applicant.resume} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
