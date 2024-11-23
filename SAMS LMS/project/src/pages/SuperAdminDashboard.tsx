import React, { useState } from 'react';
import { Menu, Book, Activity, Users as UsersIcon, BarChart2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import Calendar from './superadmin/Calendar';
import Users from './superadmin/Users';
import Analytics from './superadmin/Analytics';
import Reports from './superadmin/Reports';
import Settings from './superadmin/Settings';
import Messages from './superadmin/Messages';
import Help from './superadmin/Help';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';

const SuperAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const generateTimeSeriesData = () => {
    // Mock time series data
    return Array.from({ length: 10 }, (_, i) => ({
      x: `Day ${i + 1}`,
      y: Math.floor(Math.random() * 100)
    }));
  };

  const generateCourseEnrollmentData = () => {
    // Mock course enrollment data
    return [
      { id: 'Programming', value: 35 },
      { id: 'Mathematics', value: 25 },
      { id: 'Science', value: 20 },
      { id: 'Languages', value: 15 },
      { id: 'Arts', value: 5 }
    ];
  };

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'Completed Python Course', timestamp: '5 mins ago', type: 'course' },
    { id: 2, user: 'Jane Smith', action: 'System Update', timestamp: '30 mins ago', type: 'system' },
    { id: 3, user: 'Mike Brown', action: 'Added new instructor', timestamp: '1 hour ago', type: 'user' },
    { id: 4, user: 'Emily Davis', action: 'Generated reports', timestamp: '2 hours ago', type: 'report' }
  ];

  const theme = {
    background: 'transparent',
    textColor: '#333333',
    fontSize: 11,
    axis: {
      domain: {
        line: {
          stroke: '#777777',
          strokeWidth: 1
        }
      },
      ticks: {
        line: {
          stroke: '#777777',
          strokeWidth: 1
        }
      }
    },
    grid: {
      line: {
        stroke: '#dddddd',
        strokeWidth: 1
      }
    }
  };

  const modalComponents: { [key: string]: React.ReactNode } = {
    calendar: <Calendar />,
    users: <Users />,
    analytics: <Analytics />,
    reports: <Reports />,
    settings: <Settings />,
    messages: <Messages />,
    help: <Help />
  };

  const modalTitles: { [key: string]: string } = {
    calendar: 'Calendar',
    users: 'User Management',
    analytics: 'Analytics Dashboard',
    reports: 'System Reports',
    settings: 'System Settings',
    messages: 'Messages',
    help: 'Help Center'
  };

  const handleSidebarItemClick = (itemId: string) => {
    setActiveModal(itemId);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Fixed position */}
      <div className={`fixed left-0 top-0 h-full z-30 transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onItemClick={handleSidebarItemClick}
        />
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out`}>
        {/* Top Navigation Bar */}
        <nav className="bg-white shadow-sm h-16 fixed w-full z-20">
          <div className="px-4 h-full flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
              <span className="ml-4 text-xl font-semibold text-gray-900">SAMS LMS</span>
            </div>
            <div className="flex items-center">
              {/* Add profile dropdown, notifications, etc. here */}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 overflow-auto pt-16">
          <main className="p-4">
            {/* Quick Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-semibold text-gray-600">Total Users</h3>
                <p className="text-2xl font-bold text-blue-600">12,458</p>
                <p className="text-xs text-gray-500">↑ 12% from last month</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-semibold text-gray-600">Active Courses</h3>
                <p className="text-2xl font-bold text-green-600">245</p>
                <p className="text-xs text-gray-500">↑ 8% from last month</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-semibold text-gray-600">Completion Rate</h3>
                <p className="text-2xl font-bold text-purple-600">78%</p>
                <p className="text-xs text-gray-500">↑ 5% from last month</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-semibold text-gray-600">Revenue</h3>
                <p className="text-2xl font-bold text-orange-600">$124.5K</p>
                <p className="text-xs text-gray-500">↑ 15% from last month</p>
              </div>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Activity Chart - Spans 2 columns */}
              <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">User Activity</h2>
                  <select
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className="text-sm px-3 py-1 border rounded-md shadow-sm"
                  >
                    <option value="overview">Overview</option>
                    <option value="enrollment">Enrollment</option>
                    <option value="performance">Performance</option>
                  </select>
                </div>
                <div className="h-72">
                  <ResponsiveLine
                    data={[{ id: 'activity', data: generateTimeSeriesData() }]}
                    margin={{ top: 10, right: 20, bottom: 30, left: 40 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 0, max: 100 }}
                    theme={theme}
                    enablePoints={false}
                    enableGridX={false}
                    curve="monotoneX"
                    axisBottom={{ tickRotation: -45 }}
                  />
                </div>
              </div>

              {/* Course Distribution */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Course Distribution</h2>
                <div className="h-72">
                  <ResponsivePie
                    data={generateCourseEnrollmentData()}
                    margin={{ top: 10, right: 20, bottom: 20, left: 20 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    theme={theme}
                    enableArcLinkLabels={false}
                    legends={[
                      {
                        anchor: 'bottom',
                        direction: 'row',
                        translateY: 30,
                        itemWidth: 60,
                        itemHeight: 14,
                        symbolSize: 14,
                        symbolShape: 'circle'
                      }
                    ]}
                  />
                </div>
              </div>

              {/* Recent Activity List */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
                </div>
                <div className="overflow-auto max-h-[400px]">
                  <ul className="divide-y divide-gray-200">
                    {recentActivities.map((activity) => (
                      <li key={activity.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center
                            ${activity.type === 'course' ? 'bg-blue-100 text-blue-600' :
                              activity.type === 'system' ? 'bg-yellow-100 text-yellow-600' :
                              activity.type === 'user' ? 'bg-green-100 text-green-600' :
                              'bg-purple-100 text-purple-600'}`}>
                            {activity.type === 'course' ? <Book className="h-4 w-4" /> :
                             activity.type === 'system' ? <Activity className="h-4 w-4" /> :
                             activity.type === 'user' ? <UsersIcon className="h-4 w-4" /> :
                             <BarChart2 className="h-4 w-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                            <p className="text-sm text-gray-500">{activity.action}</p>
                          </div>
                          <div className="text-sm text-gray-500">{activity.timestamp}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h2>
                <div className="h-72">
                  <ResponsiveBar
                    data={[
                      { metric: 'Completion', value: 85 },
                      { metric: 'Engagement', value: 72 },
                      { metric: 'Satisfaction', value: 90 },
                      { metric: 'Progress', value: 68 }
                    ]}
                    keys={['value']}
                    indexBy="metric"
                    margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                    padding={0.3}
                    theme={theme}
                    axisBottom={{ tickRotation: -45 }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modals */}
      {activeModal && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title={modalTitles[activeModal]}
        >
          {modalComponents[activeModal]}
        </Modal>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
