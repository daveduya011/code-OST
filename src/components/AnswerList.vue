<template>
  <div class="answerList h-100">
    <div class="header px-4 pt-4 pb-2">
      <h1>Answer List</h1>
<!--      <div class="input-group mb-3">-->
<!--        <span class="input-group-text">-->
<!--          <i class="bi bi-search"></i>-->
<!--        </span>-->
<!--        <input type="search" class="form-control" placeholder="Search" aria-label="Search">-->
<!--      </div>-->
    </div>

    <div class="list">
      <div v-for="question in Questions"
           :key="question.key"
           :class="['list-item',
           'card-body', { isActive: activeQuestion === question },
           { isUnsure: question.isUnsure }]"
           @click="selectQuestion(question)"
      >
        <div class="question card-text">{{ question.question }}</div>
        <div class="answer card-text">{{ question.answer }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnswerList",
  data() {
    return {
      Questions: [],
    }
  },
  computed: {
    activeQuestion() {
      return this.store.question;
    }
  },
  inject: ['store'],
  emits: ['displayedQuestionChanged'],
  created() {
    this.store.getQuestions().orderBy("timestamp","desc").onSnapshot(snapshot => {
      this.Questions = [];
      snapshot.forEach(result => {
        this.Questions.push(result.data());
      });
    })
  },
  methods : {
    selectQuestion(question){
      this.store.changeQuestion(question);
      this.$emit('displayedQuestionChanged');
    }
  }
}
</script>

<style scoped lang="scss">
.answerList {
  position: relative;
  background: $color-background;
  padding-bottom: 200px;
}

.list {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;

  .list-item {

    &.isActive {
      .answer {
        color: $color-body;
      }
    }

    .answer {
      margin-top: 6px;
      color: $success;
      font-weight: 600;
    }

    .answer, .question {
      word-break: break-word;
    }


    &.isUnsure {
      background-color: $error-lighter;
      .answer {
        color: $error-dark;
      }

      &.isActive {
        background: $error-light;
      }
    }
  }
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>