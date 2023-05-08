import { reactive } from "vue";

export const store = reactive({
  startGame: false,
  stopGame: false,
  setStartGame(value) {
    // definisci questa mutation
    store.startGame = value;
  },
  setStopGame(value) {
    // definisci questa mutation
    store.stopGame = value;
  },
});
