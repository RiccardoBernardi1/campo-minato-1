import { reactive } from "vue";

export const store = reactive({
  startGame: false,
  stopGame: false,
  gameOver: "",
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
