import { useEffect, useState } from "react";
import API from "../services/api";
import JobForm from "./JobForm";
import {
  FaSearch,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { toast } from "react-toastify";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await API.get("");
      setJobs(response.data);
    } catch (error) {
      toast.error("Failed to load jobs");
    }
  };

  const deleteJob = async (id) => {
    if (window.confirm("Delete this job?")) {
      try {
        await API.delete(`/${id}`);
        toast.success("Job deleted successfully!");
        loadJobs();
      } catch (error) {
        toast.error("Unable to delete job");
      }
    }
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fav) => fav !== id));
      toast.info("Removed from favourites");
    } else {
      setFavorites([...favorites, id]);
      toast.success("Added to favourites");
    }
  };

  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        filterType === "All" || job.jobType === filterType;

      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "salary-high":
          return Number(b.salary) - Number(a.salary);

        case "salary-low":
          return Number(a.salary) - Number(b.salary);

        case "company":
          return a.company.localeCompare(b.company);

        default:
          return b.id - a.id;
      }
    });

  const companies = [...new Set(jobs.map((j) => j.company))].length;
  const locations = [...new Set(jobs.map((j) => j.location))].length;

  return (
    <>
      <div className="dashboard">
        <div className="card">
          <p>Total Jobs</p>
          <h2>{filteredJobs.length}</h2>
        </div>

        <div className="card">
          <p>Companies</p>
          <h2>{companies}</h2>
        </div>

        <div className="card">
          <p>Locations</p>
          <h2>{locations}</h2>
        </div>

        <div className="card">
          <p>Status</p>
          <h2>Active</h2>
        </div>
      </div>

      <div className="main">
        <div className="form-card">
          <JobForm
            refresh={loadJobs}
            editingJob={editingJob}
            setEditingJob={setEditingJob}
          />
        </div>

        <div className="table-card">

          <div style={{ position: "relative", marginBottom: "15px" }}>
            <FaSearch
              style={{
                position: "absolute",
                left: "15px",
                top: "15px",
                color: "#7C3AED",
              }}
            />

            <input
              className="search"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "45px" }}
            />
          </div>

          <select
            className="search"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Job Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          <select
            className="search"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="salary-high">Highest Salary</option>
            <option value="salary-low">Lowest Salary</option>
            <option value="company">Company A-Z</option>
          </select>

          <div className="job-grid">
            {filteredJobs.map((job) => (
              <div className="job-card" key={job.id}>

                <div className="favorite">
                  <button
                    className="favorite-btn"
                    onClick={() => toggleFavorite(job.id)}
                  >
                    {favorites.includes(job.id) ? (
                      <FaHeart color="red" size={22} />
                    ) : (
                      <FaRegHeart color="gray" size={22} />
                    )}
                  </button>
                </div>

                <div className="job-top">
                  <div className="company-logo">
                    {job.company.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3>{job.title}</h3>
                    <p>{job.company}</p>
                  </div>
                </div>

                <div className="job-info">
                  <span>📍 {job.location}</span>
                  <span>💰 ₹ {job.salary}</span>
                </div>

                <p className="description">
                  {job.description}
                </p>

                <div className="badge">
                  {job.jobType || "Full Time"}
                </div>

                <p className="posted-date">
                  📅 Posted: {job.postedDate || "Today"}
                </p>

                <div className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => setEditingJob(job)}
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteJob(job.id)}
                  >
                    🗑 Delete
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default JobList;