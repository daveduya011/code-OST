<template>
  <div id="nav">
<!--    <router-link to="/">Home</router-link> |-->
  </div>
  <router-view/>
</template>

<script>
import { store } from "@/modules/store";
export default {
  provide: { store }
}
</script>

<style lang="scss">
html {
  min-height: 100%;
  position: relative;
}
html,body, #app {
  height: 100%;
}

.project {
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  overflow:hidden;
}



</style>
