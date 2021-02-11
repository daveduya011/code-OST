<template>
  <div class="answerList h-100">
    <div class="header px-4 pt-4 pb-2">
      <h1>Answer List</h1>
      <div class="input-group mb-3">
        <span class="input-group-text">
          <i class="bi bi-search"></i>
        </span>
        <input type="search" class="form-control" placeholder="Search" aria-label="Search">
      </div>
    </div>

    <div class="list">
      <div v-for="question in Questions"
           :key="question.key"
           :class="['question-item','list-group-item','card-body', { isActive: question.isActive }]"
           @click="selectQuestion(question)"
      >
        <div class="question card-text">{{ question.question }}</div>
        <div class="answer card-text">{{ question.answer }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebaseDb';
export default {
  name: "AnswerList",
  data() {
    return {
      Questions: [],
      lastActiveQuestion: null
    }
  },
  emits: ['displayedQuestionChanged'],
  props: ['onQuestionChanged'],
  created() {
    db.collection('Questions').orderBy("timestamp","desc").onSnapshot(snapshot => {
      this.Questions = [];
      snapshot.forEach(result => {
        this.Questions.push({
          key: result.id,
          question: result.data().question,
          answer: result.data().answer
        })
      })
    })
  },
  methods : {
    selectQuestion(question){

      this.$emit('displayedQuestionChanged', question);
      question.isActive = true;
      if (question !== this.lastActiveQuestion) this.unselectLastQuestion();
      this.lastActiveQuestion = question;

    },
    unselectLastQuestion(){
      if (this.lastActiveQuestion) this.lastActiveQuestion.isActive = false;
    }

  }
}
</script>

<style scoped lang="scss">
.answerList {
  background: $color-background;
  padding-bottom: 220px;
}
.list {
  text-align: center;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100%;

  .question-item {
    background: $color-off-white;
    font-size: 14px;
    border-radius: 32px;
    border: none;
    margin: 10px 20px;
    cursor: pointer;
    user-select: none;
    animation: bounce-in 0.5s ease-out;
    padding: 30px 30px;
    transition: transform 0.1s ease-in;

    &:hover {
      transform: scale(1.05, 1.05);
      background: $color-input-background;
    }

    &.isActive {
      background: $success-light;
      .answer {
        color: $color-body;
      }
    }

    .answer {
      margin-top: 6px;
      color: $success;
      font-weight: 600;
    }
  }
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
    height: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    height: 100%;
  }
}
</style>