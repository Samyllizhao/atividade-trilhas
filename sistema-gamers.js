// require procura dependencias 
const prompt = require('prompt-sync')();

let continuar = true;
let time = [];

function mostrarOpcoes(){
    console.log('\n=====================');
    console.log('-----SISTEMA DE GAMERS-----');
    console.log('1 - Cadastrar jogador');
    console.log('2 - Deletar jogador');
    console.log('3 - Mostrar equipe');
    console.log('4 - Média da equipe');
    console.log('5 - Buscar jogador');
    console.log('6 - Atualizar pontos');
    console.log('7 - Sair');
}

function mostrarEquipe(){
    if(time.length === 0){
        console.log('Nenhum jogador cadastrado.');
        return;
    }

    console.log('\n--- JOGADORES DA EQUIPE ---');
    for(let i = 0; i < time.length; i++){
        let jogador = time[i];
        console.log((i + 1) + '. ' + jogador.nome + ' | Função: ' + jogador.funcao + ' | Pontuação: ' + jogador.pontuacao);
    }
}

function cadastrarJogador(){
    let nomeJogador = prompt('Digite o nome do jogador: ');
    let funcaoJogador = prompt('Digite a função no time: ');
    let pontuacaoJogador = Number(prompt('Digite a pontuação: '));

    if(isNaN(pontuacaoJogador)){
        console.log('Pontuação inválida!');
        return;
    } else {
        let recruta = {
            nome: nomeJogador,
            funcao: funcaoJogador,
            pontuacao: pontuacaoJogador
        };

        time.push(recruta);
        console.log('Jogador ' + nomeJogador + ' foi cadastrado com sucesso!');
    }   
}

function deletarJogador(){
    if(time.length === 0){
        console.log('Nenhum jogador cadastrado.');
        return;
    }

    let nomeDeletar = prompt('Digite o nome para deletar: ');
    let indexDeletado = -1;

    for (let i = 0; i < time.length; i++){
        if(time[i].nome === nomeDeletar){
            indexDeletado = i;
            break;
        }
    }

    if(indexDeletado === -1){
        console.log('Jogador não encontrado.');
        return;
    }

    time.splice(indexDeletado, 1);
    console.log('Jogador deletado com sucesso!');
}

function mediaEquipe(){
    if(time.length === 0){
        console.log('Nenhum jogador cadastrado.');
        return;
    } 
    
    let totalPontos = 0;

    for (let i = 0; i < time.length; i++){
        totalPontos += time[i].pontuacao;
    }

    let mediaPontos = totalPontos / time.length;

    console.log('O time possui uma média de ' + mediaPontos.toFixed(2) + ' pontos por jogador.');
}

function buscarJogador(){
    if(time.length === 0){
        console.log('Nenhum jogador cadastrado.');
        return;
    }

    let nomeDesejado = prompt('Digite o nome do jogador que deseja buscar: ');
    console.log('Buscando por: ' + nomeDesejado + '...');

    let encontrou = false;

    for (let i = 0; i < time.length; i++) {
        let jogadorAtual = time[i];

        if (jogadorAtual.nome === nomeDesejado) {
            console.log('\nJOGADOR ENCONTRADO!');
            console.log('Nome: ' + jogadorAtual.nome + ' | Função: ' + jogadorAtual.funcao + ' | Pontos: ' + jogadorAtual.pontuacao);
            encontrou = true;
            break;
        }
    }

    if (encontrou === false) {
        console.log('O jogador ' + nomeDesejado + ' não faz parte da nossa equipe.');
    }
}


function atualizarPontuacao(){
    if(time.length === 0){
        console.log('Nenhum jogador cadastrado.');
        return;
    }

    console.log('\n--- ATUALIZAÇÃO DE RANKING ---');
    let nomeDesejado = prompt('Qual jogador deseja atualizar? ');

    let encontrou = false;

    for(let i = 0; i < time.length; i++){
        let jogadorAtual = time[i];

        if(jogadorAtual.nome === nomeDesejado){
            let pontosNovos = Number(prompt('Quantos pontos ele ganhou hoje? '));

            if(isNaN(pontosNovos)){
                console.log('Quantidade de pontos inválida!');
                return;
            }

            jogadorAtual.pontuacao += pontosNovos;
            console.log('\nSUCESSO! A pontuação de ' + jogadorAtual.nome + ' subiu para ' + jogadorAtual.pontuacao + ' pontos!');
            encontrou = true;
            break;
        }
    }

    if(encontrou === false){
        console.log('O jogador ' + nomeDesejado + ' não foi encontrado.');
    }
}

// Loop Principal do Menu
while (continuar === true){
    mostrarOpcoes();
    let opcao = prompt('Digite sua opção: ');

    if(opcao === '1'){
        cadastrarJogador();
    } else if (opcao === '2'){
        deletarJogador();
    } else if (opcao === '3'){
        mostrarEquipe();
    } else if (opcao === '4'){
        mediaEquipe();
    } else if (opcao === '5'){
        buscarJogador();
    } else if (opcao === '6'){
        atualizarPontuacao();
    } else if (opcao === '7'){
        continuar = false;
        console.log('Saindo do sistema... Até logo!');
    } else {
        console.log('Opção inválida, tente novamente.');
    }
}