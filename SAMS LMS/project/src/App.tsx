import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import LandingPage from './components/landing/LandingPage';
import DashboardLayout from './components/layouts/DashboardLayout';
import LoadingSpinner from './components/common/LoadingSpinner';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import AuditorDashboard from './pages/AuditorDashboard';
import ParentDashboard from './pages/ParentDashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<DashboardLayout />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
              <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />
              <Route path="/auditor-dashboard" element={<AuditorDashboard />} />
              <Route path="/parent-dashboard" element={<ParentDashboard />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;