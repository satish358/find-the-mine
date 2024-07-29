import { useState } from "react";
import "./App.css";
import GameTile, { GameTileMetaType } from "./components/GameTile";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import buildGameData from "./data/GameData";
import { showAlert } from "./data/util";

const levels = [1, 2, 3, 4, 5, 6];

function App() {
  const [gameData, setGameData] = useState<GameTileMetaType[]>(
    buildGameData(1)
  );
  const [gameDisable, setGameDisable] = useState(false);
  const [showSpark, setShowSpark] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [score, setScore] = useState(0);
  const { width, height } = useWindowSize();

  const updateGameData = (index: number) => {
    updateScore(gameData[index].exploreType);
    setGameData((curr) => {
      curr[index] = { ...curr[index], explored: true };
      if (curr[index].exploreType === "BOMB") {
        setGameDisable(true);
        showAlert(false);
      }

      if (curr[index].exploreType === "MINE") {
        setGameDisable(true);
        setShowSpark(true);
        showAlert(true);
      }

      return [...curr];
    });
  };

  const reloadGame = (dLevel?: number) => {
    setGameData(buildGameData(dLevel));
    setGameDisable(false);
    setShowSpark(false);
    setScore(0);
  };

  const changeDifficultyLevel = (level: number) => {
    setDifficultyLevel(level);
    reloadGame(level);
  };

  const updateScore = async (explorType: string) => {
    if (explorType === "MINE") setScore((cur) => difficultyLevel * 100 + cur);
    if (explorType === "SAFE") setScore((cur) => difficultyLevel * 2 + cur);
  };

  return (
    <>
      {showSpark && <Confetti width={width} height={height} />}

      <div className="gameContainer">
        <div className="sidePannel">
          <h2 className="text-center fun-font">Game Menu</h2>
          <hr />
          <h3 className="score-text fun-font">SCORE : {score}</h3>
          <h5>Select Difficulty Level</h5>
          <div className="levelBoxContainer">
            {levels.map((level) => (
              <div
                key={"level" + level}
                className={
                  "fun-font levelBox " +
                  (difficultyLevel === level ? " levelBoxActive" : "")
                }
                onClick={() => changeDifficultyLevel(level)}
              >
                {level}
              </div>
            ))}
          </div>
          <div className="btnContainer">
            <button
              type="button"
              className="btn fun-font"
              onClick={() => reloadGame(difficultyLevel)}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="tilesContainer">
          {gameData.map((item, index) => (
            <div key={index}>
              <GameTile
                disable={gameDisable}
                tileIndex={index}
                updateGameData={updateGameData}
                metadata={item}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
