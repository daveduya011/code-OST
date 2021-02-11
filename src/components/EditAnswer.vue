<template>
  <!-- Modal -->
  <div class="modal fade"
       id="exampleModal"
       tabindex="-1"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
       ref="refModal">
    <div class="modal-dialog model-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit question/answer</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <LeftBar></LeftBar>
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
  props: ['question'],
  mounted() {
    this.$refs.refModal.addEventListener('show.bs.modal',()=>{

    })
  }
}
</script>

<style scoped>

</style>