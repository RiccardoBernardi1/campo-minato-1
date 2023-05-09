<script>
import { store } from "../store";
import PlaySpace from "./PlaySpace.vue";
export default {
  name: "AppMain",
  data() {
    return {
      store,
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
      if (val == "Win") {
        document.querySelector(".victory").classList.add("ms-visible");
      } else if (val == "Lose") {
        document.querySelector(".loss").classList.add("ms-visible");
      } else {
        document.querySelector(".victory").classList.remove("ms-visible");
        document.querySelector(".loss").classList.remove("ms-visible");
      }
    },
  },
};
</script>

<template>
  <main class="d-flex justify-content-center flex-wrap">
    <PlaySpace />
    <div class="victory fs-1 fw-bold mt-4">Hai Vinto!!!</div>
    <div class="loss fs-1 fw-bold mt-4">Hai Perso!!!</div>
  </main>
</template>

<style lang="scss" scoped>
.victory {
  color: lightgreen;
  display: none;
}
.loss {
  color: red;
  display: none;
}
.ms-visible {
  display: block;
}
</style>
