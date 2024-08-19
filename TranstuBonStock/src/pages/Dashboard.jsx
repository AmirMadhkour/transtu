import React from 'react';
import NavbarHome from '../share/NavbarHome';
import { Box, SimpleGrid, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {

  const style = {
    backgroundColor: '#E9D280',
    minHeight: '77vh',
    padding: '10px', // Reduce padding
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: '#0B7B16',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      },
    },
    maintainAspectRatio: false, // Allows the chart to resize proportionally
  };

  return (
    <>
      <NavbarHome />
      <div style={style}>
        <Box p={3}> {/* Reduce padding */}
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={3}> {/* Reduce spacing */}
            
            <Stat>
              <StatLabel fontSize="sm">Sales</StatLabel> {/* Smaller font size */}
              <StatNumber fontSize="lg">$12,345</StatNumber> {/* Smaller font size */}
              <StatHelpText fontSize="sm">
                <StatArrow type="decrease" />
                9.05%
              </StatHelpText>
            </Stat>
            
            <Stat>
              <StatLabel fontSize="sm">Revenue</StatLabel> {/* Smaller font size */}
              <StatNumber fontSize="lg">$45,678</StatNumber> {/* Smaller font size */}
              <StatHelpText fontSize="sm">
                <StatArrow type="increase" />
                14.44%
              </StatHelpText>
            </Stat>
          </SimpleGrid>
          <Box mt={8} height="300px"> {/* Reduce the height of the chart */}
            <Line data={data} options={options} />
          </Box>
        </Box>
      </div>
    </>
  );
}

export default Dashboard;
