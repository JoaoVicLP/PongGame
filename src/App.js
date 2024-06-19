import "./App.css";
import { useEffect } from "react";
import "./TextMulti.css";
import "./TextSingle.css";

function App() {
  useEffect(() => {

    //variaveis para os eventos de botoes
    var game = document.querySelector(".game");
    var playButton = document.querySelector(".playButton");
    var multButton = document.querySelector(".multButton");
    var compButton = document.querySelector(".compButton");
    var textGameSingle = document.querySelector(".textGameSingle");
    var textGameMulti = document.querySelector(".textGameMulti");
    var titleGame = document.querySelector(".titleGame");
    var firstPlayer = document.querySelector(".firstPlayer");
    var nameButtonFirst = document.querySelector(".nameButtonFirst");
    var secondPlayer = document.querySelector(".secondPlayer");
    var nameButtonSingle = document.querySelector(".nameButtonSingle");
    var nameButtonSecond = document.querySelector(".nameButtonSecond");
    var gameplay = document.querySelector('.gameplay');
    var screenGame = document.querySelector('.screenGame');

    //variaves pra tela do jogo
    var canvas = document.querySelector('.gameplay');
    var context;
    var p1x = 0;
    var p1y = 225;
    var p2x = 880;
    var p2y = 225;
    var p1Wid = 20;
    var p1Hei = 150;
    var p2Wid = 20;
    var p2Hei = 150;
    var pV = 15;

    var bx = 385;
    var by = 285;
    var bWid = 30;
    var bHei = 30;
    var bVelX = 15;
    var bVelY = 0;

    var p1Up = false;
    var p1Down = false;
    var p2Up = false;
    var p2Down = false;

    var point1 = 0;
    var point2 = 0;

    if (canvas){
      context = canvas.getContext("2d");
    }

    //mover barra1
    document.addEventListener('keydown',function(e){
      if(e.key === 'w' ){
        p1Up = true;
      }
      if(e.key === 's'){
        p1Down = true;
      }
      if(e.key === 'ArrowUp' ){
        p2Up = true;
        e.preventDefault();
      }
      if(e.key === 'ArrowDown'){
        p2Down = true;
        e.preventDefault();
      }
    })
    //mover barra2
    document.addEventListener('keyup',function(e){
      if(e.key === 'w' ){
        p1Up = false;
      }
      if(e.key === 's'){
        p1Down = false;
      }
      if(e.key === 'ArrowUp' ){
        p2Up = false;
        e.preventDefault();
      }
      if(e.key === 'ArrowDown'){
        p2Down = false;
        e.preventDefault();
      }
    })

    //atualizacao de jogo
    function loop(){
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#000000';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#00FFFF';
      context.fillRect(p1x, p1y, p1Wid, p1Hei);
      context.fillStyle = '#0000FF';
      context.fillRect(p2x, p2y, p2Wid, p2Hei);

      var p1RS = p1x + p1Wid;
      var p1HB = p1y + p1Hei;
      var p2HB = p1y + p2Hei;

      if(p1Up && p1y > 0){
        p1y -= pV;
      }
      if(p1Down && p1HB < canvas.height){
        p1y += pV;
      }

      if(p2Up && p2y > 0){
        p2y -= pV;
      }
      if(p2Down && p2HB < canvas.height){
        p2y += pV;
      }

      //informacoes
      context.fillStyle = "#FFFFFF";
      context.font = '70px "Pixelify Sans", sans-serif';
      context.fillText (point1, 200, 100);
      context.fillText (point2, 600, 100);
      context.font = '45px "Pixelify Sans", sans-serif';
      context.fillText ("Score", 335, 45);

      context.fillRect (bx, by, bWid, bHei);
      bx += bVelX;
      by += bVelY;

      if (by + bHei > canvas.height || by < 0){
        bVelY = -bVelY
      }
    
      //ponto pro jogador 1
      if (bx > canvas.width){
        bx = 400;
        by = 300;
        point1++;
        bVelX = 15;
        bVelY = Math.floor(Math.random() * 14) - 7;
      }

      //ponto pro jogador 2
      if (bx < -bWid){
        bx = 400;
        by = 300;
        point2++;
        bVelX = 15;
        bVelY = Math.floor(Math.random() * 14) - 7;
      }

      //colisoes
      if (by + bHei > p1y && by < p1HB && bx <= p1RS){
        bVelX = -bVelX
        bVelX -= 0.5;
        bVelY = Math.floor(Math.random() * 14) - 7;
      }

      if (by+bHei > p2y && by < p2HB && bx + bWid >= p2x){
        bVelX = -bVelX
        bVelX -= 0.5;
        bVelY = Math.floor(Math.random() * 14) - 7;
      }
    }
    setInterval(loop, 1000 / 30);

    //testes
    console.log("titleGame:", titleGame);
    console.log("nameButtonSingle: ", nameButtonSingle);
    console.log("textGameSingle: ", textGameSingle);

    //desliga botao de Play
    if (playButton && multButton && compButton) {
      playButton.addEventListener("click", function () {
        multButton.style.display = "block";
        compButton.style.display = "block";
        playButton.style.display = "none";
      });
    }
    //abre a opcao de Singleplayer
    if (playButton && multButton && compButton) {
      compButton.addEventListener("click", function () {
        multButton.style.display = "none";
        compButton.style.display = "none";
        textGameSingle.style.display = "block";
      });
    }
    //resposta do botao do singleplayer
    if (nameButtonSingle && textGameSingle) {
      nameButtonSingle.addEventListener("click", function () {
        textGameSingle.style.display = "none";
        game.style.flexDirection = "row";
        titleGame.style.display = "flex";
        titleGame.style.alignItems = "center";
        titleGame.style.width = "20vw";
        titleGame.style.height = "40vw";
        gameplay.style.height = "600px";
        gameplay.style.width = "900px";
        gameplay.style.display = "block";
        screenGame.style.width = "80vw";
      });
    }
    //abre a opcao de Multiplayer
    if (playButton && multButton && compButton) {
      multButton.addEventListener("click", function () {
        multButton.style.display = "none";
        compButton.style.display = "none";
        textGameMulti.style.display = "block";
      });
    }
    //resposta do primeiro botao do multiplayer
    if (nameButtonFirst && secondPlayer) {
      nameButtonFirst.addEventListener("click", function () {
        secondPlayer.style.display = "block";
        firstPlayer.style.display = "none";
      });
    }
    //resposta do segundo botao do multiplayer
    if (nameButtonSecond && textGameMulti) {
      nameButtonSecond.addEventListener("click", function () {
        textGameMulti.style.display = "none";
        game.style.flexDirection = "row";
        titleGame.style.display = "flex";
        titleGame.style.alignItems = "center";
        titleGame.style.width = "20vw";
        titleGame.style.height = "40vw";
        gameplay.style.height = "600px";
        gameplay.style.width = "900px";
        gameplay.style.display = "block";
        screenGame.style.width = "80vw";

      });
    }
  }, []);

  return (
    <div className="game">
      <div className="titleGame">
        <h1>Pong</h1>
      </div>
      <div className="screenGame">
        <div className="buttons">
          <button className="playButton">play</button>
          <button className="multButton">multiplayer</button>
          <button className="compButton">comp</button>

          <div className="textGameSingle">
            <input
              type="text"
              name="namePlayer"
              placeholder="Name Player"
              className="inputPlayer"
            />
            <button className="nameButtonSingle">OK</button>
          </div>

          <div className="textGameMulti">
            <div className="firstPlayer">
              <input
                type="text"
                name="namePlayer"
                placeholder="Name 1nd Player"
                className="inputPlayer"
              />
              <button className="nameButtonFirst">OK</button>
            </div>
            <div className="secondPlayer">
              <input
                type="text"
                name="nameSecondPlayer"
                placeholder="Name 2nd Player"
                className="inputMultiPlayer"
              />
              <button className="nameButtonSecond">OK</button>
            </div>
          </div>

        <canvas className="gameplay" width={900} height={600}></canvas>
        </div>
      </div>
    </div>
  );
}

export default App;

/*<div className="gameplay">
<div className="bar1"></div>
<div className="ball"></div>
<div className="bar2"></div>
</div>*/