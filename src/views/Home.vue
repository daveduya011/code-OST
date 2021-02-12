<template>
  <div class="home p-5">
    <div class="list row justify-content-center">
      <div v-for="project in Projects"
           :key="project.id"
           :class="['list-item','card-body', 'col-sm-4']"
           @click="selectProject(project)"
      >
        <div class="projectName card-text"><h1>{{ project.data().projectName }}</h1></div>
      </div>
      <div class="addButton list-item card-body col-sm-4"
           @click="addProject"
      >+</div>
    </div>
    <CreateProjectModal></CreateProjectModal>
  </div>
</template>

<script>
import CreateProjectModal from "@/views/CreateProjectModal";
import Toast from 'bootstrap/js/dist/toast'
export default {
  name: "Home",
  components: {CreateProjectModal},
  data() {
    return {
      Projects: [],
      toast : null
    }
  },
  inject: ['store'],
  created() {
    this.store.getProjects().onSnapshot(snapshot => {
      this.Projects = [];
      snapshot.forEach(result => {
        this.Projects.push(result);
      });
    })
  },
  mounted(){
    let toastEl = document.getElementById('createProjectModal');
    this.toast = new Toast(toastEl, {
      autohide: false
    }); // No need for options; use the default options
  },
  methods : {
    selectProject(project){
      this.$router.push('/project/' + project.id)
    },
    addProject(){
      this.toast.show();
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  height: 100%;
  background: $color-background;
}
.list-item {
  max-width: 250px;
  min-height: 100px;
  box-shadow: 0 0 25px #eee;

  h1 {
    font-weight: 600;
    vertical-align: center;
  }

  &:hover {
    background-color: $primary-light !important;
  }

  &.addButton {
    font-weight: bold;
    font-size: 30px;
    background: $success-light;
  }
}
</style>