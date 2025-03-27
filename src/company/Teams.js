import React, { useState, useEffect } from 'react';
import './Teams.css';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [newTeam, setNewTeam] = useState({ name: '', departmentId: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Simulate fetching teams and departments
    setTimeout(() => {
      setDepartments([
        { id: 1, name: 'Engineering' },
        { id: 2, name: 'Marketing' },
        { id: 3, name: 'Human Resources' }
      ]);
      
      setTeams([
        { id: 1, name: 'Frontend', departmentId: 1, description: 'UI/UX development' },
        { id: 2, name: 'Backend', departmentId: 1, description: 'API and server development' },
        { id: 3, name: 'Digital Marketing', departmentId: 2, description: 'Online campaigns and SEO' }
      ]);
