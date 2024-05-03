// Filters.js
import React, { useState } from 'react';

const Filters = ({ onFilter }) => {
  const [minExperience, setMinExperience] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [remote, setRemote] = useState(false);
  const [role, setRole] = useState('');
  const [minBasePay, setMinBasePay] = useState('');

  const handleFilter = (e) => {
    e.preventDefault();
    onFilter({
      minExperience,
      companyName,
      location,
      remote,
      role,
      minBasePay
    });
  };

  return (
    <div className="filters">
      
      <form onSubmit={handleFilter}>
       
          <input type="text" placeholder='Min Experience' value={minExperience} onChange={(e) => setMinExperience(e.target.value)} />
        
       
          <input type="text" placeholder='Company Name' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        
       
          <input type="text" placeholder='Enter Location' value={location} onChange={(e) => setLocation(e.target.value)} />
        
       
          <input type="checkbox" checked={remote} onChange={(e) => setRemote(e.target.checked)} />
        
       
        
          <input type="text" placeholder="Enter Role" value={role} onChange={(e) => setRole(e.target.value)} />
        
       
          <input type="text" placeholder='Min Base Pay in LPA' value={minBasePay} onChange={(e) => setMinBasePay(e.target.value)} />
        
        <button type="submit">Apply Filters</button>
      </form>
    </div>
  );
};

export default Filters;
