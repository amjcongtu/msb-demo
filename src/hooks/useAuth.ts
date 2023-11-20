import React from 'react';
import { AuthContext } from '../context/authContext';

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};
