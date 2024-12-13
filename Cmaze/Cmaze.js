const player = document.getElementById('player');
const goal = document.getElementById('goal');
const fgoal = document.getElementById('fgoal'); // Oppdatert ID
const walls = document.querySelectorAll('.wall');
const winSound = document.getElementById('winSound');
const fgoalSound = new Audio('Sounds/fgoal.mp3'); // Lyd for falskt mål


let posX = 0;
let posY = 0;

// Funksjon for kollisjonssjekk
function checkCollision(element) {
    const playerRect = player.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    return !(
        playerRect.top > elementRect.bottom ||
        playerRect.bottom < elementRect.top ||
        playerRect.left > elementRect.right ||
        playerRect.right < elementRect.left
    );
}

// Funksjon for å flytte spilleren
function movePlayer(event) {
    let oldX = posX;
    let oldY = posY;

    switch (event.key) {
        case 'ArrowUp':
        case 'w': // WASD: W for opp
        case 'W':
            if (posY > 0) posY -= 10;
            break;
        case 'ArrowDown':
        case 's': // WASD: S for ned
        case 'S':
            if (posY < 370) posY += 10;
            break;
        case 'ArrowLeft':
        case 'a': // WASD: A for venstre
        case 'A':
            if (posX > 0) posX -= 10;
            break;
        case 'ArrowRight':
        case 'd': // WASD: D for høyre
        case 'D':
            if (posX < 370) posX += 10;
            break;
    }

    player.style.left = posX + 'px';
    player.style.top = posY + 'px';

    // Sjekk kollisjon med vegger
    for (let wall of walls) {
        if (checkCollision(wall)) {
            posX = oldX;
            posY = oldY;
            player.style.left = posX + 'px';
            player.style.top = posY + 'px';
            break;
        }
    }

    // Sjekk om spilleren når målet
    if (checkCollision(goal)) {
        winSound.play();
        alert('Gratulerer, du vant!');
        document.removeEventListener('keydown', movePlayer);
    }

   // Sjekk om spilleren når falskt mål
   if (checkCollision(fgoal)) {
    fgoalSound.play(); // Spill av lyden
    alert('Oops! Du traff en vegg. Skulle gått til Specsavers');
    posX = 0; // Resett spilleren til start
    posY = 0;
    player.style.left = posX + 'px';
    player.style.top = posY + 'px';
}
}

// Funksjon for å vise instruksjoner
function showInstructions() {
    alert(
        `Slik spiller du:
- Bruk piltastene eller WASD-tastene for å bevege spilleren.
- Redd nissen ifra og bli RickRolled.
- Finn pipen.
- Pass på eventyret venter!`
    );
}

// Vise instruksjoner når siden lastes inn
window.onload = showInstructions;

// Legg til bevegelseslytter
document.addEventListener('keydown', movePlayer);


