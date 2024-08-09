import React from 'react'
import NavbarHome from '../share/NavbarHome'
import { Box, SimpleGrid, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {

    const style = {
        backgroundColor: '#E9D280',
        minHeight: '100vh', // Ensure the background color covers the full viewport height
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
      };

  return (
    <>
    <NavbarHome />
     <div style={style}>
     <Box p={5}>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={5}>
        
        <Stat>
          <StatLabel>Sales</StatLabel>
          <StatNumber>$12,345</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            9.05%
          </StatHelpText>
        </Stat>
        
        <Stat>
          <StatLabel>Revenue</StatLabel>
          <StatNumber>$45,678</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            14.44%
          </StatHelpText>
        </Stat>
      </SimpleGrid>
      <Box mt={10}>
        {/*<Text fontSize="2xl" mb={5}>Monthly Data</Text>*/}
        <Line data={data} options={options} />
      </Box>
    </Box>

   
    
    </div>
    </>
  )
}

export default Dashboard