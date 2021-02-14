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
        <div class="theAnswerIsTxt" v-if="displayedQuestion.isUnsure">MY GUESS IS</div>
        <div class="theAnswerIsTxt" v-else>The answer is</div>
        <span>{{ displayedQuestion.answer }}
        </span>
        <button type="button" class="btn-edit btn" @click="showEditModal">
          <i class="bi bi-pencil-square edit-icon"></i>
        </button>
      </div>

      <button type="button" class="btn-trash btn"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal">
        <i class="bi bi-trash"></i>
      </button>
    </div>
    <ConfirmDelete @confirmDelete="deleteQuestion"></ConfirmDelete>
    <EditAnswer ref="editModal" @onSubmit="onEditSubmit"
        :question="displayedQuestion"></EditAnswer>
    <QuestionIsChangedModal
        ref="questionIsChangedModal"
    ></QuestionIsChangedModal>
    </div>
</template>

<script>
import TextFill from 'textfilljs'
import { ref, watchEffect, onBeforeUpdate } from 'vue'
import EditAnswer from "@/components/EditAnswer";
import ConfirmDelete from "@/components/ConfirmDelete";
import QuestionIsChangedModal from "@/components/QuestionIsChangedModal";

export default {
  name: "QuestionDisplay",
  components: {QuestionIsChangedModal, ConfirmDelete, EditAnswer},
  data(){
    return {
      snapshot: null,
      count: 0,
      isYouEditing: false,
    }
  },
  inject: ["store"],
  computed: {
    displayedQuestion() {
      this.questionChanged();
      return this.store.question;
    }
  },
  methods: {
    deleteQuestion(){
      this.store.deleteQuestion(this.displayedQuestion);
    },
    questionChanged(){
      this.count = 0;
      this.isYouEditing = false;
      if (this.snapshot) this.snapshot();

      this.snapshot = this.store.getQuestion().onSnapshot(data => {
        if(data.exists) {
          if(this.count > 0 ) {
            this.store.changeQuestion(data.data());
            if (!this.isYouEditing)
              this.$refs.questionIsChangedModal.showModal();
          }
          this.count++;
        }
      })
    },
    showEditModal(){
      this.$refs.editModal.show()
    },
    onEditSubmit(){
      this.isYouEditing = true;
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
  height: 90%;
  padding: 6vw;
  position: relative;
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
.answer, .question {
  word-break: break-word;
}
.answer {
  position: relative;
  background: $color-input-background;
  color: $color-body;
  font-weight: 600;
  border-radius: 0 32px 32px 32px;
  padding: 20px 65px 20px 20px;
  display: inline-block;
  max-height: 200px;
  min-width: 150px;

  .theAnswerIsTxt {
    font-size: 12px;
    margin-bottom: 5px;
    user-select: none;
    color: $color-label;
  }

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
}

.not-answered {
  color: $error;
}

.unsure {
  .theAnswerIsTxt {
    color: $error-lighter;
  }
  .question {
    color: $error-dark;
    font-weight: normal;
  }
  .answer {
    background: $error;
    color: $white;
  }
  .alreadyAnsweredTxt {
    color: $color-label;
  }
}
.btn-trash {
  position: absolute;
  right: 20px;
  bottom: 40px;
  font-size: 26px;
  color: $error;
}

</style>