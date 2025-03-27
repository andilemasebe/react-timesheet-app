import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Employees.css';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    departmentId: '',
    teamId: '',
    position: '',
    hireDate: '',
    status: 'active'
  });

  useEffect(() => {
    // Simulate fetching employees, departments, and teams
    Promise.all([
      // These would be actual API calls in a real app
      new Promise(resolve => setTimeout(() => {
        resolve([
          { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '555-1234', departmentId: 1, teamId: 1, position: 'Frontend Developer', hireDate: '2022-01-15', status: 'active' },
          { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '555-5678', departmentId: 1, teamId: 2, position: 'Backend Developer', hireDate: '2021-06-10', status: 'active' },
          { id: 3, firstName: 'Mike', lastName: 'Johnson', email: 'mike.j@example.com', phone: '555-9012', departmentId: 2, teamId: 3, position: 'Marketing Specialist', hireDate: '2022-03-22', status: 'active' }
        ]);
      }, 800)),
      new Promise(resolve => setTimeout(() => {
        resolve([
          { id: 1, name: 'Engineering' },
          { id: 2, name: 'Marketing' },
          { id: 3, name: 'Human Resources' }
        ]);
      }, 600)),
      new Promise(resolve => setTimeout(() => {
        resolve([
          { id: 1, name: 'Frontend', departmentId: 1 },
          { id: 2, name: 'Backend', departmentId: 1 },
          { id: 3, name: 'Digital Marketing', departmentId: 2 }
        ]);
      }, 700))
    ])
    .then(([employeesData, departmentsData, teamsData]) => {
      setEmployees(employeesData);
      setDepartments(departmentsData);
      setTeams(teamsData);
      setLoading(false);
    })
    .catch(err => {
      setError('Failed to load data. Please try again later.');
      setLoading(false);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to add employee
    setTimeout(() => {
      const id = employees.length + 1;
      setEmployees([...employees, { id, ...newEmployee }]);
      setNewEmployee({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        departmentId: '',
        teamId: '',
        position: '',
        hireDate: '',
        status: 'active'
      });
      setIsAdding(false);
      setMessage('Employee added successfully!');
      setLoading(false);
    }, 1000);
  };

  const handleEditEmployee = (id) => {
    const employee = employees.find(emp => emp.id === id);
    setNewEmployee({ ...employee });
    setEditingId(id);
    setIsAdding(true);
  };

  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to update employee
    setTimeout(() => {
      setEmployees(employees.map(emp => 
        emp.id === editingId ? { ...emp, ...newEmployee } : emp
      ));
      setNewEmployee({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        departmentId: '',
        teamId: '',
        position: '',
        hireDate: '',
        status: 'active'
      });
      setIsAdding(false);
      setEditingId(null);
      setMessage('Employee updated successfully!');
      setLoading(false);
    }, 1000);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setLoading(true);
      
      // Simulate API call to delete employee
      setTimeout(() => {
        setEmployees(employees.filter(emp => emp.id !== id));
        setMessage('Employee deleted successfully!');
        setLoading(false);
      }, 1000);
    }
  };

  // Filter employees based on search term and department filter
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === '' || emp.departmentId.toString() === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  if (loading && employees.length === 0) {
    return <div className="loading">Loading employees...</div>;
  }

  return (
    <div className="employees-container">
      <h1>Employees Management</h1>
      
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
      
      {!isAdding ? (
        <>
          <div className="employees-actions">
            <button onClick={() => setIsAdding(true)} className="add-button">
              Add New Employee
            </button>
            
            <div className="filters">
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              
              <select 
                value={filterDepartment} 
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="department-filter"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="employees-list">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Team</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.firstName} {emp.lastName}</td>
                    <td>{emp.email}</td>
                    <td>{departments.find(d => d.id === emp.departmentId)?.name || 'N/A'}</td>
                    <td>{teams.find(t => t.id === emp.teamId)?.name || 'N/A'}</td>
                    <td>{emp.position}</td>
                    <td>
                      <span className={`status-badge ${emp.status}`}>
                        {emp.status.charAt(0).toUpperCase() + emp.status.slice(1)}
                      </span>
                    </td>
                    <td className="actions">
                      <button onClick={() => handleEditEmployee(emp.id)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDeleteEmployee(emp.id)} className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <form onSubmit={editingId ? handleUpdateEmployee : handleAddEmployee} className="employee-form">
          <h2>{editingId ? 'Edit Employee' : 'Add New Employee'}</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={newEmployee.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={newEmployee.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newEmployee.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={newEmployee.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="departmentId">Department</label>
              <select
                id="departmentId"
                name="departmentId"
                value={newEmployee.departmentId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="teamId">Team</label>
              <select
                id="teamId"
                name="teamId"
                value={newEmployee.teamId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Team</option>
                {teams
                  .filter(team => !newEmployee.departmentId || team.departmentId.toString() === newEmployee.departmentId.toString())
                  .map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                value={newEmployee.position}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="hireDate">Hire Date</label>
              <input
                type="date"
                id="hireDate"
                name="hireDate"
                value={newEmployee.hireDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={newEmployee.status}
                onChange={handleInputChange}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="onleave">On Leave</option>
              </select>
            </div>
          </div>
