class Simulated{
  
  constructor(pesoMochila , qtdItens){
    this.pesoMochila = pesoMochila;
    this.qtdItens = qtdItens;
  }
  
  preecherObjeto(){
    const dadosItens = [];
    for(let i = 0; i < this.qtdItens; i++){
      const value = Math.floor(Math.random() * 10) + 1;
      const p = Math.floor(Math.random() * 10) + 1;
      
      const dados = {
        valor: value,
        peso: p
      }
      dadosItens.push(dados);
    }
    return dadosItens;
  }

  simulated_annnealing(){
    const Items = this.preecherObjeto();
    
  }
  printarItens(){
    const aux = this.preecherObjeto();
    console.log(aux);
  }
  gerarGrafico(){
    let data = {
      labels: [ 10, 20, 30, 50, 50, 60, 70, 80 , 90, 100],
      datasets: [
        {
          label: 'Simulated-Annealing',
          data: [3, 4,1 ,31, 100],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 3,
        },
      ],
    };
  
    let options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  
    // Obter o elemento canvas
    let canvas = document.getElementById('myChart');
    let ctx = canvas.getContext('2d');
  
    // Criar o gráfico
    let chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    }); 
  }
}

function main(){
  //Pegando os valores do input
const Mochila = document.getElementById('schoolbag').value;
//Pegando os valores do input
const Items = document.getElementById('items').value;
//Pegando a quantidade de itens
const pesoMochila = parseFloat(Mochila);
//Transformando em Inteiros
const items = parseInt(Items);


console.log(pesoMochila, items);
  const s = new Simulated(pesoMochila, items);
  s.gerarGrafico();
  s.printarItens();
}

function printar(){
  main();
}

