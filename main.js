var data = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
    datasets: [
      {
        label: 'Simulated-Annealing',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'red',
        borderWidth: 2,
      },
    ],
  };

  var options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Obter o elemento canvas
  var canvas = document.getElementById('myChart');
  var ctx = canvas.getContext('2d');

  // Criar o gráfico
  var chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options,
  });