<template>
  <div class="fallback d-flex align-items-center">
    <div class="card-body center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
}
</script>

<style scoped lang="scss">
.fallback {
  text-align: center;
  font-size: 26px;
  font-weight: normal;
  height: 100%;
  line-height: 1.5em;
  p {
    font-size: 16px;
  }
}
</style>