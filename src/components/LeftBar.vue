<template>
  <div class="leftBar">
    <img id="pastedImage" :src="imageSRC" v-if="imageSRC"/>
    <form>
      <div class="form-group px-4 pt-4 pb-2">
        <label for="inputQuestion">Question</label>
        <TextArea class="form-control" id="inputQuestion" rows="3"
                :model-value="question.question"
                @update:model-value="question.question = $event"
                @input="onQuestionChanged"
        ></TextArea>
      </div>
<!--      @paste="onPaste($event)"-->


      <div class="form-group px-4">
        <label for="inputAnswer">Your Answer</label>
        <TextArea class="form-control" id="inputAnswer" rows="1"
                  :model-value="question.answer"
                  @update:model-value="question.answer = $event"></TextArea>
      </div>

      <div class="d-flex mx-4 my-2 align-items-center">
        <div class="unsure-checkbox form-check">
          <input class="form-check-input" type="checkbox"
                 v-model="question.isUnsure"
                 :id="[question.key ? question.key + '_unsure' : 'unsure']">
          <label class="form-check-label" :for="[question.key ? question.key + '_unsure' : 'unsure']">
            Mark unsure
          </label>
        </div>

        <button type="submit"
                class="btn btn-primary d-flex ms-auto"
                @click.prevent="onFormSubmit"
        >Submit</button>
      </div>
    </form>
    <div class="alert-danger warning m-4" v-if="warningEmpty">
      Cannot submit with empty question or answer.
    </div>
  </div>
</template>

<script>

import firebase from 'firebase/app';
import TextArea from "@/components/TextArea";
import {trimAll} from "@/modules/methods";
import {retrieveImageFromClipboardAsBlob} from "@/modules/store";

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
      warningEmpty: false,
      inputQuestion: null,
      imageSRC: null,
    };
  },
  inject: ['store'],
  emits: ['displayedQuestionChanged', 'onSubmit'],
  methods: {
    async onFormSubmit() {
      let collection = this.store.getQuestions().doc();
      let hasKey = false;

      if (!this.question.question?.trim() || !this.question.answer?.trim()) {
        this.warningEmpty = true;
        return;
      }

      this.question.question = trimAll(this.question.question);
      this.question.answer = trimAll(this.question.answer);
      this.question.question_lowercase = this.question.question.toLowerCase();

      this.warningEmpty = false;
      //if has key, then update
      if (this.question.key) {
        collection = this.store.getQuestions().doc(this.question.key);
        hasKey = true;
      }

      this.question.key = collection.id;
      this.question.timestamp = firebase.firestore.FieldValue.serverTimestamp();

      collection.set(this.question, { merge:true }).then(()=>{
        if (hasKey)
          this.store.changeQuestion(this.question);

        this.question = {};
        this.searched = 'none';
      });
      this.$emit('onSubmit');
    },

    async onQuestionChanged(){
      this.warningEmpty = false;

      //stop detecting for questions if editing
      if (this.question.key)
        return;

      let question = trimAll(this.question.question).toLowerCase();
      let questionFound = '';

      if (question === '') {
        this.store.changeQuestion(null);
        return;
      }


      let collection = this.store.getQuestions();
      let query = await collection.where('question_lowercase', '==', question).get();

      query.forEach(result => {
        questionFound = result.data();
      })
      this.store.changeQuestion(questionFound);
      this.$emit('displayedQuestionChanged');
    },

    setQuestion(question) {
      this.question = question;
    },

    onPaste(e){
      retrieveImageFromClipboardAsBlob(e, (imageBlob) => {
        // If there's an image, display it in the canvas
        if(imageBlob){
          let img = new Image();

          // Crossbrowser support for URL
          let URLObj = window.URL || window.webkitURL;

          // Creates a DOMString containing a URL representing the object given in the parameter
          // namely the original Blob
          img.src = URLObj.createObjectURL(imageBlob);
          this.imageSRC = img.src;
        }
      });
    }
  },
}
</script>

<style scoped lang="scss">
.leftBar {
  height: 100%;
  background: $color-background;
}

#pastedImage {
  max-width: 100%;
  max-height: 200px;
  padding: 20px 20px 5px 20px;
}


</style>