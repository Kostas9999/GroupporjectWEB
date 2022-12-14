import { Chart } from 'chart.js/auto'
import { getAquisitionsByYear } from './api/api'

(async function() {

  const data = await getAquisitionsByYear();

 
  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'line',
      options: {
        animation: true,
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            enabled: true
          }
        }
      },
      data: {
        labels: data.map(row => row.Created),
        datasets: [
          {
            label: 'Local Latency',   
            type: 'line',           
            data: data.map(row => row.localLatency),
            borderColor: '#36A2EB',
      backgroundColor: '#9BD0F5',           
          },
          {
            label: 'Public Latency',   
            type: 'line',           
            data: data.map(row => row.publicLatency),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)'           
          },
          
         
        ]
      }
    }
  );



  new Chart(
    document.getElementById('acquisitions2'),
    {
      type: 'line',
      options: {
        animation: true,
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            enabled: true
          }
        }
      },
      data: {
        labels: data.map(row => row.Created),
        datasets: [
          {
            label: 'Data Sent (tx)',   
            type: 'line',           
            data: data.map(row => row.tx_total),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 1)'          
          },
          {
            label: 'Data Received (rx)',   
            type: 'bar',           
            data: data.map(row => row.rx_total),
            borderColor: '#36A2EB',
            backgroundColor: '#9BD0F5',           
          },
          
         
        ]
      }
    }
  );






})();
