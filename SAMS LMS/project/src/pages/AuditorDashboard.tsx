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
import { FileText, BarChart2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const stats = [
  { name: 'Reports Generated', value: '24', icon: FileText },
  { name: 'System Metrics', value: '156', icon: BarChart2 },
  { name: 'Issues Found', value: '3', icon: AlertCircle },
  { name: 'Compliance Score', value: '98%', icon: CheckCircle },
];

// Mock data generators for audit-specific metrics
const generateComplianceData = () => [
  { category: 'Content Standards', compliant: 85, nonCompliant: 15 },
  { category: 'Access Controls', compliant: 92, nonCompliant: 8 },
  { category: 'Data Privacy', compliant: 95, nonCompliant: 5 },
  { category: 'User Permissions', compliant: 88, nonCompliant: 12 }
];

const generateAuditTimelineData = () => ({
  nodes: [
    { id: 'Initial Review' },
    { id: 'Documentation' },
    { id: 'Compliance Check' },
    { id: 'Risk Assessment' },
    { id: 'Final Report' }
  ],
  links: [
    { source: 'Initial Review', target: 'Documentation', value: 20 },
    { source: 'Documentation', target: 'Compliance Check', value: 15 },
    { source: 'Compliance Check', target: 'Risk Assessment', value: 10 },
    { source: 'Risk Assessment', target: 'Final Report', value: 8 }
  ]
});

const generateRiskAssessmentData = () => [
  { risk: 'Data Security', level: 2, impact: 8, frequency: 15 },
  { risk: 'Access Control', level: 3, impact: 7, frequency: 12 },
  { risk: 'Content Quality', level: 1, impact: 5, frequency: 20 },
  { risk: 'User Privacy', level: 4, impact: 9, frequency: 8 }
];

const AuditorDashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);
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
      {/* Header with View Selector */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Audit Analytics Dashboard</h1>
        <select
          value={selectedView}
          onChange={(e) => setSelectedView(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="overview">Overview</option>
          <option value="compliance">Compliance Metrics</option>
          <option value="risk">Risk Assessment</option>
          <option value="timeline">Audit Timeline</option>
        </select>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Overall Compliance</h3>
          <p className="text-3xl font-bold text-green-600">92%</p>
          <p className="text-sm text-gray-500">↑ 3% from last audit</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Risk Score</h3>
          <p className="text-3xl font-bold text-yellow-600">Low</p>
          <p className="text-sm text-gray-500">Improved from Medium</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Open Findings</h3>
          <p className="text-3xl font-bold text-red-600">5</p>
          <p className="text-sm text-gray-500">↓ 2 from last month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Days to Next Audit</h3>
          <p className="text-3xl font-bold text-blue-600">45</p>
          <p className="text-sm text-gray-500">Preparation: 80% complete</p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Compliance Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Compliance by Category</h2>
          <div className="h-80">
            <ResponsiveBar
              data={generateComplianceData()}
              keys={['compliant', 'nonCompliant']}
              indexBy="category"
              margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
              padding={0.3}
              groupMode="grouped"
              theme={theme}
              axisBottom={{ tickRotation: -45 }}
            />
          </div>
        </div>

        {/* Risk Assessment Scatter Plot */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Risk Assessment Matrix</h2>
          <div className="h-80">
            <ResponsiveScatterPlot
              data={[{
                id: 'risks',
                data: generateRiskAssessmentData().map(d => ({
                  x: d.impact,
                  y: d.level,
                  size: d.frequency
                }))
              }]}
              margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
              xScale={{ type: 'linear', min: 0, max: 10 }}
              yScale={{ type: 'linear', min: 0, max: 5 }}
              axisBottom={{ legend: 'Impact' }}
              axisLeft={{ legend: 'Risk Level' }}
              theme={theme}
            />
          </div>
        </div>

        {/* Audit Timeline Sankey */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Audit Process Flow</h2>
          <div className="h-80">
            <ResponsiveSankey
              data={generateAuditTimelineData()}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              theme={theme}
              nodeOpacity={1}
              linkOpacity={0.5}
            />
          </div>
        </div>

        {/* Compliance Radar */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Department Compliance Metrics</h2>
          <div className="h-80">
            <ResponsiveRadar
              data={[
                { metric: 'Documentation', IT: 90, HR: 85, Finance: 95 },
                { metric: 'Access Control', IT: 95, HR: 90, Finance: 92 },
                { metric: 'Data Privacy', IT: 88, HR: 92, Finance: 90 },
                { metric: 'Training', IT: 85, HR: 88, Finance: 86 }
              ]}
              keys={['IT', 'HR', 'Finance']}
              indexBy="metric"
              maxValue={100}
              margin={{ top: 20, right: 60, bottom: 20, left: 60 }}
              theme={theme}
              gridShape="circular"
            />
          </div>
        </div>

        {/* Findings Tree Map */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Audit Findings Distribution</h2>
          <div className="h-80">
            <ResponsiveTreeMap
              data={{
                name: 'findings',
                children: [
                  { name: 'Critical', loc: 2 },
                  { name: 'High', loc: 3 },
                  { name: 'Medium', loc: 8 },
                  { name: 'Low', loc: 12 }
                ]
              }}
              identity="name"
              value="loc"
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              theme={theme}
            />
          </div>
        </div>

        {/* Time-based Heatmap */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Compliance Check Frequency</h2>
          <div className="h-80">
            <ResponsiveHeatMap
              data={[
                { id: 'Q1', data: [{ x: 'Jan', y: 45 }, { x: 'Feb', y: 55 }, { x: 'Mar', y: 65 }] },
                { id: 'Q2', data: [{ x: 'Apr', y: 35 }, { x: 'May', y: 45 }, { x: 'Jun', y: 55 }] },
                { id: 'Q3', data: [{ x: 'Jul', y: 25 }, { x: 'Aug', y: 35 }, { x: 'Sep', y: 45 }] },
                { id: 'Q4', data: [{ x: 'Oct', y: 15 }, { x: 'Nov', y: 25 }, { x: 'Dec', y: 35 }] }
              ]}
              margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
              theme={theme}
            />
          </div>
        </div>

        {/* Network Diagram */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Compliance Dependencies</h2>
          <div className="h-80">
            <ResponsiveNetwork
              data={{
                nodes: [
                  { id: 'Policy', radius: 8 },
                  { id: 'Training', radius: 8 },
                  { id: 'Monitoring', radius: 8 },
                  { id: 'Reporting', radius: 8 }
                ],
                links: [
                  { source: 'Policy', target: 'Training', distance: 50 },
                  { source: 'Training', target: 'Monitoring', distance: 50 },
                  { source: 'Monitoring', target: 'Reporting', distance: 50 }
                ]
              }}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              linkDistance={link => link.distance}
              theme={theme}
            />
          </div>
        </div>

        {/* Bubble Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Risk Impact Analysis</h2>
          <div className="h-80">
            <ResponsiveCirclePacking
              data={{
                name: 'risks',
                children: [
                  { name: 'Security', value: 35, color: 'red' },
                  { name: 'Compliance', value: 25, color: 'blue' },
                  { name: 'Operations', value: 20, color: 'green' },
                  { name: 'Financial', value: 15, color: 'orange' }
                ]
              }}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              identity="name"
              value="value"
              theme={theme}
            />
          </div>
        </div>

        {/* Box Plot */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Compliance Score Distribution</h2>
          <div className="h-80">
            <ResponsiveBoxPlot
              data={[
                {
                  group: 'Q1',
                  subgroup: '2024',
                  value: Array.from({ length: 50 }, () => Math.floor(Math.random() * 30) + 70)
                },
                {
                  group: 'Q2',
                  subgroup: '2024',
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
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">External Auditor Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome back, {user?.name}</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((item) => (
                <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                          <dd className="text-lg font-semibold text-gray-900">{item.value}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditorDashboard;