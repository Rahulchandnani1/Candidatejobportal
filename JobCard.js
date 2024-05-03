import React from 'react';
import { useState } from 'react';

const JobCard = ({ job }) => {
  const { jobRole,  location, jobDetailsFromCompany,minExp,minJdSalary, maxJdSalary, jdLink } = job;
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const toggleModal = () => {
    setShowModal(!showModal);
  };
  let jobrole=jobRole.split(" ").map((item)=>item.charAt(0).toUpperCase()+item.slice(1)).join(" ");
  return (
    <div className="job-card">
      
      <h3>The Company</h3>
      <h2>{jobrole}</h2>
     
      <p className='salary'>Estimated Salary: {`${(minJdSalary?minJdSalary:maxJdSalary-4)}-${(maxJdSalary?maxJdSalary:minJdSalary+4)} LPA`}</p>
      <p className='about'>About Company:</p>
      <p className='blur'>{jobDetailsFromCompany.slice(0, 133)}<span>{jobDetailsFromCompany.slice(134, 230)}</span></p>
      {!showAll && (
        <button onClick={toggleModal}>Load More</button>
      )}
      {showModal && (
        <div className="popup-overlay" onClick={toggleModal}>
          <div className="popup-content">
           
            <h5>Job Description</h5>
            <h4>About Company:</h4>
            <p>{jobDetailsFromCompany}</p>
          
            <h4>About Role:</h4>
            <p>{jobDetailsFromCompany}</p>
            <p>{jobDetailsFromCompany}</p>
            <p>{jobDetailsFromCompany}</p>
            <p>{jobDetailsFromCompany}</p>
            <p>{jobDetailsFromCompany}</p>
            <p>{jobDetailsFromCompany}</p>
            <p>{jobDetailsFromCompany}</p>
          </div>
        </div>
      )}
      <p>Location: {location}</p>
      
      <h3>Minimum Experience:</h3>
      <h2>{minExp?minExp+" Years":"2 Years"}</h2>
      <a href={jdLink} target="_blank" rel="noopener noreferrer">Easy Apply</a>
    </div>
  );
};

export default JobCard;