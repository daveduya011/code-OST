<template>
  <div class="home p-5" v-show="!isLoading">
    <div class="list row row-cols-lg-5 row-cols-sm-2 justify-content-center">
      <div v-for="project in Projects"
           :key="project.id"
           :class="['list-item', 'col']"
           @click="selectProject(project)"
      >
        <div class="projectName card-text"><h1>{{ project.data().projectName }}</h1></div>
      </div>
      <div class="addButton list-item"
           @click="addProject"
      ><i class="bi bi-plus-circle"></i>
      </div>
    </div>
    <CreateProjectModal ref="modal"></CreateProjectModal>
  </div>
  <Loading v-show="isLoading"></Loading>

</template>

<script>
import CreateProjectModal from "@/components/CreateProjectModal";
import Loading from "@/views/Loading";

export default {
  name: "Home",
  components: {Loading, CreateProjectModal},
  data() {
    return {
      Projects: [],
      isLoading: true
    }
  },
  inject: ['store'],
  created() {
    this.store.getProjects().orderBy("timestamp","asc").onSnapshot(snapshot => {
      this.Projects = [];
      snapshot.forEach(result => {
        this.Projects.push(result);
      });
      this.isLoading = false;
    })
  },
  methods : {
    selectProject(project){
      this.$router.push('/project/' + project.id)
    },
    addProject(){
      this.$refs.modal.showModal();
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
  min-height: 120px;
  box-shadow: 0 0 25px #eee;

  .projectName{
    height: 100%;
    text-align:center;
    display:table;
    width:100%;
    text-transform: uppercase;
    h1 {
      display:table-cell; vertical-align:middle
    }
  }

  h1 {
    font-weight: 600;
    vertical-align: center;
  }

  &:hover {
    background-color: $primary-light !important;
  }

  &.addButton {
    font-weight: normal;
    font-size: 20px;
    background: $color-off-white;
    max-width: 120px;
    i {
      font-size: 30px;
      line-height: 1.8em;
    }
  }
}
</style>