<template>
  <div class="hello">
    <form @submit.prevent="onFormSubmit">

      <div>
        <label>Question</label>
        <textarea v-model="question.question" @input="onQuestionChanged"></textarea>
      </div>

      <div class="form-group">
        <label for="inputAnswer">Answer</label>
        <input type="text" v-model="question.answer" class="form-control" id="inputAnswer">
      </div>

      <button>Submit</button>
    </form>

    <div>
      <br/>
      <b>Searched:</b> {{ searched }}
    </div>
  </div>
</template>

<script>
import { db } from '@/firebaseDb';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  name: "AnswerList",
  data() {
    return {
        question: {
          question: '',
          answer: '',
          isUnsure: false,
          timestamp: Date()
        },
        searched: 'none',
        style: 'background: #fff;'
    };
  },
  props: {
    msg: String
  },
  methods: {
    onFormSubmit() {
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
      let question = this.question.question.trim();
      let collection = db.collection('Questions');
      let query = await collection.where('question', '==', question).get();
      if (query.empty) {
        this.searched = "none";
      }
      query.forEach(result => {
        this.searched = result.data().answer;
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
