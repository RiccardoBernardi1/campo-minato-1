<template>
  <div class="board d-flex flex-wrap mt-4">
    <div
      v-for="(cell, index) in cells"
      :key="index"
      :id="index + 1"
      class="cell fs-4 d-flex justify-content-center align-items-center fw-bold"
      @click="cellClick(index + 1)"
    >
      <span v-html="cell" class="d-none"></span>
    </div>
  </div>
</template>

<script>
import { store } from "../store";
export default {
  name: "CellsBoard",
  data() {
    return {
      store,
    };
  },
  props: {
    cells: Array,
    cellsClicked: Array,
    bombs: Array,
  },
  methods: {
    cellClick(n) {
      if (this.cellsClicked.length == 0) {
        this.store.startGame = true;
      }
      if (!this.cellsClicked.includes(n)) {
        this.cellsClicked.push(n);
        let cellClicked = document.getElementById(n);
        if (this.bombs.includes(n)) {
          cellClicked.classList.add("red");
          this.store.stopGame = true;
          this.store.gameOver = "loss";
          this.cells.forEach((e, i) => {
            if (this.bombs.includes(i + 1)) {
              document.getElementById(i + 1).classList.add("red");
            } else {
              document.getElementById(i + 1).classList.add("light-grey");
            }
          });
        } else if (this.cells[n - 1] == "") {
          cellClicked.classList.add("light-grey");
          this.discover(n);
          if (
            this.cellsClicked.length ==
            this.cells.length - this.bombs.length
          ) {
            this.store.stopGame = true;
            this.store.gameOver = "victory";
            this.cells.forEach((e, i) => {
              if (this.bombs.includes(i + 1)) {
                document.getElementById(i + 1).classList.add("red");
              }
            });
          }
        } else {
          cellClicked.classList.add("light-grey");
          if (
            this.cellsClicked.length ==
            this.cells.length - this.bombs.length
          ) {
            this.store.stopGame = true;
            this.store.gameOver = "victory";
            this.cells.forEach((e, i) => {
              if (this.bombs.includes(i + 1)) {
                document.getElementById(i + 1).classList.add("red");
              }
            });
          }
        }
      }
    },
    verticalDiscover(n) {
      let verticalCountDown = this.store.cellsForRow;
      while (n + verticalCountDown <= this.cells.length) {
        if (!this.bombs.includes(n + verticalCountDown)) {
          if (!this.cellsClicked.includes(n + verticalCountDown)) {
            this.cellsClicked.push(n + verticalCountDown);
            document
              .getElementById(n + verticalCountDown)
              .classList.add("light-grey");
          }
        } else if (this.bombs.includes(n + verticalCountDown)) {
          break;
        }
        verticalCountDown += this.store.cellsForRow;
      }
      let verticalCountUp = this.store.cellsForRow;
      while (n - verticalCountUp > 0) {
        if (!this.bombs.includes(n - verticalCountUp)) {
          if (!this.cellsClicked.includes(n - verticalCountUp)) {
            this.cellsClicked.push(n - verticalCountUp);
            document
              .getElementById(n - verticalCountUp)
              .classList.add("light-grey");
          }
        } else if (this.bombs.includes(n - verticalCountUp)) {
          break;
        }
        verticalCountUp += this.store.cellsForRow;
      }
    },
    orizontalDiscover(n) {
      let forward = 1;
      while (
        forward <= this.store.cellsForRow - (n % this.store.cellsForRow) &&
        n % this.store.cellsForRow != 0
      ) {
        if (!this.bombs.includes(n + forward)) {
          if (!this.cellsClicked.includes(n + forward)) {
            this.cellsClicked.push(n + forward);
            document.getElementById(n + forward).classList.add("light-grey");
          }
        } else if (this.bombs.includes(n + forward)) {
          break;
        }
        forward += 1;
      }
      let backward = 1;
      while (backward < n % this.store.cellsForRow) {
        if (!this.bombs.includes(n - backward)) {
          if (!this.cellsClicked.includes(n - backward)) {
            this.cellsClicked.push(n - backward);
            document.getElementById(n - backward).classList.add("light-grey");
          }
        } else if (this.bombs.includes(n - backward)) {
          break;
        }
        backward += 1;
      }
    },
    discover(n) {
      for (let i = 0; this.cells[n - 1 + i] == ""; i++) {
        if (i == 0) {
          this.orizontalDiscover(n + i);
        }
        this.verticalDiscover(n + i);
        if ((n + i) % this.store.cellsForRow == 0) {
          break;
        }
      }
      for (let i = 0; this.cells[n - 1 - i] == ""; i++) {
        if (i == 0) {
          this.orizontalDiscover(n - i);
        }
        this.verticalDiscover(n - i);
        if ((n + i) % this.store.cellsForRow == 1) {
          break;
        }
      }
      for (
        let i = 0;
        this.cells[n - 1 + i] == "";
        i += this.store.cellsForRow
      ) {
        if (i == 0) {
          this.verticalDiscover(n + i);
        }
        this.orizontalDiscover(n + i);
        if (n + i > this.cells.length - this.store.cellsForRow) {
          break;
        }
      }
      for (
        let i = 0;
        this.cells[n - 1 - i] == "";
        i += this.store.cellsForRow
      ) {
        if (i == 0) {
          this.verticalDiscover(n - i);
        }
        this.orizontalDiscover(n - i);
        if (n + i <= this.store.cellsForRow) {
          break;
        }
      }
    },
  },
  computed: {
    areCellsready() {
      console.log("are ready");
      return store.cellsReadyToChange;
    },
  },
  updated() {
    this.$nextTick(() => {
      let cells = document.querySelectorAll(".cell");
      const board = document.querySelector(".board");
      if (this.areCellsready) {
        if (this.store.difficulty === "easy") {
          cells.forEach((e) => e.classList.remove("normal"));
          cells.forEach((e) => e.classList.remove("hard"));
          board.classList.remove("big");
        } else if (this.store.difficulty === "normal") {
          cells.forEach((e) => e.classList.remove("easy"));
          cells.forEach((e) => e.classList.remove("hard"));
          board.classList.add("big");
        } else if (this.store.difficulty === "hard") {
          cells.forEach((e) => e.classList.remove("easy"));
          cells.forEach((e) => e.classList.remove("normal"));
          board.classList.add("big");
        }
        cells.forEach((e) => e.classList.add(this.store.difficulty));
        this.store.cellsReadyToChange = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.board {
  max-width: 85vw;
  @media screen and (min-width: 992px) {
    max-width: 35vw;
    &.big {
      max-width: 50vw;
    }
  }
  .cell {
    border-radius: 0.3125rem;
    width: calc(85vw / 10);
    height: calc(85vw / 10);
    &.normal {
      width: calc(85vw / 10);
      height: calc(85vw / 10);
    }
    &.hard {
      width: calc(85vw / 10);
      height: calc(85vw / 10);
    }
    background-color: rgba($color: #000000, $alpha: 0.2);
    border: 0.125rem solid #000000;
    cursor: pointer;
    box-shadow: 0 0 2px 2px #000000, 3px 3px 5px 0 #ccc;
    @media screen and (min-width: 760px) {
      &.normal {
        width: calc(85vw / 13);
        height: calc(85vw / 13);
      }
      &.hard {
        width: calc(85vw / 13);
        height: calc(85vw / 13);
      }
    }
    @media screen and (min-width: 992px) {
      width: calc(35vw / 10);
      height: calc(35vw / 10);
      &.normal {
        width: calc(50vw / 13);
        height: calc(50vw / 13);
      }
      &.hard {
        width: calc(50vw / 13);
        height: calc(50vw / 13);
      }
    }
    &.red {
      background-color: red;
      span {
        display: block !important;
      }
    }
    &.light-grey {
      background-color: lightgrey;
      span {
        display: block !important;
      }
    }
  }
}
</style>
