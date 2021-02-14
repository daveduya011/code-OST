<template>
  <div class="project container-fluid" v-if="isExistingProject">

      <div class="h-100 row">
        <LeftBar class="col-xl-3 col-sm-6" @displayedQuestionChanged="displayedQuestionChanged"></LeftBar>

        <QuestionDisplay class="col-xl-6 col-sm-6"></QuestionDisplay>

        <AnswerList class="col-xl-3"
                    @displayedQuestionChanged="displayedQuestionChanged"
                    ref="refAnswerList"
        ></AnswerList>
      </div>
    </div>
    <Loading v-else-if="isLoading"></Loading>
    <FallBack v-else></FallBack>
  <ConfirmDelete @confirmDelete="deleteProject" ref="deleteModal"></ConfirmDelete>

</template>

<script>
// @ is an alias to /src
import LeftBar from "@/components/LeftBar";
import AnswerList from "@/components/AnswerList";
import QuestionDisplay from "@/components/QuestionDisplay";
import FallBack from "@/views/FallBack";
import Loading from "@/views/Loading";
import ConfirmDelete from "@/components/ConfirmDelete";

export default {
  name: 'Project',
  inject: ["store"],
  components: {
    ConfirmDelete,
    Loading,
    FallBack,
    QuestionDisplay,
    AnswerList,
    LeftBar,
  },
  computed: {
    isExistingProject() {
      return this.store.isExistingProject;
    },
    isLoading(){
      return this.store.isLoading;
    }
  },
  created(){
    this.store.setProjectID(this.$route.params.projectID);
  },
  methods: {
    displayedQuestionChanged(){

    },
    deleteProject(){
      this.store.deleteProject();
      this.$router.push('/');
    }
  },
  mounted() {
    this._keyListener = function(e) {
      if (e.key === "Delete" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.$refs.deleteModal?.showModal();
      }
    };

    document.addEventListener('keydown', this._keyListener.bind(this));
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this._keyListener);
  }
}
</script>

<style lang="scss">

</style>
