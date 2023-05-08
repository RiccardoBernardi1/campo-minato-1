import { reactive } from "vue";

export const store = reactive({
  startGame: false,
  stopGame: false,
  won: false,
  lost: false,
  setStartGame(value) {
    // definisci questa mutation
    store.startGame = value;
  },
  setStopGame(value) {
    // definisci questa mutation
    store.stopGame = value;
  },
  setWon(value) {
    // definisci questa mutation
    store.won = value;
  },
  setLost(value) {
    // definisci questa mutation
    store.lost = value;
  },
});
