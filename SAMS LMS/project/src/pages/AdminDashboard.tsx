import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import { 
  Bell, 
  Menu,
  Home,
  BookOpen,
  Users,
  Calendar as CalendarIcon,
  BarChart2,
  MessageSquare,
  Settings as SettingsIcon,
  HelpCircle
} from 'lucide-react';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import Help from '../components/features/Help';
import Messages from '../components/features/Messages';
import Settings from '../components/features/Settings';
import Calendar from '../components/features/Calendar';

// Mock data generators
const generateTimeData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return days.map(day => ({
    id: day,
    data: hours.map(hour => ({
      x: `${hour}h`,
      y: Math.floor(Math.random() * 100)
    }))
  }));
};

const generateStreamData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    CS: Math.floor(Math.random() * 50) + 50,
    Business: Math.floor(Math.random() * 40) + 40,
    Engineering: Math.floor(Math.random() * 30) + 30
  }));
};

const generateBoxPlotData = () => [
  {
    group: 'CS101',
    subgroup: 'A',
    value: Array.from({ length: 50 }, () => Math.floor(Math.random() * 30) + 70)
  },
  {
    group: 'BUS200',
    subgroup: 'A',
    value: Array.from({ length: 50 }, () => Math.floor(Math.random() * 30) + 65)
  },
  {
    group: 'ENG150',
    subgroup: 'A',
    value: Array.from({ length: 50 }, () => Math.floor(Math.random() * 30) + 75)
  }
];

const AdminDashboard: React.FC = () => {
  const [selectedView, setSelectedView] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Quick stats data
  const quickStats = [
    { id: 1, name: 'Total Students', stat: '1,234', change: '12%', changeType: 'increase' },
    { id: 2, name: 'Active Courses', stat: '56', change: '8%', changeType: 'increase' },
    { id: 3, name: 'Completion Rate', stat: '92%', change: '5%', changeType: 'increase' },
    { id: 4, name: 'Total Revenue', stat: '$124.5K', change: '15%', changeType: 'increase' },
  ];

  const handleSidebarItemClick = (itemId: string) => {
    setSelectedView(itemId);
    if (itemId !== 'overview') {
      setActiveModal(itemId);
      setIsModalOpen(true);
    } else {
      setActiveModal(null);
    }
  };

  // Sidebar navigation items
  const sidebarItems = [
    { id: 'overview', icon: Home, label: 'Overview' },
    { id: 'courses', icon: BookOpen, label: 'Courses' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'calendar', icon: CalendarIcon, label: 'Calendar' },
    { id: 'reports', icon: BarChart2, label: 'Reports' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
  ];

  // Common chart theme
  const theme = {
    background: '#ffffff',
    textColor: '#333333',
    fontSize: 12,
    axis: {
      domain: { line: { stroke: '#777777', strokeWidth: 1 } },
      ticks: { line: { stroke: '#777777', strokeWidth: 1 } }
    },
    grid: { line: { stroke: '#dddddd', strokeWidth: 1 } }
  };

  // Chart data
  const barData = [
    { course: 'CS101', completed: 85, ongoing: 15 },
    { course: 'BUS200', completed: 75, ongoing: 25 },
    { course: 'ENG150', completed: 90, ongoing: 10 },
    { course: 'MATH101', completed: 70, ongoing: 30 }
  ];

  const lineData = [
    {
      id: "Daily Active Users",
      data: [
        { x: "Mon", y: 150 },
        { x: "Tue", y: 180 },
        { x: "Wed", y: 210 },
        { x: "Thu", y: 190 },
        { x: "Fri", y: 170 }
      ]
    }
  ];

  const renderModalContent = () => {
    switch (activeModal) {
      case 'help':
        return (
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Help Center" size="lg">
            <div className="p-4">
              <Help />
            </div>
          </Modal>
        );
      case 'messages':
        return (
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Messages" size="xl">
            <div className="p-4">
              <Messages />
            </div>
          </Modal>
        );
      case 'settings':
        return (
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Settings" size="lg">
            <div className="p-4">
              <Settings />
            </div>
          </Modal>
        );
      case 'calendar':
        return (
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Calendar" size="2xl">
            <div className="p-4 h-[calc(100vh-200px)]">
              <Calendar />
            </div>
          </Modal>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar - Fixed at left */}
      <aside className={`fixed top-0 left-0 z-40 h-full w-64 transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onItemClick={handleSidebarItemClick}
          items={sidebarItems}
        />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col ${sidebarOpen ? 'lg:ml-64' : ''} transition-all duration-300 ease-in-out`}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md lg:hidden hover:bg-gray-100"
            >
              <Menu className="h-5 w-5 text-gray-500" />
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-500" />
              </button>
              <div className="h-8 w-8 rounded-full bg-gray-200" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {quickStats.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex flex-col">
                    <h3 className="text-sm font-medium text-gray-500">{item.name}</h3>
                    <p className="text-2xl font-semibold text-gray-900 mt-2">{item.stat}</p>
                    <p className={`text-sm mt-2 ${
                      item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ↑ {item.change} from last month
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* User Activity Chart */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">User Activity</h3>
                <div className="h-80">
                  <ResponsiveLine
                    data={lineData}
                    margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 0, max: 'auto' }}
                    curve="monotoneX"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                    }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    theme={theme}
                  />
                </div>
              </div>

              {/* Course Completion Chart */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Course Completion</h3>
                <div className="h-80">
                  <ResponsiveBar
                    data={barData}
                    keys={['completed', 'ongoing']}
                    indexBy="course"
                    margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                    padding={0.3}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={['#4F46E5', '#E5E7EB']}
                    theme={theme}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {renderModalContent()}
    </div>
  );
};

export default AdminDashboard;
