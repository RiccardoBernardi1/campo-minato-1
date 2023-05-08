<template>
  <div class="header d-flex p-3 justify-content-around">
    <div class="points d-flex align-items-center">
      <span class="m-3">010</span>
    </div>
    <button class="btn new-game btn-success fw-bold" @click="emitNewGame">
      Nuova Partita
    </button>
    <div class="time d-flex align-items-center px-2">
      <span>{{ minutes }}</span
      >:<span>{{ seconds }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewGame",
  props: {
    minutes: String,
    seconds: String,
  },
  methods: {
    emitNewGame() {
      this.$emit("new-game");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  box-shadow: inset 0 0 10px 5px #000000, 3px 3px 5px 0 #ccc;
  max-height: 8%;
  border-radius: 0.3125rem;
  .time,
  .points {
    box-shadow: inset 0 0 10px 5px #000000, 3px 3px 5px 0 #ccc;
    background-color: rgba($color: #000000, $alpha: 0.5);
    color: white;
    font-size: 30px;
    border-radius: 0.3125rem;
  }
  .new-game {
    box-shadow: 0 0 5px 3px #000000, 3px 3px 5px 0 #ccc;
  }
}
</style>
