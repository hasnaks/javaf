import React from 'react';
import { Navigate } from 'react-router-dom';

// Usage: <RequireAuth allowedRoles={["admin"]}><AdminComponent/></RequireAuth>
export default function RequireAuth({ allowedRoles = [], children }) {
  const role = localStorage.getItem('ecosort_role');

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // not allowed
    return <Navigate to="/login" replace />;
  }

  return children;
}
