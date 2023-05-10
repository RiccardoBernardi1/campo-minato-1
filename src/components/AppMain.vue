<script>
import { store } from "../store";
import PlaySpace from "./PlaySpace.vue";
export default {
  name: "AppMain",
  data() {
    return {
      store,
      result: "",
    };
  },
  components: {
    PlaySpace,
  },
  computed: {
    isGameOver() {
      return store.gameOver;
    },
  },
  watch: {
    isGameOver: function (val) {
      if (val == "victory" || val == "loss") {
        document
          .querySelectorAll(".game-over")
          .forEach((e) => e.classList.add(store.gameOver));
        this.result = val == "victory" ? "Hai Vinto!" : "Hai Perso";
      } else {
        document
          .querySelectorAll(".game-over")
          .forEach((e) => e.classList.remove("victory", "loss"));
        this.result = "";
      }
    },
  },
};
</script>

<template>
  <main class="d-flex justify-content-center flex-wrap">
    <div class="game-over fs-1 fw-bold mt-4 text-center d-none d-lg-block">
      {{ result }}
    </div>
    <PlaySpace />
    <div class="game-over fs-1 fw-bold mt-3 text-center">
      {{ result }}
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  @media screen and (min-width: 992px) {
    align-items: center;
    justify-content: space-around !important;
  }
  .game-over {
    &.victory {
      color: #f1f2f5;
    }
    &.loss {
      color: #9e0707;
    }
  }
}
</style>
