<template>
  <!-- Modal -->
  <div class="modal fade"
       id="exampleModal"
       tabindex="-1"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
       ref="refModal">
    <div class="modal-dialog model-dialog-scrollable modal-dialog-centered" id="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit question/answer</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <LeftBar ref="leftBar" v-if="question"></LeftBar>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftBar from "@/components/LeftBar";
export default {
  name: "EditAnswer",
  components: {LeftBar},
  data() {
    return {
      key: null
    }
  },
  props: ['question'],
  mounted() {
    this.$refs.refModal.addEventListener('shown.bs.modal',()=>{
      //remove reactivity
      let item = JSON.parse(JSON.stringify(this.question))
      //set the question
      this.$refs.leftBar.setQuestion(item);
    })
  }
}
</script>

<style scoped>

</style>