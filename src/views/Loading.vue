<template>
  <Header></Header>
  <div class="fallback d-flex align-items-center">
    <div class="card-body center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "Loading",
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