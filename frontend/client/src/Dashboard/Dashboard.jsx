// src/Dashboard/Dashboard.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import SidePanel from './SidePanel';
import SelectDevice from './DashboardElements/SelectDevice';
import GetDeviceAnalytics from './DashboardElements/GetDeviceAnalytics';
import Profile from './DashboardElements/Profile';

const drawerWidth = 0;

const Dashboard = () => {
  return (
    <div className='bg-gray-900'>

    <Box sx={{ display: 'flex', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <CssBaseline />
      <SidePanel />
      <Box
        component="main"
        sx={{
          flexGrow: 55,
          ml: `${drawerWidth}px`,
          p: 0,
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="get-analytics" />} />
          <Route path="select-device" element={<SelectDevice />} />
          <Route path="get-analytics" element={<GetDeviceAnalytics />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Box>
    </Box>
    </div>
  );
};

export default Dashboard;
