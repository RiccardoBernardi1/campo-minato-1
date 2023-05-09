<script>
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";

export default {
  components: {
    AppHeader,
    AppMain,
  },
};
</script>

<template>
  <AppHeader />
  <AppMain />
</template>

<style lang="scss">
@import "./style/global.scss";
body {
  --sz: 6px;
  --c1: #8bc34a;
  --c2: #7bb13c;
  --c3: #6a9d2f;
  --c4: #5a8727;
  --sh1: #36521678;
  --sh2: #3652169e;
  --ts: 50% / calc(var(--sz) * 18) calc(var(--sz) * 18);
  --cg: var(--c1) 0 22.5deg, var(--c2) 0 45deg, var(--c3) 0 67.5deg,
    var(--c4) 0 90deg, #fff0 0 100%;
  --hd: conic-gradient(from -45deg at 50% 50%, var(--cg)) var(--ts);
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(45deg, #fff0 0 95%, var(--sh1) 100%) var(--ts),
    linear-gradient(-45deg, #fff0 0 95%, var(--sh2) 100%) var(--ts),
    linear-gradient(45deg, #fff0 0 45%, var(--sh1) 50%, #fff0 0 100%) var(--ts),
    linear-gradient(-45deg, #fff0 0 45%, var(--sh2) 50%, #fff0 0 100%) var(--ts),
    var(--hd), var(--hd), var(--hd), var(--hd),
    conic-gradient(from -45deg at 100% 100%, var(--cg)) var(--ts),
    conic-gradient(from -45deg at 0% 100%, var(--cg)) var(--ts),
    conic-gradient(from -45deg at 50% 150%, var(--cg)) var(--ts);
  h1,
  .game-over {
    font-family: "Sigmar", cursive;
  }
}
</style>
