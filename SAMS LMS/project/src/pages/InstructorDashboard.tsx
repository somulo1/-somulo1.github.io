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

// Mock data generators for instructor-specific metrics
const generateCoursePerformanceData = () => [
  { course: 'Introduction to Programming', completion: 85, engagement: 78, satisfaction: 90 },
  { course: 'Data Structures', completion: 75, engagement: 82, satisfaction: 85 },
  { course: 'Algorithms', completion: 70, engagement: 75, satisfaction: 88 },
  { course: 'Web Development', completion: 88, engagement: 85, satisfaction: 92 }
];

const generateStudentProgressData = () => [
  {
    id: 'Average Progress',
    data: Array.from({ length: 10 }, (_, i) => ({
      x: `Week ${i + 1}`,
      y: Math.floor(Math.random() * 20) + 70
    }))
  }
];

const generateAssignmentData = () => ({
  nodes: [
    { id: 'Course 1', group: 'course' },
    { id: 'Course 2', group: 'course' },
    { id: 'Student A', group: 'student' },
    { id: 'Student B', group: 'student' },
    { id: 'Student C', group: 'student' }
  ],
  links: [
    { source: 'Course 1', target: 'Student A', value: 1 },
    { source: 'Course 1', target: 'Student B', value: 1 },
    { source: 'Course 2', target: 'Student B', value: 1 },
    { source: 'Course 2', target: 'Student C', value: 1 }
  ]
});

const InstructorDashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [selectedCourse, setSelectedCourse] = useState('all');

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
      {/* Header with Course Selector */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Instructor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Courses</option>
          <option value="intro">Introduction to Programming</option>
          <option value="data">Data Structures</option>
          <option value="algo">Algorithms</option>
        </select>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Total Students</h3>
          <p className="text-3xl font-bold text-green-600">248</p>
          <p className="text-sm text-gray-500">↑ 12 from last semester</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Average Grade</h3>
          <p className="text-3xl font-bold text-blue-600">B+</p>
          <p className="text-sm text-gray-500">Across all courses</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Course Completion</h3>
          <p className="text-3xl font-bold text-yellow-600">82%</p>
          <p className="text-sm text-gray-500">Average rate</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Active Assignments</h3>
          <p className="text-3xl font-bold text-purple-600">15</p>
          <p className="text-sm text-gray-500">Across all courses</p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Course Performance Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Course Performance Metrics</h2>
          <div className="h-80">
            <ResponsiveBar
              data={generateCoursePerformanceData()}
              keys={['completion', 'engagement', 'satisfaction']}
              indexBy="course"
              groupMode="grouped"
              margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
              padding={0.3}
              theme={theme}
              axisBottom={{ tickRotation: -45 }}
            />
          </div>
        </div>

        {/* Student Distribution Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Grade Distribution</h2>
          <div className="h-80">
            <ResponsivePie
              data={[
                { id: 'A', value: 30 },
                { id: 'B', value: 40 },
                { id: 'C', value: 20 },
                { id: 'D', value: 8 },
                { id: 'F', value: 2 }
              ]}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              innerRadius={0.5}
              theme={theme}
            />
          </div>
        </div>

        {/* Student Progress Line Graph */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Student Progress Trends</h2>
          <div className="h-80">
            <ResponsiveLine
              data={generateStudentProgressData()}
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
          <h2 className="text-xl font-semibold mb-4">Student Activity Patterns</h2>
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

        {/* Performance Correlation Scatter Plot */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Engagement vs. Performance</h2>
          <div className="h-80">
            <ResponsiveScatterPlot
              data={[{
                id: 'correlation',
                data: Array.from({ length: 30 }, () => ({
                  x: Math.floor(Math.random() * 100),
                  y: Math.floor(Math.random() * 100)
                }))
              }]}
              margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
              xScale={{ type: 'linear', min: 0, max: 100 }}
              yScale={{ type: 'linear', min: 0, max: 100 }}
              axisBottom={{ legend: 'Engagement Score' }}
              axisLeft={{ legend: 'Performance Score' }}
              theme={theme}
            />
          </div>
        </div>

        {/* Course Content Tree Map */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Content Usage Analysis</h2>
          <div className="h-80">
            <ResponsiveTreeMap
              data={{
                name: 'content',
                children: [
                  { name: 'Lectures', loc: 40 },
                  { name: 'Assignments', loc: 25 },
                  { name: 'Quizzes', loc: 20 },
                  { name: 'Projects', loc: 15 }
                ]
              }}
              identity="name"
              value="loc"
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              theme={theme}
            />
          </div>
        </div>

        {/* Student-Course Network */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Student-Course Network</h2>
          <div className="h-80">
            <ResponsiveNetwork
              data={generateAssignmentData()}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              linkDistance={80}
              centeringStrength={0.3}
              repulsivity={6}
              nodeSize={8}
              activeNodeSize={10}
              theme={theme}
            />
          </div>
        </div>

        {/* Assignment Timeline Stream */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Assignment Submission Flow</h2>
          <div className="h-80">
            <ResponsiveStream
              data={[
                { Submitted: 20, "In Progress": 15, "Not Started": 5, Week: 1 },
                { Submitted: 25, "In Progress": 10, "Not Started": 5, Week: 2 },
                { Submitted: 30, "In Progress": 8, "Not Started": 2, Week: 3 }
              ]}
              keys={["Submitted", "In Progress", "Not Started"]}
              margin={{ top: 20, right: 20, bottom: 30, left: 50 }}
              theme={theme}
            />
          </div>
        </div>

        {/* Course Effectiveness Radar */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Course Effectiveness</h2>
          <div className="h-80">
            <ResponsiveRadar
              data={[
                { metric: "Content Quality", value: 85, benchmark: 75 },
                { metric: "Student Engagement", value: 90, benchmark: 80 },
                { metric: "Learning Outcomes", value: 88, benchmark: 85 },
                { metric: "Assignment Quality", value: 92, benchmark: 80 },
                { metric: "Student Satisfaction", value: 87, benchmark: 75 }
              ]}
              keys={["value", "benchmark"]}
              indexBy="metric"
              maxValue={100}
              margin={{ top: 20, right: 60, bottom: 20, left: 60 }}
              theme={theme}
            />
          </div>
        </div>

        {/* Grade Distribution Box Plot */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Assignment Score Distribution</h2>
          <div className="h-80">
            <ResponsiveBoxPlot
              data={[
                {
                  group: "Assignment 1",
                  subgroup: "Scores",
                  value: Array.from({ length: 50 }, () => Math.floor(Math.random() * 30) + 70)
                },
                {
                  group: "Assignment 2",
                  subgroup: "Scores",
                  value: Array.from({ length: 50 }, () => Math.floor(Math.random() * 30) + 70)
                }
              ]}
              margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
              padding={0.3}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
