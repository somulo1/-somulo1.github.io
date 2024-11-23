import React from 'react';
import { 
  Calendar,
  Users,
  BarChart2,
  FileText,
  Settings,
  MessageSquare,
  HelpCircle,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (itemId: string) => void;
}

const sidebarItems = [
  { id: 'calendar', icon: Calendar, label: 'Calendar' },
  { id: 'users', icon: Users, label: 'Users' },
  { id: 'analytics', icon: BarChart2, label: 'Analytics' },
  { id: 'reports', icon: FileText, label: 'Reports' },
  { id: 'settings', icon: Settings, label: 'Settings' },
  { id: 'messages', icon: MessageSquare, label: 'Messages' },
  { id: 'help', icon: HelpCircle, label: 'Help' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onItemClick }) => {
  return (
    <div className={`bg-white h-full w-64 shadow-lg flex flex-col`}>
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-md text-gray-500 hover:text-gray-600 lg:hidden"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 overflow-auto py-4">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onItemClick(item.id)}
                className="w-full flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-gray-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Super Admin</p>
            <p className="text-xs text-gray-500">admin@samslms.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;