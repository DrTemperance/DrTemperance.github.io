function ConsolePhase1() {
  runNextLevel();
}

function runNextLevel() {
  if (level == 1) {
    PlayerChooseTime();
  } else {
    `${type}${level}`;
  }
}

function PlayerChooseTime() {
  if (playerText === "2000s" || playerText === "00s") {
    const type = α;
  }
  if (playerText === "1990s" || playerText === "90s") {
    const type = β;
  }
  if (playerText === "1980s" || playerText === "80s") {
    const type = γ;
  }
}
