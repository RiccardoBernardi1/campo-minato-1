<template>
  <div class="playspace mt-2 mt-lg-3">
    <div class="title">
      <h1 class="text-center mt-2 mb-3 fw-bold me-3">Campo Minato</h1>
      <select class="form-select form-select-sm w-auto ms-select">
        <option value="easy" @click="changeDifficulty('easy')" selected>
          Facile
        </option>
        <option value="normal" @click="changeDifficulty('normal')">
          Normale
        </option>
        <option value="hard" @click="changeDifficulty('hard')">
          Difficile
        </option>
      </select>
    </div>

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
      minutes: "00",
      seconds: "00",
      isRunning: false,
      intervalId: null,
    };
  },
  mounted() {
    this.newGame();
  },
  methods: {
    newGame() {
      if (this.cellsClicked.length > 0) {
        this.cells.forEach((e, index) => {
          document
            .getElementById(index + 1)
            .classList.remove("light-grey", "red");
        });
      }
      let mediaQuery = window.matchMedia("(min-width: 992px)");
      let mediaQueryTablet = window.matchMedia("(min-width: 760px)");
      if (this.store.difficulty === "easy") {
        this.store.cellsNumber = 100;
        this.store.bombNumber = 10;
        this.store.cellsForRow = 10;
      } else if (this.store.difficulty === "normal") {
        this.store.cellsNumber = 130;
        this.store.bombNumber = 25;
        if (mediaQuery.matches) {
          this.store.cellsForRow = 10;
        } else if (mediaQueryTablet.matches) {
          this.store.cellsForRow = 13;
        } else {
          this.store.cellsForRow = 10;
        }
      } else if (this.store.difficulty === "hard") {
        this.store.cellsNumber = 130;
        this.store.bombNumber = 40;

        if (mediaQueryTablet.matches) {
          this.store.cellsForRow = 13;
        } else if (mediaQuery.matches) {
          this.store.cellsForRow = 10;
        } else {
          this.store.cellsForRow = 10;
        }
      }
      const majorTest = [
        1,
        this.store.cellsForRow - 1,
        this.store.cellsForRow,
        this.store.cellsForRow + 1,
      ];
      this.store.gameOver = "";
      this.store.startGame = false;
      this.store.stopGame = false;
      this.resetTimer();
      this.bombs = [];
      this.cells = [];
      this.cellsClicked = [];
      for (let i = 0; i < this.store.bombNumber; i++) {
        let rand = Math.floor(Math.random() * this.store.cellsNumber);
        if (this.bombs.includes(rand)) {
          i--;
        } else {
          this.bombs.push(rand);
        }
      }
      for (let i = 1; i <= this.store.cellsNumber; i++) {
        if (this.bombs.includes(i)) {
          let cell = `<i class="fa-sharp fa-solid fa-bomb"></i>`;
          this.cells.push(cell);
        } else if (
          i % this.store.cellsForRow != 1 &&
          i % this.store.cellsForRow != 0
        ) {
          let count = 0;
          majorTest.forEach((element) => {
            if (this.bombs.includes(i - element)) {
              count++;
            }
            if (this.bombs.includes(i + element)) {
              count++;
            }
          });
          let cell = count != 0 ? `${count}` : "";
          this.cells.push(cell);
        } else if (i % this.store.cellsForRow == 1) {
          let count = 0;

          if (this.bombs.includes(i + this.store.cellsForRow)) {
            count++;
          }
          if (this.bombs.includes(i - this.store.cellsForRow)) {
            count++;
          }
          if (this.bombs.includes(i - (this.store.cellsForRow - 1))) {
            count++;
          }
          if (this.bombs.includes(i + 1)) {
            count++;
          }
          if (this.bombs.includes(i + (this.store.cellsForRow + 1))) {
            count++;
          }
          let cell = count != 0 ? `${count}` : "";
          this.cells.push(cell);
        } else if (i % this.store.cellsForRow == 0) {
          let count = 0;
          if (this.bombs.includes(i + this.store.cellsForRow)) {
            count++;
          }
          if (this.bombs.includes(i - this.store.cellsForRow)) {
            count++;
          }
          if (this.bombs.includes(i + (this.store.cellsForRow - 1))) {
            count++;
          }
          if (this.bombs.includes(i - 1)) {
            count++;
          }
          if (this.bombs.includes(i - (this.store.cellsForRow + 1))) {
            count++;
          }
          let cell = count != 0 ? `${count}` : "";
          this.cells.push(cell);
        }
      }

      this.store.cellsReadyToChange = true;
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
    changeDifficulty(string) {
      console.log(string);
      if (!(this.store.difficulty === string)) {
        this.store.difficulty = string;
        this.newGame();
      }
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
  position: relative;
  h1 {
    color: #ecf1a4;
  }
  .ms-select {
    position: absolute;
    top: 0.9375rem;
    right: 1.5625rem;
    @media screen and (max-width: 47.5rem) {
      max-width: 1.3125rem;
      top: 0.625rem;
    }
  }
}
</style>
