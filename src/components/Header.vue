<template>
  <div class="header bg-gradient-primary">

    <div class="d-flex">

      <div class="p-0">
        <router-link to="/"><div id="logo" class="">code-OST&lt;/&gt;</div>
        </router-link>
        <div id="author">{{ store.projectID ? store.getProjectName() : 'by TempestDevs'}}</div>
      </div>

      <div class="align-self-center ms-auto pe-4">

        <div class="project-progress">
          <div class="progress">
            <div class="progress-bar" style="width:12%" role="progressbar" aria-valuenow="12" aria-valuemin="0" aria-valuemax="100"></div>
          </div>

          <div class="valueProgress d-flex m-auto">
            <div class="percent">12% Done</div>
            <div class="number ms-auto">2/25</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  inject: ['store']
}
</script>

<style lang="scss" scoped>

.header {
  min-height: $header-height;
}

.project-progress {
  overflow: auto;
  width: 245px;
  height: 65px;
  background-color: $input-bg;
  border-radius: 32px;
  color: $body-color;

  .progress{
    margin: 20px auto 10px auto;
    width: 80%;
    height: 7.5px;
  }
  .valueProgress {
    font-size: small;
    width: 80%;
  }
}

#logo {
  color: $color-off-white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 0 0 32px 0;
  background: $primary;
  width: 200px;
  padding: 20px 32px;
  display: inline-block;
  margin-bottom: 19px;
}

#author {
  color: $color-off-white;
  display: inline-block;
  margin-left: 20px;
  font-weight: 600;
  @include media-breakpoint-down(md) {
    display: block;
    position: relative;
    top: -10px;
  }
}
</style>