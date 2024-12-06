// ---- Sélection des éléments HTML ----
const choices = document.querySelectorAll(".choice"); // Boutons Pierre, Feuille, Ciseaux
const playerScoreEl = document.getElementById("player-score"); // Score du joueur
const computerScoreEl = document.getElementById("computer-score"); // Score de l'ordinateur
const messageEl = document.getElementById("message"); // Message d'état
const nextRoundBtn = document.getElementById("next-round"); // Bouton "Tour suivant"
const restartBtn = document.getElementById("restart"); // Bouton "Recommencer"

// ---- Initialisation des scores ----
let playerScore = 0; // Score initial du joueur
let computerScore = 0; // Score initial de l'ordinateur

// Fonction pour générer un choix aléatoire de l'ordinateur
function getComputerChoice() {
  const options = ["pierre", "feuille", "ciseaux"]; // Choix possibles
  return options[Math.floor(Math.random() * options.length)]; // Retourne un choix aléatoire
}

// Fonction pour déterminer le gagnant
function getWinner(player, computer) {
  if (player === computer) return "égalité"; // Cas d'égalité
  if (
    (player === "pierre" && computer === "ciseaux") ||
    (player === "feuille" && computer === "pierre") ||
    (player === "ciseaux" && computer === "feuille")
  ) {
    return "joueur"; // Le joueur gagne
  }
  return "ordinateur"; // L'ordinateur gagne
}

// Fonction principale pour jouer un tour
function playGame(event) {
  const playerChoice = event.target.dataset.choice; // Récupère le choix du joueur
  const computerChoice = getComputerChoice(); // Génère le choix de l'ordinateur
  const winner = getWinner(playerChoice, computerChoice); // Détermine le gagnant

  // Mise à jour des scores et du message
  if (winner === "joueur") {
    playerScore++;
    messageEl.textContent = `Vous gagnez ! ${playerChoice} bat ${computerChoice}.`;
  } else if (winner === "ordinateur") {
    computerScore++;
    messageEl.textContent = `Vous perdez ! ${computerChoice} bat ${playerChoice}.`;
  } else {
    messageEl.textContent = `Égalité ! Vous avez tous choisi ${playerChoice}.`;
  }

  // Mise à jour des scores dans l'interface
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;

  // Désactivation des boutons
  choices.forEach(choice => (choice.disabled = true));

  // Affiche le bouton "Tour suivant"
  nextRoundBtn.classList.remove("hidden");
}

// Fonction pour passer au tour suivant
function nextRound() {
  choices.forEach(choice => (choice.disabled = false)); // Réactive les boutons
  messageEl.textContent = "À vous de jouer !"; // Réinitialise le message
  nextRoundBtn.classList.add("hidden"); // Masque le bouton "Tour suivant"
}

// Fonction pour redémarrer le jeu
function restartGame() {
  playerScore = 0; // Réinitialise le score du joueur
  computerScore = 0; // Réinitialise le score de l'ordinateur
  playerScoreEl.textContent = playerScore; // Met à jour l'interface
  computerScoreEl.textContent = computerScore;
  nextRound(); // Réinitialise l'état du jeu
}

// ---- Ajout des événements ----
choices.forEach(choice => {
  choice.addEventListener("click", playGame); // Associe un clic à chaque choix
});

nextRoundBtn.addEventListener("click", nextRound); // Associe le clic au bouton "Tour suivant"
restartBtn.addEventListener("click", restartGame); // Associe le clic au bouton "Recommencer"
