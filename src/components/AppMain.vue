<script>
import PlaySpace from "./PlaySpace.vue";
export default {
  name: "AppMain",
  components: {
    PlaySpace,
  },
};
</script>

<template>
  <main class="d-flex justify-content-center flex-wrap">
    <PlaySpace />
    <div class="victory fs-1 fw-bold mt-4">Hai Vinto!!!</div>
  </main>
</template>

<style lang="scss" scoped>
.victory {
  color: lightgreen;
}
</style>
