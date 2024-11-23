import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Book,
  Users,
  Settings,
  Calendar,
  Bell,
  MessageCircle,
  BarChart2,
  FileText,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  role: string[];
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} />, role: ['student', 'instructor', 'admin', 'super-admin'] },
  { name: 'Courses', path: '/courses', icon: <Book size={20} />, role: ['student', 'instructor', 'admin', 'super-admin'] },
  { name: 'Users', path: '/users', icon: <Users size={20} />, role: ['admin', 'super-admin'] },
  { name: 'Calendar', path: '/calendar', icon: <Calendar size={20} />, role: ['student', 'instructor', 'admin', 'super-admin'] },
  { name: 'Messages', path: '/messages', icon: <MessageCircle size={20} />, role: ['student', 'instructor', 'admin', 'super-admin'] },
  { name: 'Notifications', path: '/notifications', icon: <Bell size={20} />, role: ['student', 'instructor', 'admin', 'super-admin'] },
  { name: 'Analytics', path: '/analytics', icon: <BarChart2 size={20} />, role: ['instructor', 'admin', 'super-admin'] },
  { name: 'Reports', path: '/reports', icon: <FileText size={20} />, role: ['admin', 'super-admin'] },
  { name: 'Settings', path: '/settings', icon: <Settings size={20} />, role: ['student', 'instructor', 'admin', 'super-admin'] },
  { name: 'Help', path: '/help', icon: <HelpCircle size={20} />, role: ['student', 'instructor', 'admin', 'super-admin'] },
];

interface SidebarProps {
  userRole: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const filteredItems = sidebarItems.filter(item => item.role.includes(userRole));

  return (
    <div
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } min-h-screen bg-gray-800 text-white transition-all duration-300 fixed left-0 top-0 z-50`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
          <span className="text-xl font-bold">SAMS LMS</span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="mt-6">
        {filteredItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center p-4 hover:bg-gray-700 transition-colors ${
              location.pathname === item.path ? 'bg-gray-700' : ''
            }`}
          >
            <span className="flex items-center justify-center">{item.icon}</span>
            {!isCollapsed && (
              <span className="ml-4">{item.name}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full border-t border-gray-700">
        <button
          onClick={() => navigate('/logout')}
          className="w-full flex items-center p-4 hover:bg-gray-700 transition-colors text-red-400"
        >
          <span className="flex items-center justify-center">
            <LogOut size={20} />
          </span>
          {!isCollapsed && (
            <span className="ml-4">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
