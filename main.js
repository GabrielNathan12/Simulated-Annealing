// Variáveis de temperatura, resfriamento e limite de iterações
const tempIni = 100;
const tempFinal = 0.1;
const refrigeracao = 0.95;
const limiteInte = 1000;

let items = [];

function getItem(){
  const qtdItens = document.getElementById('items').value;
  // Transformando em inteiros
  const Items = parseInt(qtdItens);

  if (items.length == 0) {
    // Criacao dos items com valores e pesos aleatorios
    for (let i = 0; i < Items; i++) {
      const item = {
        valor: Math.round(Math.random() * 10 + 1),
        peso: Math.round(Math.random() * 10 + 1),
      };
      // Inserindo no vetor
      items.push(item);
    }
  }
  
  return items;
}

function getTamMochila(){
  const mochila = document.getElementById('schoolbag').value;
  const Mochila = parseFloat(mochila);
  return Mochila;
}

function calcularTotalPeso(solucao) {
  let totalPeso = 0;
  const items = getItem();
  for (let i = 0; i < solucao.length; i++) {
    if (solucao[i] === 1) {
      totalPeso += items[i].peso;
    }
  }
  return totalPeso;
}

// Função para calcular o valor total de uma solução
function calcularTotalValor(solucao) {
  let totalValor = 0;
  const items = getItem();
  for (let i = 0; i < solucao.length; i++) {
    if (solucao[i] === 1) {
      totalValor += items[i].valor;
    }
  }
  return totalValor;
}

// Função para verificar se uma solução é válida
function eSolucaoValida(solucao) {
  const totalPeso = calcularTotalPeso(solucao);
  const Mochila = getTamMochila();
  return totalPeso <= Mochila;
}

// Função para gerar uma solução inicial aleatória
function gerarRandomSolucao() {
  const solucao = [];
  const items = getItem();
  for (let i = 0; i < items.length; i++) {
    solucao.push(Math.round(Math.random()));
  }
  while(!eSolucaoValida(solucao)){
    solucao[Math.floor(Math.random() * solucao.length)] = 0;
  }
  return solucao;
}

// Função de probabilidade de aceitação de soluções piores
function probabilidadeDeAceitacao(delta, temperatura) {
  return Math.exp(delta / temperatura);
}

// Função para executar o algoritmo Simulated Annealing
function simulatedAnnealing() {
  let solucaoAceita = gerarRandomSolucao();
  let melhorSol = solucaoAceita.slice();
  let atualTemp = tempIni;
  let numIntera = 0;
  let histErro = [];

  while (atualTemp > tempFinal && numIntera < limiteInte) {
    const novaSol = solucaoAceita.slice();

    // Decisão aleatória para adicionar ou remover um item da mochila
    const decisao = Math.round(Math.random());
    if (decisao === 0) {
      // Remover um item aleatório
      const removeIndex = Math.floor(Math.random() * novaSol.length);
      if (novaSol[removeIndex] === 1) {
        novaSol[removeIndex] = 0;
      }
    } else {
      // Adicionar um item aleatório
      const addIndex = Math.floor(Math.random() * novaSol.length);
      if (novaSol[addIndex] === 0) {
        novaSol[addIndex] = 1;
      }
    }

    if (eSolucaoValida(novaSol)) {
      const situacaoAtual = calcularTotalValor(solucaoAceita);
      const novaSituacao = calcularTotalValor(novaSol);

      if (
        novaSituacao > situacaoAtual ||
        (novaSituacao < situacaoAtual &&
          probabilidadeDeAceitacao(novaSituacao - situacaoAtual, atualTemp) >
            Math.random())
      ) {
        solucaoAceita = novaSol.slice();
      }

      if (novaSituacao > calcularTotalValor(melhorSol)) {
        melhorSol = novaSol.slice();
      }

      const error = Math.abs(
        calcularTotalValor(melhorSol) - calcularTotalValor(solucaoAceita)
      );
      histErro.push(error);
    }

    atualTemp *= refrigeracao;
    numIntera++;
  }

  return {
    melhorSol,
    histErro,
  };
}

// Função para imprimir os itens selecionados na mochila
function printElementos(solucao) {
  let pesoTotal = 0;
  let valorTotal = 0;
  const itemSeleci = [];
  const items = getItem();
  const result = document.getElementById('result-container');
  result.innerHTML = '';

  for (let i = 0; i < solucao.length; i++) {
    if (solucao[i] === 1) {
      const item = items[i];
      pesoTotal += item.peso;
      valorTotal += item.valor;
      itemSeleci.push(item);
    }
  }

  const titulo = document.createElement('h2');
  titulo.textContent = 'Itens selecionados da Mochila';
  result.appendChild(titulo);

  for (let i = 0; i < itemSeleci.length; i++) {
    const item = itemSeleci[i];
    const itemInfo = document.createElement('p');
    itemInfo.innerHTML = `Item : Peso ${item.peso} , Valor ${item.valor}`;
    result.appendChild(itemInfo);
  }
  const pesoTotalInfo = document.createElement('p');
  pesoTotalInfo.textContent = `Peso total da mochila: ${pesoTotal}`
  result.appendChild(pesoTotalInfo);

  const valorTotalInfo = document.createElement('p');
  valorTotalInfo.textContent = `Valor total dos items: ${valorTotal}`;
  result.appendChild(valorTotalInfo);

  console.log(`Peso total: ${pesoTotal}`);
  console.log(`Valor total: ${valorTotal}`);
}

let chart;
// Função principal que será executada quando o botão for apertado
function main() {
  items = [];
  // Executar o algoritmo Simulated Annealing
  const result = simulatedAnnealing();
  // Imprimir os itens selecionados na mochila
  printElementos(result.melhorSol);
  // Gráfico de Erro
  if(chart){
    chart.destroy();
  }
  const errorChartCtx = document.getElementById('myChart').getContext('2d');

  chart = new Chart(errorChartCtx, {
    type: 'line',
    data: {
      labels: Array.from({ length: result.histErro.length }, (_, i) => i + 1),
      datasets: [
        {
          label: 'Erro',
          data: result.histErro,
          borderColor: 'rgba(0,127,255, 1)',
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Evolução do Erro no Simulated Annealing',
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Iteração',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Erro',
          },
        },
      },
    },
  });
}
