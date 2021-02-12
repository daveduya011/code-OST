<template>
  <Header></Header>
  <div class="fallback d-flex align-items-center">
    <div class="card-body center">
      :(
      <br>
      <b>There's no project here </b> buddy. <br>
      <p>Sira yung link. Baka dinelete? Gawa ka nalang ng bagong project tanga.</p>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "FallBack",
  components: {Header}
}
</script>

<style scoped lang="scss">
.fallback {
  text-align: center;
  font-size: 26px;
  font-weight: normal;
  height: 80%;
  line-height: 1.5em;
  p {
    font-size: 16px;
  }
}
</style>