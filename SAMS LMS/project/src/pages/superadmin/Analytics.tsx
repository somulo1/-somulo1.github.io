import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { Calendar, BarChart2, Users, Book } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week');

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

  const stats = [
    {
      name: 'Active Users',
      value: '2,543',
      change: '+12%',
      icon: Users,
    },
    {
      name: 'Course Completion',
      value: '85%',
      change: '+5%',
      icon: Book,
    },
    {
      name: 'System Usage',
      value: '95%',
      change: '+3%',
      icon: BarChart2,
    },
    {
      name: 'Daily Sessions',
      value: '1,234',
      change: '+15%',
      icon: Calendar,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">System Analytics</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="day">Last 24 Hours</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-medium text-gray-900 mb-4">User Activity</h2>
          <div className="h-80">
            <ResponsiveLine
              data={[
                {
                  id: 'activity',
                  data: [
                    { x: 'Mon', y: 23 },
                    { x: 'Tue', y: 45 },
                    { x: 'Wed', y: 32 },
                    { x: 'Thu', y: 56 },
                    { x: 'Fri', y: 47 },
                    { x: 'Sat', y: 28 },
                    { x: 'Sun', y: 19 }
                  ]
                }
              ]}
              margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
              theme={theme}
              curve="cardinal"
              enablePoints={true}
              enableGridX={false}
            />
          </div>
        </div>

        {/* Resource Usage Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Resource Usage</h2>
          <div className="h-80">
            <ResponsiveBar
              data={[
                { resource: 'Storage', usage: 75 },
                { resource: 'Bandwidth', usage: 62 },
                { resource: 'CPU', usage: 45 },
                { resource: 'Memory', usage: 83 }
              ]}
              keys={['usage']}
              indexBy="resource"
              margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
              padding={0.3}
              theme={theme}
              labelSkipWidth={12}
              labelSkipHeight={12}
            />
          </div>
        </div>

        {/* User Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-medium text-gray-900 mb-4">User Distribution</h2>
          <div className="h-80">
            <ResponsivePie
              data={[
                { id: 'Students', value: 65 },
                { id: 'Instructors', value: 20 },
                { id: 'Admins', value: 10 },
                { id: 'Others', value: 5 }
              ]}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              theme={theme}
            />
          </div>
        </div>

        {/* Access Patterns Heatmap */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Access Patterns</h2>
          <div className="h-80">
            <ResponsiveHeatMap
              data={[
                { id: 'MON', data: Array.from({ length: 24 }, (_, i) => ({ x: i, y: Math.random() * 100 })) },
                { id: 'TUE', data: Array.from({ length: 24 }, (_, i) => ({ x: i, y: Math.random() * 100 })) },
                { id: 'WED', data: Array.from({ length: 24 }, (_, i) => ({ x: i, y: Math.random() * 100 })) }
              ]}
              margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
