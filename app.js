//Teste
//Teste Dois RAPAX!

let numerosSorteados = [];
let tentativas = 1;
let restart = document.querySelector('#reiniciar');

const exibirTextoNaTela = (tag, texto) => {
    document.querySelector(tag).innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2}); // Biblioteca que faz com que seja narrado os textos os quais eu queira. 
}

const exibirMensagemInicial = () => {
    exibirTextoNaTela('h1', 'Jogo do número secreto!');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
}

exibirMensagemInicial();

const numeroAleatorio = (max, min) => {
    if (numerosSorteados.length >= max - min) {
        numerosSorteados = [];
    }
    let numeroEscolhido =  Math.floor(Math.random() * (max - min) + min);
    if (numerosSorteados.includes(numeroEscolhido)) {
        return numeroAleatorio(11, 1);
    } else {
        numerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
};

let numRandom = numeroAleatorio(11, 1);

const verificarChute = () => {
    let valorDigitado = Number(document.querySelector('.container__input').value);
    if (valorDigitado == numRandom) {
        exibirTextoNaTela('h1', 'Você venceu!');
        exibirTextoNaTela('p', `Total de tentativas: ${tentativas} ${tentativas <= 1 ? 'tentativa' : 'tentativas'}`);
        restart.removeAttribute('disabled');
    } else {
        tentativas++;
        if (valorDigitado == '' || isNaN(valorDigitado)) {
            exibirTextoNaTela('p', 'Digite algum número!');
        } else {
            if (valorDigitado > numRandom) {
                exibirTextoNaTela('p', 'O número é menor!');
            } else {
                exibirTextoNaTela('p', 'O número é maior!');
            }
            displayFocusAndClear();
        }
    }
}

const displayFocusAndClear = () => {
    let chute = document.querySelector('.container__input');
    chute.value = '';
    chute.focus();
}

const restartGame = document.querySelector('#reiniciar');
restart.addEventListener('click', () => {
    exibirMensagemInicial();
    displayFocusAndClear();
    tentativas = 1;
    numRandom = numeroAleatorio(11, 1);
    restart.setAttribute('disabled', true);
});