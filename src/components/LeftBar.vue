<template>
  <div class="leftBar">

    <form @submit.prevent="onFormSubmit" autocomplete="false">
      <div class="form-group px-4 pt-4 pb-2">
        <label for="inputQuestion">Question</label>
        <TextArea class="form-control" id="inputQuestion" rows="3"
                :model-value="question.question"
                @update:model-value="question.question = $event"
                @input="onQuestionChanged"></TextArea>
      </div>


      <div class="form-group px-4">
        <label for="inputAnswer">Your Answer</label>
        <TextArea class="form-control" id="inputAnswer" rows="1"
                  :model-value="question.answer"
                  @update:model-value="question.answer = $event"></TextArea>
      </div>

      <div class="d-flex mx-4 my-2 align-items-center">
        <div class="unsure-checkbox form-check">
          <input class="form-check-input" type="checkbox" v-model="question.isUnsure" id="isUnsure">
          <label class="form-check-label" for="isUnsure">
            Mark unsure
          </label>
        </div>

        <button type="submit" class="btn btn-primary d-flex ms-auto">Submit</button>
      </div>
    </form>
    <div class="alert-danger warning m-4" v-if="warningEmpty">
      Cannot submit with empty question or answer.
    </div>
  </div>
</template>

<script>

import { db } from '@/firebaseDb';
import firebase from 'firebase/app';
import 'firebase/firestore';
import TextArea from "@/components/TextArea";

export default {
  name: "LeftBar",
  components: {TextArea},
  data() {
    return {
      question: {
        question: '',
        answer: '',
        isUnsure: false,
        timestamp: Date()
      },
      warningEmpty: false
    };
  },
  props: {
    msg: String
  },
  emits: ['displayedQuestionChanged'],
  methods: {
    onFormSubmit() {
      this.question.question = this.trimAll(this.question.question);
      this.question.answer = this.trimAll(this.question.answer)

      if (this.question.question === '' || this.question.answer === '') {
        this.warningEmpty = true;
        return;
      }

      this.warningEmpty = false;
      let collection = db.collection('Questions');
      collection.add(this.question).then((ref) => {
        ref.update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).catch((error) => {
          console.log(error);
        })
        this.question = {}
        this.searched = 'none';
      }).catch((error) => {
        console.log(error);
      });
    },
    async onQuestionChanged(){
      this.warningEmpty = false;
      let question = this.trimAll(this.question.question);
      let questionFound = '';

      if (question === '') {
        this.$emit('displayedQuestionChanged', null);
        return;
      }

      let collection = db.collection('Questions');
      let query = await collection.where('question', '==', question).get();

      query.forEach(result => {
        questionFound = result.data();
      })


      this.$emit('displayedQuestionChanged', questionFound);
    },

    trimAll(text){
      return text.replace(/\s+/g,' ')
          .replace(/^\s+|\s+$/,'');
    }
  }
}
</script>

<style scoped lang="scss">
.leftBar {
  height: 100%;
  background: $color-background;
}

.warning {
  font-size: 14px;
  line-height: 24px;
  border-radius: 40px;
  padding: 7px 20px;
  text-align: center;
}


</style>