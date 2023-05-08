<template>
  <div class="playspace mt-3">
    <h1 class="text-center mt-2 mb-3 fw-bold">Campo Minato</h1>
    <NewGame @new-game="newGame()" :minutes="minutes" :seconds="seconds" />
    <CellsBoard :cells="cells" :cellsClicked="cellsClicked" :bombs="bombs" />
  </div>
</template>

<script>
import { store } from "../store";
import NewGame from "./NewGame.vue";
import CellsBoard from "./CellsBoard.vue";
export default {
  name: "PlaySpace",
  components: {
    NewGame,
    CellsBoard,
  },
  data() {
    return {
      store,
      bombs: [],
      cells: [],
      cellsClicked: [],
      majorTest: [1, 9, 10, 11],
      minutes: "00",
      seconds: "00",
      isRunning: false,
      intervalId: null,
    };
  },
  mounted() {
    this.newGame("first");
  },
  methods: {
    newGame(string) {
      this.store.startGame = false;
      this.store.stopGame = false;
      this.resetTimer();
      this.bombs = [];
      this.cells = [];
      this.cellsClicked = [];
      for (let i = 0; i < 10; i++) {
        let rand = Math.floor(Math.random() * 100);
        if (this.bombs.includes(rand)) {
          i--;
        } else {
          this.bombs.push(rand);
        }
      }
      for (let i = 1; i <= 100; i++) {
        if (this.bombs.includes(i)) {
          let cell = `<i class="fa-sharp fa-solid fa-bomb"></i>`;
          this.cells.push(cell);
        } else if (i % 10 != 1 && i % 10 != 0) {
          let count = 0;
          this.majorTest.forEach((element) => {
            if (
              this.bombs.includes(i - element) ||
              this.bombs.includes(i + element)
            ) {
              count++;
            }
          });
          let cell = count != 0 ? `${count}` : "";
          this.cells.push(cell);
        } else if (i % 10 == 1) {
          let count = 0;
          if (
            this.bombs.includes(i + 10) ||
            this.bombs.includes(i - 10) ||
            this.bombs.includes(i + 1) ||
            this.bombs.includes(i - 9) ||
            this.bombs.includes(i + 11)
          ) {
            count++;
          }
          let cell = count != 0 ? `${count}` : "";
          this.cells.push(cell);
        } else if (i % 10 == 0) {
          let count = 0;
          if (
            this.bombs.includes(i + 10) ||
            this.bombs.includes(i - 10) ||
            this.bombs.includes(i + 9) ||
            this.bombs.includes(i - 1) ||
            this.bombs.includes(i - 11)
          ) {
            count++;
          }
          let cell = count != 0 ? `${count}` : "";
          this.cells.push(cell);
        }
      }
      if (string != "first") {
        this.cells.forEach((e, index) => {
          document
            .getElementById(index + 1)
            .classList.remove("light-grey", "red");
        });
      }
    },
    startTimer() {
      let seconds = 0;
      this.isRunning = true;
      this.intervalId = setInterval(() => {
        seconds++;
        this.minutes = ("0" + Math.floor(seconds / 60)).slice(-2);
        this.seconds = ("0" + (seconds % 60)).slice(-2);
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.intervalId);
      this.isRunning = false;
    },
    resetTimer() {
      this.stopTimer();
      this.minutes = "00";
      this.seconds = "00";
    },
  },
  computed: {
    isGameStarted() {
      return store.startGame;
    },
    isGameStopped() {
      return store.stopGame;
    },
  },
  watch: {
    isGameStarted: function (val) {
      if (val) {
        this.startTimer();
      }
    },
    isGameStopped: function (val) {
      if (val) {
        this.stopTimer();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.playspace {
  background-color: grey;

  border-radius: 0.5rem;
  box-shadow: 0 0 10px 5px #000000, 3px 3px 5px 0 #ccc;
  padding: 0 1.5rem 1.5rem 1.5rem;
  h1 {
    color: gold;
  }
}
</style>
