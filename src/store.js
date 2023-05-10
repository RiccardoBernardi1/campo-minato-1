import { reactive } from "vue";

export const store = reactive({
  startGame: false,
  stopGame: false,
  gameOver: "",
  difficulty: "easy",
  cellsNumber: 100,
  bombNumber: 10,
  cellsForRow: 10,
  cellsReadyToChange: false,
  setStartGame(value) {
    store.startGame = value;
  },
  setStopGame(value) {
    store.stopGame = value;
  },
  setGameOver(value) {
    store.won = value;
  },
});
