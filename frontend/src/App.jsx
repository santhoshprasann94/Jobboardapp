import { useState } from "react";
import "./App.css";
import JobList from "./components/JobList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="overlay">

        <header className="header">
          <div>
            <h1>💼 Job Board Dashboard</h1>
            <p>Find, Manage & Track Jobs Easily</p>
          </div>

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </header>

        <JobList />

        <ToastContainer
          position="top-right"
          autoClose={2500}
          theme={darkMode ? "dark" : "colored"}
        />

      </div>
    </div>
  );
}

export default App;