import { GameTileMetaType } from "../components/GameTile";

const NUMBER_OF_TILES = 36;

const getRandomIndex = () => {
  const min = 0;
  const max = NUMBER_OF_TILES - 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRabomBombAndMinePosition = (dificultyLevel: number = 1) => {
  const bombPos: number[] = [];
  const minePos = getRandomIndex();
  for (let i = 0; i < dificultyLevel; i++) {
    const ramdomIndex = getRandomIndex();
    if (bombPos.includes(ramdomIndex) || bombPos.includes(minePos)) {
      i--;
      continue;
    }
    bombPos.push(ramdomIndex);
  }

  return { bombPos, minePos };
};

const buildGameData = (dificultyLevel: number = 1) => {
  const gameData: GameTileMetaType[] = [];
  const { bombPos, minePos } = getRabomBombAndMinePosition(dificultyLevel);
  for (let i = 0; i < NUMBER_OF_TILES; i++) {
    gameData.push({
      id: i,
      explored: false,
      exploreType: bombPos.includes(i)
        ? "BOMB"
        : minePos == i
        ? "MINE"
        : "SAFE",
    });
  }
  return gameData;
};

export default buildGameData;
