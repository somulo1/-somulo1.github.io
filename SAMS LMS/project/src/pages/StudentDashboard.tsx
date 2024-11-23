import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { useAuthStore } from '../store/authStore';
import {
  Home,
  BookOpen,
  Calendar,
  MessageCircle,
  Bell,
  FileText,
  Settings,
  HelpCircle,
  GraduationCap,
  Book,
  Award,
  Clock
} from 'lucide-react';
import Modal from '../components/Modal';

// Data generators
const generateGradeData = () => [
  { subject: 'Mathematics', score: 85, classAverage: 78 },
  { subject: 'Science', score: 92, classAverage: 80 },
  { subject: 'English', score: 88, classAverage: 82 },
  { subject: 'History', score: 90, classAverage: 85 }
];

const generateProgressData = () => [
  {
    id: 'Learning Progress',
    data: Array.from({ length: 10 }, (_, i) => ({
      x: `Week ${i + 1}`,
      y: Math.floor(Math.random() * 20) + 70
    }))
  }
];

interface SidebarItem {
  id: string;
  icon: React.ElementType;
  label: string;
}

const sidebarItems: SidebarItem[] = [
  { id: 'overview', icon: Home, label: 'Dashboard' },
  { id: 'courses', icon: BookOpen, label: 'My Courses' },
  { id: 'assignments', icon: FileText, label: 'Assignments' },
  { id: 'grades', icon: Award, label: 'Grades' },
  { id: 'schedule', icon: Calendar, label: 'Schedule' },
  { id: 'resources', icon: Book, label: 'Resources' },
  { id: 'messages', icon: MessageCircle, label: 'Messages' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'progress', icon: GraduationCap, label: 'Progress' },
  { id: 'attendance', icon: Clock, label: 'Attendance' },
  { id: 'settings', icon: Settings, label: 'Settings' },
  { id: 'help', icon: HelpCircle, label: 'Help' },
];

const StudentDashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [selectedView, setSelectedView] = useState('overview');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSidebarItemClick = (itemId: string) => {
    setSelectedView(itemId);
    if (itemId !== 'overview') {
      setActiveModal(itemId);
      setIsModalOpen(true);
    }
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'courses':
        return (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="My Courses" size="2xl">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Course cards */}
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center mb-4">
                      <BookOpen className="w-6 h-6 text-indigo-600 mr-2" />
                      <h3 className="text-lg font-semibold">Course {index + 1}</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Instructor: Dr. Smith</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500">75% Complete</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        );

      case 'assignments':
        return (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Assignments" size="2xl">
            <div className="p-6">
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Assignment {index + 1}</h3>
                        <p className="text-sm text-gray-600 mb-2">Due Date: {new Date().toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        index % 3 === 0 ? 'bg-green-100 text-green-800' :
                        index % 3 === 1 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {index % 3 === 0 ? 'Completed' :
                         index % 3 === 1 ? 'In Progress' :
                         'Due Soon'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        );

      case 'grades':
        return (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Grades" size="2xl">
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Current Semester</h3>
                  <div className="text-2xl font-bold text-indigo-600">GPA: 3.8</div>
                </div>
                <div className="space-y-4">
                  {generateGradeData().map((subject, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{subject.subject}</h4>
                        <span className="text-lg font-bold text-indigo-600">{subject.score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${subject.score}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">Class Average: {subject.classAverage}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {selectedView === 'overview' && (
          <div className="p-6 space-y-6 mr-64"> {/* Added right margin to accommodate sidebar */}
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">GPA</h3>
                <p className="text-3xl font-bold text-indigo-600">3.8</p>
                <p className="text-sm text-gray-500">↑ 0.2 from last semester</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Course Progress</h3>
                <p className="text-3xl font-bold text-green-600">75%</p>
                <p className="text-sm text-gray-500">Average across all courses</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Due Assignments</h3>
                <p className="text-3xl font-bold text-yellow-600">4</p>
                <p className="text-sm text-gray-500">This week</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Study Hours</h3>
                <p className="text-3xl font-bold text-purple-600">28</p>
                <p className="text-sm text-gray-500">Last 7 days</p>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Grade Comparison */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Subject Performance</h2>
                <div className="h-80">
                  <ResponsiveBar
                    data={generateGradeData()}
                    keys={['score', 'classAverage']}
                    indexBy="subject"
                    groupMode="grouped"
                    margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
                    padding={0.3}
                    theme={theme}
                    colors={['#4F46E5', '#94A3B8']}
                    axisBottom={{ tickRotation: -45 }}
                  />
                </div>
              </div>

              {/* Progress Line Graph */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
                <div className="h-80">
                  <ResponsiveLine
                    data={generateProgressData()}
                    margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 0, max: 100 }}
                    axisTop={null}
                    axisRight={null}
                    pointSize={10}
                    pointColor="#ffffff"
                    pointBorderWidth={2}
                    pointBorderColor="#4F46E5"
                    pointLabelYOffset={-12}
                    useMesh={true}
                    theme={theme}
                    colors={['#4F46E5']}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Content */}
        <div 
  className={`fixed inset-0 ${isModalOpen ? 'block' : 'hidden'}`} 
  style={{ marginLeft: '256px' }}
>
  {renderModalContent()}
</div>

      </div>

      {/* Right Sidebar - Fixed Position */}
      <div className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col shadow-lg">

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">SAMS LMS</h2>
          <p className="text-sm text-gray-500 mt-1">Student Portal</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSidebarItemClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  selectedView === item.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
              {user?.name?.charAt(0) || 'S'}
            </div>
            <div>
              <p className="font-medium text-gray-800">{user?.name || 'Student'}</p>
              <p className="text-sm text-gray-500">Student</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
