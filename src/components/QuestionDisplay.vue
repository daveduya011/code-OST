<template>
  <div class="questionDisplay d-flex align-items-center">

    <div class="card-body center" v-if="displayedQuestion == null">
      <h1>Start typing your question.</h1>
    </div>
<!--    IF EMPTY   -->
    <div class="card-body center not-answered" v-else-if="displayedQuestion === ''">
      <h1>The question hasn't been answered yet.</h1>
    </div>

<!--    IF ANSWERED   -->
    <div :class="['card-body', {unsure : displayedQuestion.isUnsure}] " v-else>
      <div class="alreadyAnsweredTxt">
        <i class="bi bi-check2 checkmark"></i> Already answered
        <div class="unsureTxt" v-if="displayedQuestion.isUnsure">but not sure tho.</div>
      </div>
      <div class="question" ref="questionEl">
        <span>{{ displayedQuestion.question }}</span>
      </div>
      <div class="answer" ref="answerEl">
        <span>{{ displayedQuestion.answer }}
        </span>
        <button type="button" class="btn-edit btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <i class="bi bi-pencil-square edit-icon"></i>
        </button>
      </div>
    </div>
    <EditAnswer
        :question="displayedQuestion"></EditAnswer>
    </div>
</template>

<script>
import TextFill from 'textfilljs'
import { ref, watchEffect, onBeforeUpdate } from 'vue'
import EditAnswer from "@/components/EditAnswer";
export default {
  name: "QuestionDisplay",
  components: {EditAnswer},
  props: ['displayedQuestion'],
  methods: {
    showEditDialogue(){
      
    }
  },
  setup(){
    const questionEl = ref(null);
    const answerEl = ref(null);
    const editAnswerEl = ref(null);

    watchEffect(() => {
      if (questionEl.value != null) {
        TextFill(questionEl.value,{
          autoResize: true,
        });
        TextFill(answerEl.value,{
          autoResize: true,
          maxFontPixels: 18
        });
      }
    }, {
        flush: 'post'
    })

    onBeforeUpdate(() => {
      questionEl.value = null;
      answerEl.value = null;
    })

    return { questionEl, answerEl, editAnswerEl }
  },
}
</script>

<style scoped lang="scss">
.questionDisplay {
  height: 80%;
  padding: 6vw;
}
.alreadyAnsweredTxt {
  font-size: 18px;
  color: $success;
  margin-bottom: 10px;
  .checkmark {
    font-size: 27px;
  }
  .unsureTxt {
    display: inline-block;
    color: $error;
    font-weight: 600;
    margin-bottom: 20px;
    border-bottom: 2px solid $error;
  }
}
.empty {
  font-weight: normal;
}
.center {
  text-align: center;
}
.question {
  line-height: 1.5em;
  font-weight: bold;
  height: 200px;
  @include media-breakpoint-down(md) {
    height: auto;
  }
}

.answer {
  position: relative;
  background: $color-input-background;
  color: $color-body;
  font-weight: normal;
  border-radius: 0px 32px 32px 32px;
  padding: 20px 65px 20px 20px;
  display: inline-block;
  max-height: 200px;
  min-width: 150px;

  .btn-edit {
    font-size: 20px;
    position: absolute;
    top: 50%;
    margin-top: -21px;
    right: 15px;
    padding: 10px;
    border: none;
    line-height: 0.7;
  }
  .edit-icon {

  }
}

.not-answered {
  color: $error;
}

.unsure {
  .question {
    color: $error-dark;
    font-weight: normal;
  }
  .answer {
    background: $error;
    font-weight: normal;
    color: $color-off-white;

  }
  .alreadyAnsweredTxt {
    color: $color-label;
  }
}

</style>