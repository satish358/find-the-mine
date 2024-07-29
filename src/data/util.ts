import Swal from "sweetalert2";
import winnerSvg from "../assets/medal-champion-award-winner-olympic-23-svgrepo-com.svg";
import looserSvg from "../assets/thumb-down-bad-svgrepo-com.svg";
export const showAlert = (isWinner: boolean) => {
  Swal.fire({
    title: isWinner ? "Congratulations" : "Opps..",
    text: isWinner ? "You won the game." : "Try again, Better luck next time.",
    imageUrl: isWinner ? winnerSvg : looserSvg,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Custom image",
  });
};
