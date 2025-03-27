import React, { useState, useEffect } from 'react';
import './Departments.css';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Simulate fetching departments
    setTimeout(() => {
      setDepartments([
        { id: 1, name: 'Engineering', description: 'Software development and engineering' },
        { id: 2, name: 'Marketing', description: 'Brand management and promotion' },
        { id: 3, name: 'Human Resources', description: 'Employee management and recruitment' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDepartment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddDepartment = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to add department
    setTimeout(() => {
      const id = departments.length + 1;
      setDepartments([...departments, { id, ...newDepartment }]);
      setNewDepartment({ name: '', description: '' });
      setIsAdding(false);
      setMessage('Department added successfully!');
      setLoading(false);
    }, 1000);
  };

  const handleEditDepartment = (id) => {
    const department = departments.find(dept => dept.id === id);
    setNewDepartment({ name: department.name, description: department.description });
    setEditingId(id);
    setIsAdding(true);
  };

  const handleUpdateDepartment = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to update department
    setTimeout(() => {
      setDepartments(departments.map(dept => 
        dept.id === editingId ? { ...dept, ...newDepartment } : dept
      ));
      setNewDepartment({ name: '', description: '' });
      setIsAdding(false);
      setEditingId(null);
      setMessage('Department updated successfully!');
      setLoading(false);
    }, 1000);
  };

  const handleDeleteDepartment = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setLoading(true);
      
      // Simulate API call to delete department
      setTimeout(() => {
        setDepartments(departments.filter(dept => dept.id !== id));
        setMessage('Department deleted successfully!');
        setLoading(false);
      }, 1000);
    }
  };

  if (loading && departments.length === 0) {
    return <div className="loading">Loading departments...</div>;
  }

  return (
    <div className="departments-container">
      <h2>Departments</h2>
      
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
      
      {!isAdding ? (
        <>
          <button onClick={() => setIsAdding(true)} className="add-button">
            Add New Department
          </button>
          
          <div className="departments-list">
            {departments.map(dept => (
              <div key={dept.id} className="department-card">
                <h3>{dept.name}</h3>
                <p>{dept.description}</p>
                <div className="department-actions">
                  <button onClick={() => handleEditDepartment(dept.id)}>Edit</button>
                  <button onClick={() => handleDeleteDepartment(dept.id)} className="delete-button">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <form onSubmit={editingId ? handleUpdateDepartment : handleAddDepartment} className="department-form">
          <h3>{editingId ? 'Edit Department' : 'Add New Department'}</h3>
          <div className="form-group">
            <label htmlFor="name">Department Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newDepartment.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newDepartment.description}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
          <div className="form-buttons">
            <button type="submit" disabled={loading} className="save-button">
              {loading ? 'Saving...' : (editingId ? 'Update Department' : 'Add Department')}
            </button>
            <button 
              type="button" 
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setNewDepartment({ name: '', description: '' });
              }} 
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Departments;
