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

</template>

<script>
// @ is an alias to /src
import LeftBar from "@/components/LeftBar";
import AnswerList from "@/components/AnswerList";
import QuestionDisplay from "@/components/QuestionDisplay";
import FallBack from "@/views/FallBack";
import Loading from "@/views/Loading";

export default {
  name: 'Project',
  inject: ["store"],
  components: {
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
      // this.$refs.refAnswerList.unselectLastQuestion();
    }
  }
}
</script>

<style lang="scss">

</style>
