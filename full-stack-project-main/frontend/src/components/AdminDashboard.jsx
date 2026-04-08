import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers().then(setUsers).catch(console.error);
  }, []);

  return (
    <>
      <div className="card">
        <h3>Platform overview</h3>
        <p className="text-muted">
          Monitor who is joining the platform and keep farmer–buyer interactions safe and fair.
        </p>
      </div>

      <div className="card">
        <h3>Users</h3>
        <div style={{ display: 'grid', gap: '0.6rem', marginTop: '0.5rem' }}>
          {users.map(u => (
            <div
              key={u.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.6rem 0.75rem',
                borderRadius: 14,
                border: '1px solid rgba(148,163,184,0.35)',
                background: 'rgba(15,23,42,0.9)'
              }}
            >
              <div>
                <strong>{u.fullName}</strong>
                <div className="text-muted">{u.email}</div>
              </div>
              <span className="tag">{u.role}</span>
            </div>
          ))}
          {users.length === 0 && <p className="text-muted">No users yet.</p>}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
