const game = () => {
    let pScore = 0;
    let cScore = 0;
  
    //Start Gry
    const startGame = () => {
      const playBtn = document.querySelector(".intro button");
      const introScreen = document.querySelector(".intro");
      const match = document.querySelector(".match");
  
      playBtn.addEventListener("click", () => {
        introScreen.classList.add("fadeOut");
        match.classList.add("fadeIn");
      });
    };
    //Mecz
    const playMatch = () => {
      const options = document.querySelectorAll(".options button");
      const playerHand = document.querySelector(".player-hand");
      const computerHand = document.querySelector(".computer-hand");
      const hands = document.querySelectorAll(".hands img");
  
      hands.forEach(hand => {
        hand.addEventListener("animationend", function() {
          this.style.animation = "";
        });
      });
      //Opcje Komputera
      const computerOptions = ["rock", "paper", "scissors"];
  
      options.forEach(option => {
        option.addEventListener("click", function() {
          //Wybor Komputera
          const computerNumber = Math.floor(Math.random() * 3);
          const computerChoice = computerOptions[computerNumber];
  
          setTimeout(() => {
            
            compareHands(this.textContent, computerChoice);
           
            playerHand.src = `img/${this.textContent}.png`;
            computerHand.src = `img/${computerChoice}.png`;
          }, 2000);
    
          playerHand.style.animation = "shakePlayer 2s ease";
          computerHand.style.animation = "shakeComputer 2s ease";
        });
      });
    };
  
    const updateScore = () => {
      const playerScore = document.querySelector(".gracz-wynik p");
      const computerScore = document.querySelector(".komputer-wynik p");
      playerScore.textContent = pScore;
      computerScore.textContent = cScore;
    };
  
    const compareHands = (playerChoice, computerChoice) => {
    
      const winner = document.querySelector(".wygrany");
      
      if (playerChoice === computerChoice) {
        winner.textContent = "Remis!";
        return;
      }
   
      if (playerChoice === "rock") {
        if (computerChoice === "scissors") {
          winner.textContent = "Gracz Wygrywa";
          pScore++;
          updateScore();
          return;
        } else {
          winner.textContent = "Komputer Wygrywa";
          cScore++;
          updateScore();
          return;
        }
      }
   
      if (playerChoice === "paper") {
        if (computerChoice === "scissors") {
          winner.textContent = "Komputer Wygrywa";
          cScore++;
          updateScore();
          return;
        } else {
          winner.textContent = "Gracz Wygrywa";
          pScore++;
          updateScore();
          return;
        }
      }
    
      if (playerChoice === "scissors") {
        if (computerChoice === "rock") {
          winner.textContent = "Komputer Wygrywa";
          cScore++;
          updateScore();
          return;
        } else {
          winner.textContent = "Gracz Wygrywa";
          pScore++;
          updateScore();
          return;
        }
      }
    };
  

    startGame();
    playMatch();
  };
  

  game();