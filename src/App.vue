<template>
  <Header></Header>
  <router-view/>
</template>

<script>
import { store } from "@/modules/store";
import Header from "@/components/Header";
export default {
  components: {Header},
  provide: { store },
  watch:{
    '$route' (to){
      if (to.fullPath === '/') {
        store.reset();
      }
    }
  },
  mounted() {
    // disable right click
    window.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    }, false);
  }
}
</script>

<style lang="scss">
html {
  min-height: 100%;
  position: relative;
  overflow: hidden;
}
html,body, #app {
  height: 100%;
}

.project {
  position:relative;
  height: 100%;
}



</style>
