

// EmpWorkload.js
// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Button } from '@mui/material';

// // Helper function to determine workload status
// const getWorkloadStatus = (totalHours, calculateEstimatedHours) => {
//   return totalHours > calculateEstimatedHours ? 'Work Overload' : 'Work Balanced';
// };

// const TaskComparisonChart = ({ calculateEstimatedHours, totalHours }) => {
//   // Verify if the props are received correctly
//   console.log('Estimated Hours:', calculateEstimatedHours);
//   console.log('Total Hours:', totalHours);

//   // Example Chart Data
//   const data = {
//     labels: ['Estimated Hours', 'Total Hours'],
//     datasets: [
//       {
//         label: 'Hours',
//         data: [calculateEstimatedHours, totalHours],
//         backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
//         borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Determine workload status
//   const status = getWorkloadStatus(totalHours, calculateEstimatedHours);

//   return (
//     <div>
//       <h2>Work load Comparison Chart</h2>

//       <Bar data={data} />

//       {/* Display status in a small rounded button */}
//       <div style={{ marginTop: '20px', textAlign: 'center' }}>
//         <Button
//           variant="contained"
//           color={status === 'Work Overload' ? 'error' : 'success'}
//           style={{ borderRadius: '20px', padding: '10px 20px' }}
//         >
//           {status}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default TaskComparisonChart;

// TaskComparisonChart.js
// TaskComparisonChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const TaskComparisonChart = ({ calculateEstimatedHours, totalHours }) => {
  // Example data
  const data = [
    { name: 'Estimated Hours', value: calculateEstimatedHours },
    { name: 'Total Hours', value: totalHours }
  ];

  // Conditional styling based on hours comparison
  const isWorkBalanced = totalHours < calculateEstimatedHours;

  // Debugging data
  console.log('Chart Data:', data);

  return (
    <div style={{ height: '400px', width: '100%', position: 'relative' }}>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill={isWorkBalanced ? '#82ca9d' : '#ff6347'} />
      </BarChart>

      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: isWorkBalanced ? '#82ca9d' : '#ff6347',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '20px',
        fontWeight: 'bold'
      }}>
        {isWorkBalanced ? 'Work Balanced' : 'Work Overload'}
      </div>
    </div>
  );
};

export default TaskComparisonChart;
