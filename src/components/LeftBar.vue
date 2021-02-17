<template>
  <div class="leftBar">

    <div class="pastedImgContainer" v-if="pastedImg">
      <img id="pastedImage" :src="pastedImg.src"/>
      <i class="bi bi-x-circle" @click="pastedImg = null"></i>
      <Loading v-if="isImgLoading"></Loading>
    </div>
    <div class="pastedImgContainer" v-else-if="question.pastedImg">
      <img :src="question.pastedImg"/>
      <i class="bi bi-x-circle" @click="question.pastedImg = null; pastedImg = null"></i>
    </div>

    <form>
      <div class="form-group px-4 pt-2 pb-2">
        <label for="inputQuestion">Question</label>
        <TextArea class="form-control" id="inputQuestion" rows="3"
                :model-value="question.question"
                @update:model-value="question.question = $event"
                @input="onQuestionChanged"
                @paste="onPaste($event)"
        ></TextArea>
      </div>


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
import {retrieveImageFromClipboardAsBlob} from "@/modules/methods";
import Loading from "@/views/Loading";

export default {
  name: "LeftBar",
  components: {Loading, TextArea},
  data() {
    return {
      question: {
        question: '',
        answer: '',
        isUnsure: false,
        timestamp: Date(),
      },
      warningEmpty: false,
      inputQuestion: null,
      pastedImg: null,
      isImgLoading: false,
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

      // manage pasted image
      if (this.pastedImg) {
        this.isImgLoading = true;
        this.store.uploadImage(this.pastedImg.blob, collection.id).then(snapshot => {
          this.pastedImg = null;
          snapshot.ref.getDownloadURL().then(value => {
            collection.update("pastedImg", value);
            this.isImgLoading = false;
          });
        });
      }

      this.$emit('onSubmit');
    },

    async onQuestionChanged(){
      this.warningEmpty = false;

      //stop detecting for questions if editing
      if (this.question.key)
        return;

      let question = trimAll(this.question.question).toLowerCase();

      if (question === '') {
        this.store.reloadAnswerList();
        this.store.changeQuestion(null);
        return;
      }


      let collection = this.store.getQuestions();
      let query = await collection.where('question_lowercase', '==', question).get();

      let questions = [];
      query.forEach(result => {
        questions.push(result.data());
      })
      if (questions.length) {
        this.store.changeAnswerList(questions);
        this.store.changeQuestion(questions[0]);
      } else {
        this.store.reloadAnswerList();
        this.store.changeQuestion('');
      }

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

          // Cross-browser support for URL
          let URLObj = window.URL || window.webkitURL;

          // Creates a DOMString containing a URL representing the object given in the parameter
          // namely the original Blob
          img.src = URLObj.createObjectURL(imageBlob);
          img.blob = imageBlob;
          this.pastedImg = img;
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
  padding-top: 10px;
}

.pastedImgContainer {
  position: relative;
  width: fit-content;
  img {
    max-width: 90%;
    max-height: 150px;
    margin: 0px 20px;
    border-radius: 20px;
  }
  i {
    position: absolute;
    right: 30px;
    top: 2px;
    font-size: 22px;
    cursor: pointer;
    color: #fff;
    text-shadow: 0px 0px 8px $primary-dark;
  }
}


</style>