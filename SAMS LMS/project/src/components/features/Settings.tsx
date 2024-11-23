import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Shield,
  Database,
  Mail,
  Bell,
  Layout,
  Save,
} from 'lucide-react';

interface SettingSection {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const settingSections: SettingSection[] = [
  {
    id: 'security',
    name: 'Security Settings',
    icon: <Shield className="h-6 w-6" />,
    description: 'Configure system security settings and access controls'
  },
  {
    id: 'database',
    name: 'Database Configuration',
    icon: <Database className="h-6 w-6" />,
    description: 'Manage database connections and backup settings'
  },
  {
    id: 'notifications',
    name: 'Notification Settings',
    icon: <Bell className="h-6 w-6" />,
    description: 'Configure system-wide notification preferences'
  },
  {
    id: 'email',
    name: 'Email Configuration',
    icon: <Mail className="h-6 w-6" />,
    description: 'Set up email server and template settings'
  },
  {
    id: 'appearance',
    name: 'System Appearance',
    icon: <Layout className="h-6 w-6" />,
    description: 'Customize the look and feel of the platform'
  }
];

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('security');
  const [formData, setFormData] = useState({
    security: {
      passwordPolicy: 'strong',
      sessionTimeout: '30',
      twoFactorAuth: true
    },
    database: {
      backupFrequency: 'daily',
      retentionPeriod: '30',
      compressionEnabled: true
    },
    notifications: {
      systemAlerts: true,
      maintenanceNotices: true,
      userActivities: false
    },
    email: {
      smtpServer: 'smtp.example.com',
      smtpPort: '587',
      senderEmail: 'noreply@example.com'
    },
    appearance: {
      theme: 'light',
      accentColor: '#4F46E5',
      sidebarCollapsed: false
    }
  });

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">System Settings</h1>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Save className="w-5 h-5 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {settingSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  activeSection === section.id
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-3">{section.icon}</span>
                {section.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          {/* Security Settings */}
          {activeSection === 'security' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password Policy
                  </label>
                  <select
                    value={formData.security.passwordPolicy}
                    onChange={(e) => handleInputChange('security', 'passwordPolicy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="basic">Basic</option>
                    <option value="medium">Medium</option>
                    <option value="strong">Strong</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.security.sessionTimeout}
                    onChange={(e) => handleInputChange('security', 'sessionTimeout', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.security.twoFactorAuth}
                    onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Enable Two-Factor Authentication
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Database Settings */}
          {activeSection === 'database' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Database Configuration</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Backup Frequency
                  </label>
                  <select
                    value={formData.database.backupFrequency}
                    onChange={(e) => handleInputChange('database', 'backupFrequency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Retention Period (days)
                  </label>
                  <input
                    type="number"
                    value={formData.database.retentionPeriod}
                    onChange={(e) => handleInputChange('database', 'retentionPeriod', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.database.compressionEnabled}
                    onChange={(e) => handleInputChange('database', 'compressionEnabled', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Enable Backup Compression
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Other sections would be implemented similarly */}
        </div>
      </div>
    </div>
  );
};

export default Settings;
