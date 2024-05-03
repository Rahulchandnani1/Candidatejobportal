import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobsRequest, fetchJobsSuccess, fetchJobsFailure } from './actions';
import JobCard from './JobCard';
import Filters from './Filters';
import "./App.css";
import logo from "./log.png";
const App = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(state => state.jobs);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  const [filters, setFilters] = useState({});
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true); // Flag to track if more jobs are available
  const [loadingMore, setLoadingMore] = useState(false); // Flag to track 
  const endOfPageRef = useRef();
  const [allJobs, setAllJobs] = useState([]);
console.log(jobs,"jobs")
const [page, setPage] = useState(1);

useEffect(() => {
  dispatch(fetchJobsRequest());

  fetchJobs(page);

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [dispatch, page]);

const fetchJobs = (page) => {
  fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      limit: 10,
      offset: (page - 1) * 10
    })
  })
  .then(response => response.json())
  .then(data => {
    dispatch(fetchJobsSuccess(data.jdList));
   
  })
  .catch(error => {
    dispatch(fetchJobsFailure(error.message));
  });
};

const handleScroll = () => {
  if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
    setPage(page + 1);
  }
};

 
 
 
  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredJobs = jobs.filter(job => {
    // Apply filters here
    if (filters.minExperience && job.minExp <filters.minExperience) {
      console.log(job.minExp==filters.minExperience,"exp")
      return false;
    }
    if (filters.companyName && !job.company.toLowerCase().includes(filters.companyName.toLowerCase())) {
      return false;
    }
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.remote && !job.location.includes("remote")) {
      return false;
    }
   
    if (filters.role && !job.jobRole.toLowerCase().includes(filters.role.toLowerCase())) {
      return false;
    }
    if (filters.minBasePay && job.minJdSalary < filters.minBasePay) {
      console.log(job.minJdSalary == filters.minBasePay,"pay")
      return false;

    }
    return true;
  });

  console.log( window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight)
 
  return (
    <div className="app">
            <div className='signupbar'> 
      <div>
        <h3>Signup</h3>
      </div>
      <img src={logo}/>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Filters onFilter={applyFilters} />
      <div className="job-list">
        {filteredJobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
        {filteredJobs.length==0?<div className='nojobsdiv'><p>Uh Oh No Jobs Found!</p><p>Kindly remove the filters and click on apply filter button</p></div>:null}
      </div>
      <div ref={endOfPageRef}></div>
    </div>
  );
};

export default App;
