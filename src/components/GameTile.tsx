import styles from "./GameTile.module.css";
import classNames from "classnames";
import bombSvg from "../assets/bomb-svgrepo-com.svg";
import crownSvg from "../assets/crown-2-svgrepo-com.svg";
import safeSvg from "../assets/safe-home-svgrepo-com.svg";

export type GameTileMetaType = {
  id: number;
  explored: boolean;
  exploreType: "SAFE" | "MINE" | "BOMB";
};

export type GameTileProps = {
  metadata: GameTileMetaType;
  tileIndex: number;
  updateGameData: (index: number) => void;
  className?: string;
  disable?: boolean;
};
const GameTile = ({
  metadata,
  className,
  updateGameData,
  disable = false,
}: GameTileProps) => {
  const { exploreType, explored, id } = metadata;
  const boxStyles = classNames(styles.box, {
    [styles.defaultBg]: !explored,
    [styles.green]: explored && exploreType === "SAFE",
    [styles.red]: explored && exploreType === "BOMB",
    [styles.gold]: explored && exploreType === "MINE",
    [styles.disablePointer]: disable,
    [styles.activePointer]: !disable,
    className,
  });

  const onTileClick = () => {
    if (!disable) updateGameData(id);
  };
  return (
    <div onClick={onTileClick} className={boxStyles}>
      {explored && (
        <div className={styles.svgContainer}>
          <img
            src={
              exploreType === "BOMB"
                ? bombSvg
                : explored && exploreType === "MINE"
                ? crownSvg
                : safeSvg
            }
            alt=""
            className={styles.svgArt}
          />
        </div>
      )}
    </div>
  );
};

export default GameTile;
