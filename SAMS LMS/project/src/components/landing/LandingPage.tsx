import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '../../types/auth';

interface TabInfo {
  id: UserRole;
  title: string;
  path: string;
  color: string;
  description: string;
  icon: string;
}

const tabs: TabInfo[] = [
  {
    id: UserRole.STUDENT,
    title: "Student Dashboard",
    path: "/student-dashboard",
    color: "#4CAF50",
    description: "Access your courses, assignments, and track your learning progress",
    icon: "👨‍🎓",
  },
  {
    id: UserRole.INSTRUCTOR,
    title: "Instructor Dashboard",
    path: "/instructor-dashboard",
    color: "#2196F3",
    description: "Manage courses, create content, and monitor student progress",
    icon: "👨‍🏫",
  },
  {
    id: UserRole.ADMIN,
    title: "Admin Dashboard",
    path: "/admin-dashboard",
    color: "#9C27B0",
    description: "Manage users, departments, and system settings",
    icon: "👨‍💼",
  },
  {
    id: UserRole.SUPER_ADMIN,
    title: "Super Admin Dashboard",
    path: "/superadmin-dashboard",
    color: "#F44336",
    description: "Full system control, configuration, and analytics",
    icon: "🔧",
  },
  {
    id: UserRole.AUDITOR,
    title: "Auditor Dashboard",
    path: "/auditor-dashboard",
    color: "#FF9800",
    description: "Monitor system activities, review logs, and ensure compliance",
    icon: "📊",
  },
  {
    id: UserRole.PARENT,
    title: "Parent Dashboard",
    path: "/parent-dashboard",
    color: "#00BCD4",
    description: "Monitor your child's progress, view grades, and communicate with teachers",
    icon: "👨‍👧‍👦",
  }
];

const LandingPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<UserRole>(tabs[0].id);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleDashboardAccess = (tab: TabInfo) => {
    // Set user role before navigation
    if (setUser && user) {
      setUser({ ...user, role: tab.id });
    }
    navigate(tab.path);
  };

  const handleTabClick = (tab: TabInfo) => {
    setSelectedTab(tab.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-16 pb-8 text-center"
      >
        <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          SAMS Learning Platform
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
          Choose your role to access the personalized dashboard
        </p>
      </motion.div>

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleTabClick(tab)}
              className={`relative px-6 py-3 rounded-lg text-lg font-medium transition-colors
                ${selectedTab === tab.id
                  ? 'text-white bg-opacity-20'
                  : 'text-gray-300 hover:text-white hover:bg-opacity-10'}`}
              style={{
                backgroundColor: selectedTab === tab.id ? tab.color + '33' : 'transparent',
                borderColor: tab.color,
                borderWidth: '2px'
              }}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.title}
            </motion.button>
          ))}
        </div>

        {/* Selected Tab Content */}
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`${selectedTab === tab.id ? 'block' : 'hidden'}`}
            >
              <div className="bg-gray-800 bg-opacity-50 rounded-xl p-8 backdrop-blur-lg">
                <h3 className="text-2xl font-semibold mb-4" style={{ color: tab.color }}>
                  {tab.title}
                </h3>
                <p className="text-gray-300 mb-6">{tab.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDashboardAccess(tab)}
                  className="w-full py-3 px-6 rounded-lg font-medium text-white transition-colors"
                  style={{ backgroundColor: tab.color }}
                >
                  Access Dashboard
                </motion.button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center pb-8 text-gray-400"
      >
        <p> 2024 SAMS Learning Platform. All rights reserved.</p>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
