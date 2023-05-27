var rodada = 0;
var jogadorAtual = 1;
var pontosJogador1 = 0;
var pontosJogador2 = 0;
var vitoriasJogador1 = 0;
var vitoriasJogador2 = 0;
const jogarDado1 = document.getElementById("jogarDado1");
const jogarDado2 = document.getElementById("jogarDado2");
const reiniciar = document.getElementById("Reiniciar");
const jogadordocument = document.getElementById("resultado");

function jogarDado(jogador) {
  if (jogador == jogadorAtual) {
    var resultado = Math.floor(Math.random() * 6) + 1;

    if (jogador == 1) {
      pontosJogador1 += resultado;
    } else {
      pontosJogador2 += resultado;
    }

    rodada++;

    if (rodada == 20) {
      if (pontosJogador1 > pontosJogador2) {
        jogadordocument.innerHTML = "Jogador 1 ganhou!";
        vitoriasJogador1++;
      } else if (pontosJogador2 > pontosJogador1) {
        jogadordocument.innerHTML = "Jogador 2 ganhou!";
        vitoriasJogador2++;
      } else {
        jogadordocument.innerHTML = "Empate!";
      }

      jogadordocument.innerHTML +=
        " Vitórias Jogador 1: " +
        vitoriasJogador1 +
        ", Vitórias Jogador 2: " +
        vitoriasJogador2;

      salvarInformacoesJogo();
    } else {
      jogadordocument.innerHTML = "Rodada " + Math.ceil(rodada / 2) + ": ";

      if (jogador == 1) {
        jogadordocument.innerHTML += "Jogador 1 jogou " + resultado + ". ";
      } else {
        jogadordocument.innerHTML += "Jogador 2 jogou " + resultado + ". ";
      }

      if (rodada % 2 == 0) {
        if (pontosJogador1 > pontosJogador2) {
          jogadordocument.innerHTML += "Jogador 1 está ganhando!";
        } else if (pontosJogador2 > pontosJogador1) {
          jogadordocument.innerHTML += "Jogador 2 está ganhando!";
        } else {
          jogadordocument.innerHTML += "Empate!";
        }
      }

      salvarInformacoesJogo();
    }

    jogadorAtual = jogadorAtual == 1 ? 2 : 1;
  }
}

function reiniciarPartida() {
  rodada = 0;
  pontosJogador1 = 0;
  pontosJogador2 = 0;
  jogadorAtual = 1;
  jogadordocument.innerHTML = "Jogo";
  salvarInformacoesJogo();
}

function salvarInformacoesJogo() {
  localStorage.setItem("rodada", rodada);
  localStorage.setItem("jogadorAtual", jogadorAtual);
  localStorage.setItem("pontosJogador1", pontosJogador1);
  localStorage.setItem("pontosJogador2", pontosJogador2);
  localStorage.setItem("vitoriasJogador1", vitoriasJogador1);
  localStorage.setItem("vitoriasJogador2", vitoriasJogador2);
}

function restaurarInformacoesJogo() {
  rodada = parseInt(localStorage.getItem("rodada")) || 0;
  jogadorAtual = parseInt(localStorage.getItem("jogadorAtual")) || 1;
  pontosJogador1 = parseInt(localStorage.getItem("pontosJogador1")) || 0;
  pontosJogador2 = parseInt(localStorage.getItem("pontosJogador2")) || 0;
  vitoriasJogador1 = parseInt(localStorage.getItem("vitoriasJogador1")) || 0;
  vitoriasJogador2 = parseInt(localStorage.getItem("vitoriasJogador2")) || 0;

  if (rodada > 0) {
    jogadordocument.innerHTML = "Rodada " + Math.ceil(rodada / 2) + ": ";

    if (rodada % 2 == 0) {
      if (pontosJogador1 > pontosJogador2) {
        jogadordocument.innerHTML += "Jogador 1 está ganhando!";
      } else if (pontosJogador2 > pontosJogador1) {
        jogadordocument.innerHTML += "Jogador 2 está ganhando!";
      } else {
        jogadordocument.innerHTML += "Empate!";
      }
    }
  }
}

restaurarInformacoesJogo();

jogarDado1.onclick = () => jogarDado(1);
jogarDado2.onclick = () => jogarDado(2);
reiniciar.onclick = reiniciarPartida;

window.addEventListener("beforeunload", () => {
  salvarInformacoesJogo();
});