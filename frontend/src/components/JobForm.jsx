import { useState, useEffect } from "react";
import API from "../services/api";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaFileAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

function JobForm({ refresh, editingJob, setEditingJob }) {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    jobType: "Full Time",
    postedDate: new Date().toLocaleDateString(),
  });

  useEffect(() => {
    if (editingJob) {
      setJob({
        ...editingJob,
        jobType: editingJob.jobType || "Full Time",
        postedDate:
          editingJob.postedDate || new Date().toLocaleDateString(),
      });
    }
  }, [editingJob]);

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !job.title ||
      !job.company ||
      !job.location ||
      !job.salary ||
      !job.description
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      if (editingJob) {
        await API.put(`/${editingJob.id}`, job);
        toast.success("Job updated successfully!");
        setEditingJob(null);
      } else {
        await API.post("", job);
        toast.success("Job added successfully!");
      }

      setJob({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        jobType: "Full Time",
        postedDate: new Date().toLocaleDateString(),
      });

      refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: "20px", color: "white" }}>
        {editingJob ? "✏ Edit Job" : "🚀 Add New Job"}
      </h2>

      <div className="input-group">
        <FaBriefcase className="icon" />
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <FaBuilding className="icon" />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={job.company}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <FaMapMarkerAlt className="icon" />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <FaMoneyBillWave className="icon" />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={job.salary}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <select
          name="jobType"
          value={job.jobType}
          onChange={handleChange}
        >
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Remote</option>
          <option>Hybrid</option>
        </select>
      </div>

      <div className="input-group">
        <FaFileAlt className="icon" />
        <textarea
          name="description"
          placeholder="Job Description"
          value={job.description}
          onChange={handleChange}
        />
      </div>

      <button className="submit-btn" type="submit">
        {editingJob ? "Update Job" : "Add Job"}
      </button>
    </form>
  );
}

export default JobForm;