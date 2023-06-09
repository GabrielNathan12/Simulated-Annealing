const { createCanvas, loadImage } = require('canvas');
const Chart = require('chartjs-node-canvas');

// Configurar o tamanho do canvas
const canvasWidth = 800;
const canvasHeight = 600;

// Criar o canvas
const canvas = createCanvas(canvasWidth, canvasHeight);
const ctx = canvas.getContext('2d');

// Configurar os dados do gráfico
const data = {
  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
  datasets: [
    {
      label: 'Vendas',
      data: [12, 19, 3, 5, 2],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

// Configurar as opções do gráfico
const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Criar o gráfico
const chart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: options,
});

// Renderizar o gráfico em um arquivo de imagem
chart.renderToBuffer().then(buffer => {
  // Enviar o buffer para o navegador
  // Exemplo: res.send(buffer);
});