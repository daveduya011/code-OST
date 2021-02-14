<template>
  <!-- Modal -->
  <div class="modal fade"
       id="editAnswerModal"
       tabindex="-1"
       aria-labelledby="editAnswerModalLabel"
       aria-hidden="true">
    <div class="modal-dialog model-dialog-scrollable modal-dialog-centered" id="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editAnswerModalLabel">Edit question/answer</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <LeftBar ref="leftBar" v-if="question" @onSubmit="onSubmit"></LeftBar>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftBar from "@/components/LeftBar";
import Modal from 'bootstrap/js/dist/modal'
export default {
  name: "EditAnswer",
  components: {LeftBar},
  data() {
    return {
      key: null,
      modal: null,
    }
  },
  emits: ['onSubmit'],
  props: ['question'],
  mounted() {
    let modalEl = document.getElementById('editAnswerModal');
    this.modal = new Modal(modalEl, {});

    modalEl.addEventListener('shown.bs.modal',()=>{
      //remove reactivity
      let item = JSON.parse(JSON.stringify(this.question))
      //set the question
      this.$refs.leftBar.setQuestion(item);
    })
  },
  methods: {
    onSubmit(){
      this.modal.hide();
      this.$emit('onSubmit');
    },
    show(){
      this.modal?.show();
    }
  }
}
</script>

<style scoped>

</style>