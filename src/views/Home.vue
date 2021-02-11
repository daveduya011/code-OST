<template>
  <div class="home container-fluid">
      <Header></Header>

      <div class="h-100 row">
        <LeftBar class="col-xl-3 col-sm-6" @displayedQuestionChanged="displayedQuestionChanged($event)"></LeftBar>

        <QuestionDisplay class="col-xl-6 col-sm-6"
                         :displayed-question="displayedQuestion"></QuestionDisplay>

        <AnswerList class="col-xl-3"
                    @displayedQuestionChanged="displayedQuestionChanged($event)"
                    :displayed-question="displayedQuestion"
                    ref="refAnswerList"
        ></AnswerList>
      </div>
    </div>

</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header";
import LeftBar from "@/components/LeftBar";
import AnswerList from "@/components/AnswerList";
import QuestionDisplay from "@/components/QuestionDisplay";

export default {
  name: 'Home',
  data(){
    return {
      displayedQuestion: null,
      onQuestionChanged: false,
    }
  },
  components: {
    QuestionDisplay,
    AnswerList,
    LeftBar,
    Header,
  },
  methods: {
    displayedQuestionChanged(question){
      this.displayedQuestion = question;
      this.$refs.refAnswerList.unselectLastQuestion();
    }
  }
}
</script>

<style lang="scss">

</style>
