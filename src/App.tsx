
import React, { useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

interface PlayerData {
  [country: string]: {
    [player: string]: number;
  };
}

const App = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const playerData: PlayerData = {
      'India': {
        'Sachin Tendulkar': 100,
        'MS Dhoni': 110,
        'Rahul Dravid': 95,
        'Virat Kohli': 85,
        'Virender Sehwag': 120
      },
      'Australia': {
        'Steve Smith': 120,
        'David Warner': 115,
        'Glenn Maxwell': 105,
        'Pat Cummins': 95,
        'Mitchell Starc': 125
      },
      'South Africa': {
        'AB de Villiers': 90,
        'Faf du Plessis': 105,
        'Kagiso Rabada': 100,
        'Quinton de Kock': 90,
        'Imran Tahir': 115
      },
      'Bangladesh': {
        'Shakib Al Hasan': 110,
        'Mushfiqur Rahim': 125,
        'Tamim Iqbal': 115,
        'Mashrafe Mortaza': 100,
        'Mustafizur Rahman': 130
      },
      'Sri Lanka': {
        'Kumar Sangakkara': 130,
        'Mahela Jayawardene': 135,
        'Lasith Malinga': 120,
        'Angelo Mathews': 110,
        'Muttiah Muralitharan': 140
      },
      'England': {
        'Joe Root': 115,
        'Ben Stokes': 130,
        'Jofra Archer': 110,
        'Stuart Broad': 125,
        'Eoin Morgan': 135
      }
    };

    const countries = Object.keys(playerData);
    const maxPlayers = Math.max(...countries.map(country => Object.keys(playerData[country]).length));
    const players: string[] = [];
    
    // Generate players list based on the maximum number of players across all countries
    for (let i = 0; i < maxPlayers; i++) {
      countries.forEach(country => {
        const countryPlayers = Object.keys(playerData[country]);
        if (countryPlayers[i] && !players.includes(countryPlayers[i])) {
          players.push(countryPlayers[i]);
        }
      });
    }

    const datasets = players.map(player => ({
      label: player,
      data: countries.map(country => playerData[country][player] || 0),
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.3)`
    }));

    const countryData = {
      labels: countries,
      datasets: datasets
    };

    const options = {
      indexAxis: 'x' as const,
      scales: {
        y: {
          stacked: true,
          beginAtZero: true,
          title: {
            display: true,
            text: 'Runs'
          }
        },
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Player'
          }
        },
      }
    };

    const chartInstance = chartRef.current;
    if (chartInstance) {
      const ctx = chartInstance.getContext('2d');
      if (ctx) {
        Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);
        const chart = new Chart(ctx, {
          type: 'bar',
          data: countryData,
          options: options
        });
        return () => {
          chart.destroy();
        };
      }
    }
  }, []);

  return <canvas ref={chartRef} />;
};

export default App;
