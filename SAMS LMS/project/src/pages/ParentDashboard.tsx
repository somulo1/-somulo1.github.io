import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { ResponsiveStream } from '@nivo/stream';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { ResponsiveNetwork } from '@nivo/network';
import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import { ResponsiveSankey } from '@nivo/sankey';
import { ResponsiveBoxPlot } from '@nivo/boxplot';
import { ResponsiveRadar } from '@nivo/radar';
import { useAuthStore } from '../store/authStore';

// Mock data generators for student performance metrics
const generateGradeData = () => [
  { subject: 'Mathematics', current: 85, average: 78 },
  { subject: 'Science', current: 92, average: 80 },
  { subject: 'English', current: 88, average: 82 },
  { subject: 'History', current: 90, average: 85 }
];

const generateAttendanceData = () => [
  { month: 'Jan', present: 20, absent: 2, late: 1 },
  { month: 'Feb', present: 18, absent: 1, late: 2 },
  { month: 'Mar', present: 21, absent: 0, late: 1 },
  { month: 'Apr', present: 19, absent: 1, late: 2 }
];

const generateProgressData = () => [
  {
    id: 'Progress',
    data: [
      { x: 'Week 1', y: 75 },
      { x: 'Week 2', y: 80 },
      { x: 'Week 3', y: 85 },
      { x: 'Week 4', y: 88 }
    ]
  }
];

const ParentDashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [selectedChild, setSelectedChild] = useState('John'); // Mock selected child
  const [selectedView, setSelectedView] = useState('overview');

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

  return (
    <div className="p-6 space-y-6">
      {/* Header with Child Selector */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Parent Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        <select
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="John">John Smith</option>
          <option value="Emma">Emma Smith</option>
        </select>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Overall Grade</h3>
          <p className="text-3xl font-bold text-green-600">A-</p>
          <p className="text-sm text-gray-500">↑ from B+ last semester</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Attendance Rate</h3>
          <p className="text-3xl font-bold text-blue-600">95%</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Assignments Due</h3>
          <p className="text-3xl font-bold text-yellow-600">3</p>
          <p className="text-sm text-gray-500">This week</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Course Progress</h3>
          <p className="text-3xl font-bold text-purple-600">78%</p>
          <p className="text-sm text-gray-500">Average across all courses</p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Grade Comparison Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Subject Performance</h2>
          <div className="h-80">
            <ResponsiveBar
              data={generateGradeData()}
              keys={['current', 'average']}
              indexBy="subject"
              groupMode="grouped"
              margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
              padding={0.3}
              theme={theme}
              axisBottom={{ tickRotation: -45 }}
            />
          </div>
        </div>

        {/* Attendance Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Monthly Attendance</h2>
          <div className="h-80">
            <ResponsivePie
              data={[
                { id: 'Present', value: 90, color: 'green' },
                { id: 'Absent', value: 5, color: 'red' },
                { id: 'Late', value: 5, color: 'yellow' }
              ]}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              innerRadius={0.5}
              theme={theme}
            />
          </div>
        </div>

        {/* Progress Line Graph */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
          <div className="h-80">
            <ResponsiveLine
              data={generateProgressData()}
              margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
              xScale={{ type: 'point' }}
              yScale={{ type: 'linear', min: 0, max: 100 }}
              theme={theme}
              curve="cardinal"
            />
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Study Time Distribution</h2>
          <div className="h-80">
            <ResponsiveHeatMap
              data={[
                { id: 'MON', data: [{ x: 'Math', y: 3 }, { x: 'Science', y: 2 }, { x: 'English', y: 1 }] },
                { id: 'TUE', data: [{ x: 'Math', y: 2 }, { x: 'Science', y: 3 }, { x: 'English', y: 2 }] },
                { id: 'WED', data: [{ x: 'Math', y: 1 }, { x: 'Science', y: 2 }, { x: 'English', y: 3 }] }
              ]}
              margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
              theme={theme}
            />
          </div>
        </div>

        {/* Performance Scatter Plot */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Time vs. Performance</h2>
          <div className="h-80">
            <ResponsiveScatterPlot
              data={[{
                id: 'performance',
                data: [
                  { x: 1, y: 85 },
                  { x: 2, y: 88 },
                  { x: 3, y: 92 },
                  { x: 4, y: 90 }
                ]
              }]}
              margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
              xScale={{ type: 'linear', min: 0, max: 5 }}
              yScale={{ type: 'linear', min: 0, max: 100 }}
              axisBottom={{ legend: 'Study Hours' }}
              axisLeft={{ legend: 'Score' }}
              theme={theme}
            />
          </div>
        </div>

        {/* Course Tree Map */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Course Time Distribution</h2>
          <div className="h-80">
            <ResponsiveTreeMap
              data={{
                name: 'courses',
                children: [
                  { name: 'Mathematics', loc: 25 },
                  { name: 'Science', loc: 20 },
                  { name: 'English', loc: 18 },
                  { name: 'History', loc: 15 }
                ]
              }}
              identity="name"
              value="loc"
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              theme={theme}
            />
          </div>
        </div>

        {/* Skills Radar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Skills Assessment</h2>
          <div className="h-80">
            <ResponsiveRadar
              data={[
                { skill: 'Problem Solving', value: 85 },
                { skill: 'Critical Thinking', value: 90 },
                { skill: 'Communication', value: 88 },
                { skill: 'Teamwork', value: 92 },
                { skill: 'Research', value: 85 }
              ].map(item => ({
                skill: item.skill,
                [selectedChild]: item.value,
                average: item.value - 10
              }))}
              keys={[selectedChild, 'average']}
              indexBy="skill"
              maxValue={100}
              margin={{ top: 20, right: 60, bottom: 20, left: 60 }}
              theme={theme}
            />
          </div>
        </div>

        {/* Assignment Timeline */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Assignment Timeline</h2>
          <div className="h-80">
            <ResponsiveStream
              data={[
                {
                  "Completed": 5,
                  "In Progress": 3,
                  "Upcoming": 4,
                  "date": "Week 1"
                },
                {
                  "Completed": 6,
                  "In Progress": 2,
                  "Upcoming": 3,
                  "date": "Week 2"
                },
                {
                  "Completed": 4,
                  "In Progress": 4,
                  "Upcoming": 5,
                  "date": "Week 3"
                }
              ]}
              keys={["Completed", "In Progress", "Upcoming"]}
              margin={{ top: 20, right: 20, bottom: 30, left: 50 }}
              axisBottom={{ legend: "Timeline" }}
              axisLeft={{ legend: "Number of Assignments" }}
              theme={theme}
            />
          </div>
        </div>

        {/* Grade Distribution Box Plot */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Grade Distribution</h2>
          <div className="h-80">
            <ResponsiveBoxPlot
              data={[
                {
                  group: "Mathematics",
                  subgroup: "Current",
                  value: Array.from({ length: 50 }, () => Math.floor(Math.random() * 30) + 70)
                },
                {
                  group: "Science",
                  subgroup: "Current",
                  value: Array.from({ length: 50 }, () => Math.floor(Math.random() * 30) + 65)
                }
              ]}
              margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
              padding={0.3}
              theme={theme}
              valueScale={{ type: 'linear', min: 0, max: 100 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;